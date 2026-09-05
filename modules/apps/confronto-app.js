import { ATAQUES_CONFRONTO, POSTURAS_CONFRONTO } from "../data/confronto.js";
import { bonusReputacaoConfronto } from "../reputacao.js";

/**
 * Janela que roda um Confronto (combate social) entre um Atacante e um
 * Defensor. Pensada para o Mestre operar: ele escolhe a ação do atacante E a
 * postura do defensor a cada rodada e clica em "Resolver Rodada" — os dados
 * são rolados automaticamente e o resultado é aplicado nas fichas.
 */
export class ConfrontoApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-confronto",
      classes: ["imintoyou", "imintoyou-confronto"],
      template: "systems/imintoyou/templates/apps/confronto.hbs",
      title: "Confronto — I'm Into You",
      width: 620,
      height: "auto",
      resizable: true
    });
  }

  constructor(options = {}) {
    super(options);
    this.atacanteId = options.atacanteId ?? null;
    this.defensorId = options.defensorId ?? null;
    this.ataqueTipo = "direto";
    this.ataqueTalento = null;
    this.posturaTipo = "inabalavel";
    this.rodada = 0;
    this.log = [];
    this.encerrado = false;
    this.vencedor = null;
    this.perdedor = null;
  }

  get atacante() {
    return this.atacanteId ? game.actors.get(this.atacanteId) : null;
  }
  get defensor() {
    return this.defensorId ? game.actors.get(this.defensorId) : null;
  }

  /** @override */
  async getData(options) {
    const actors = game.actors.filter((a) => ["personagem", "npc"].includes(a.type));

    const ataqueAtual = ATAQUES_CONFRONTO[this.ataqueTipo] ?? ATAQUES_CONFRONTO.direto;
    const talentoOptions = ataqueAtual.talentOptions ?? [ataqueAtual.talent];
    if (!this.ataqueTalento || !talentoOptions.includes(this.ataqueTalento)) {
      this.ataqueTalento = talentoOptions[0];
    }
    const posturaAtual = POSTURAS_CONFRONTO[this.posturaTipo] ?? POSTURAS_CONFRONTO.inabalavel;

    return {
      actors,
      atacanteId: this.atacanteId,
      defensorId: this.defensorId,
      atacante: this.atacante,
      defensor: this.defensor,
      ataques: ATAQUES_CONFRONTO,
      posturas: POSTURAS_CONFRONTO,
      ataqueTipoAtual: this.ataqueTipo,
      ataqueTalentoAtual: this.ataqueTalento,
      posturaTipoAtual: this.posturaTipo,
      talentoOptions,
      ataqueDescricaoAtual: ataqueAtual.descricao,
      posturaDescricaoAtual: posturaAtual.descricao,
      rodada: this.rodada,
      log: this.log,
      encerrado: this.encerrado,
      vencedor: this.vencedor,
      perdedor: this.perdedor
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find("select[name='atacanteId']").on("change", (ev) => {
      this.atacanteId = ev.currentTarget.value || null;
      this.render(false);
    });
    html.find("select[name='defensorId']").on("change", (ev) => {
      this.defensorId = ev.currentTarget.value || null;
      this.render(false);
    });
    html.find("select[name='ataqueTipo']").on("change", (ev) => {
      this.ataqueTipo = ev.currentTarget.value;
      this.ataqueTalento = null; // recalculado no getData
      this.render(false);
    });
    html.find("select[name='ataqueTalento']").on("change", (ev) => {
      this.ataqueTalento = ev.currentTarget.value;
    });
    html.find("select[name='posturaTipo']").on("change", (ev) => {
      this.posturaTipo = ev.currentTarget.value;
      this.render(false);
    });

    html.find(".imintoyou-resolver-rodada").on("click", () => this._onResolverRodada());
    html.find(".imintoyou-reiniciar-confronto").on("click", () => this._onReiniciar());
  }

  async _onResolverRodada() {
    if (!this.atacante || !this.defensor) {
      ui.notifications.warn("Selecione o Atacante e o Defensor antes de resolver a rodada.");
      return;
    }
    if (this.atacante.id === this.defensor.id) {
      ui.notifications.warn("O Atacante e o Defensor não podem ser o mesmo personagem.");
      return;
    }
    if (this.encerrado) {
      ui.notifications.warn("Este Confronto já terminou. Clique em 'Reiniciar Confronto' para começar outro.");
      return;
    }

    const ataqueDef = ATAQUES_CONFRONTO[this.ataqueTipo];
    const posturaDef = POSTURAS_CONFRONTO[this.posturaTipo];
    const talentoAtaque = this.ataqueTalento ?? (ataqueDef.talentOptions?.[0] ?? ataqueDef.talent);

    this.rodada += 1;

    const atacanteSys = this.atacante.system;
    const defensorSys = this.defensor.system;

    // --- Rolagem do Atacante ---
    const charAtaqueVal = atacanteSys.characteristics?.[ataqueDef.char]?.value ?? 0;
    const talentoAtaqueVal = atacanteSys.talents?.[ataqueDef.char]?.[talentoAtaque] ?? 0;
    const bonusRepAtaque = bonusReputacaoConfronto(this.atacante, "ataque");
    const rollAtacante = await new Roll("2d12 + @c + @t + @rep", {
      c: charAtaqueVal,
      t: talentoAtaqueVal,
      rep: bonusRepAtaque
    }).roll();

    // --- Rolagem de Defesa (Blefe sempre usa Sagacidade+Percepção, ignorando a Postura escolhida) ---
    const defesaChar = ataqueDef.defesaFixa?.char ?? posturaDef.char;
    const defesaTalent = ataqueDef.defesaFixa?.talent ?? posturaDef.talent;
    const charDefesaVal = defensorSys.characteristics?.[defesaChar]?.value ?? 0;
    const talentoDefesaVal = defensorSys.talents?.[defesaChar]?.[defesaTalent] ?? 0;
    const bonusRepDefesa = bonusReputacaoConfronto(this.defensor, "defesa");
    const rollDefensor = await new Roll("2d12 + @c + @t + @rep", {
      c: charDefesaVal,
      t: talentoDefesaVal,
      rep: bonusRepDefesa
    }).roll();

    // --- Resolução de empate (regras do Cap. 2.1) ---
    let sucesso;
    if (rollAtacante.total > rollDefensor.total) {
      sucesso = true;
    } else if (rollAtacante.total < rollDefensor.total) {
      sucesso = false;
    } else if (this.defensor.type !== "personagem") {
      // Jogador vs. Mundo/NPC: empate favorece o Personagem Ativo (quem iniciou a ação)
      sucesso = true;
    } else {
      // Jogador vs. Jogador: soma estrutural (Característica+Talento) decide; empate final favorece o Ativo
      const somaAtacante = charAtaqueVal + talentoAtaqueVal + bonusRepAtaque;
      const somaDefensor = charDefesaVal + talentoDefesaVal + bonusRepDefesa;
      sucesso = somaAtacante >= somaDefensor;
    }

    let dano = 0;
    let danoEmSiAtacante = 0;
    const detalhes = [];
    if (bonusRepAtaque > 0) detalhes.push(`${this.atacante.name} recebeu +${bonusRepAtaque} passivo no Ataque (Reputação em ${atacanteSys.status.reputacao.value} — Presença Dominante).`);
    if (bonusRepDefesa > 0) detalhes.push(`${this.defensor.name} recebeu +${bonusRepDefesa} passivo na Defesa (Reputação em ${defensorSys.status.reputacao.value} — Presença Dominante).`);

    if (sucesso) {
      if (ataqueDef.danoDado) {
        const danoRoll = await new Roll(ataqueDef.danoDado).roll();
        dano = danoRoll.total + ataqueDef.danoBonus(atacanteSys);
        detalhes.push(`Dado de dano (${ataqueDef.danoDado}): ${danoRoll.total} + Presença (${ataqueDef.danoBonus(atacanteSys)})`);
      } else {
        dano = ataqueDef.dano(atacanteSys);
      }

      if (ataqueDef.bonusVinculoPositivo && this._defensorTemVinculoPositivoCom(this.atacante)) {
        dano += ataqueDef.bonusVinculoPositivo;
        detalhes.push(`+${ataqueDef.bonusVinculoPositivo} por Vínculo Positivo do alvo com o atacante`);
      }

      if (posturaDef.reduzDano && !ataqueDef.ignoraReducaoPostura) {
        const reducao = posturaDef.reduzDano(defensorSys);
        const antes = dano;
        dano = Math.max(0, dano - reducao);
        detalhes.push(`Redução por ${posturaDef.label}: -${reducao} (${antes} → ${dano})`);
      } else if (posturaDef.reduzDano && ataqueDef.ignoraReducaoPostura) {
        detalhes.push(`${ataqueDef.label} ignora a redução de dano da Postura.`);
      }
    } else {
      if (ataqueDef.autoDanoSeFalhar) {
        danoEmSiAtacante += ataqueDef.autoDanoSeFalhar;
        detalhes.push(`Blefe fracassado: o atacante sofre ${ataqueDef.autoDanoSeFalhar} de Conflito Interno.`);
      }
      if (posturaDef.contraAtaqueSeAtacanteFalhar) {
        danoEmSiAtacante += posturaDef.contraAtaqueSeAtacanteFalhar;
        detalhes.push(`${posturaDef.label}: o atacante sofre +${posturaDef.contraAtaqueSeAtacanteFalhar} de Conflito Interno pelo constrangimento.`);
      }
      if (posturaDef.curaSeAtacanteFalhar) {
        detalhes.push(`${posturaDef.label}: o defensor recupera ${posturaDef.curaSeAtacanteFalhar} de Conflito Interno.`);
      }
    }

    // --- Aplica dano no Defensor ---
    if (dano > 0) {
      const novo = Math.min(defensorSys.status.conflitoInterno.max, defensorSys.status.conflitoInterno.value + dano);
      await this.defensor.update({ "system.status.conflitoInterno.value": novo });
    }

    // --- Aplica autodano no Atacante (Blefe falho / Ironia) ---
    if (danoEmSiAtacante > 0) {
      const novo = Math.min(atacanteSys.status.conflitoInterno.max, atacanteSys.status.conflitoInterno.value + danoEmSiAtacante);
      await this.atacante.update({ "system.status.conflitoInterno.value": novo });
    }

    // --- Aplica cura no Defensor (Escudo de Vínculo, quando o atacante falha) ---
    if (!sucesso && posturaDef.curaSeAtacanteFalhar) {
      const novo = Math.max(0, defensorSys.status.conflitoInterno.value - posturaDef.curaSeAtacanteFalhar);
      await this.defensor.update({ "system.status.conflitoInterno.value": novo });
    }

    const entrada = {
      rodada: this.rodada,
      atacanteNome: this.atacante.name,
      defensorNome: this.defensor.name,
      ataqueLabel: ataqueDef.label,
      posturaLabel: posturaDef.label,
      rollAtacanteTotal: rollAtacante.total,
      rollDefensorTotal: rollDefensor.total,
      sucesso,
      dano,
      danoEmSiAtacante,
      detalhes
    };
    this.log.unshift(entrada);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.atacante }),
      content: this._renderEntradaChat(entrada)
    });

    await this._checarFimDeConfronto();
    this.render(false);
  }

  /**
   * Heurística simples: procura, entre os Vínculos do defensor, algum cujo
   * campo "Alvo" (texto livre) mencione o nome do atacante e cuja Escala de
   * Afeto seja positiva.
   */
  _defensorTemVinculoPositivoCom(atacante) {
    const vinculos = this.defensor.items.filter((i) => i.type === "vinculo");
    return vinculos.some(
      (v) => (v.system.escalaAfeto ?? 0) > 0 && v.system.alvo?.toLowerCase().includes(atacante.name.toLowerCase())
    );
  }

  async _checarFimDeConfronto() {
    const defensorAtual = this.defensor.system.status.conflitoInterno.value;
    const defensorMax = this.defensor.system.status.conflitoInterno.max;
    const atacanteAtual = this.atacante.system.status.conflitoInterno.value;
    const atacanteMax = this.atacante.system.status.conflitoInterno.max;

    if (defensorAtual >= defensorMax) {
      this.encerrado = true;
      this.vencedor = this.atacante.name;
      this.perdedor = this.defensor.name;
    } else if (atacanteAtual >= atacanteMax) {
      this.encerrado = true;
      this.vencedor = this.defensor.name;
      this.perdedor = this.atacante.name;
    }

    if (this.encerrado) await this._postarFimDeConfronto();
  }

  async _postarFimDeConfronto() {
    const content = `
      <h3>🏁 Fim do Confronto</h3>
      <p><strong>${this.perdedor}</strong> encheu a barra de Conflito Interno e cede à pressão emocional — perde a argumentação, entra em Surto, chora, bate em retirada, revela a informação desejada ou aceita os termos propostos (a critério do Mestre).</p>
      <p><strong>Consequências (Capítulo 3.4):</strong></p>
      <ul>
        <li>A Escala de Afeto entre os dois muda: humilhar publicamente reduz em -1 ou -2; vencer por Persuasão Emocional/Acolhimento pode subir +1.</li>
        <li>Informações e desabafos do auge do Confronto costumam virar novos Segredos Confidenciais ou Vínculos de Rivalidade.</li>
        <li>O objetivo que <strong>${this.vencedor}</strong> determinou antes do Confronto começar é atingido.</li>
      </ul>`;
    await ChatMessage.create({ content, speaker: { alias: "I'm Into You — Confronto" } });
  }

  _renderEntradaChat(e) {
    const resultado = e.sucesso
      ? `<span style="color:#2a7d2a;font-weight:bold;">ACERTOU</span>`
      : `<span style="color:#a33;font-weight:bold;">FALHOU</span>`;
    let html = `<div class="imintoyou-confronto-chat">
      <strong>Confronto — Rodada ${e.rodada}</strong><br/>
      ${e.atacanteNome} usa <em>${e.ataqueLabel}</em> (total ${e.rollAtacanteTotal}) contra ${e.defensorNome},
      que reage com <em>${e.posturaLabel}</em> (total ${e.rollDefensorTotal}): ${resultado}`;
    if (e.dano > 0) html += `<br/>💥 <strong>${e.dano}</strong> de Conflito Interno em ${e.defensorNome}.`;
    if (e.danoEmSiAtacante > 0) html += `<br/>😰 <strong>${e.danoEmSiAtacante}</strong> de Conflito Interno em ${e.atacanteNome}.`;
    if (e.detalhes?.length) html += `<ul>${e.detalhes.map((d) => `<li>${d}</li>`).join("")}</ul>`;
    html += `</div>`;
    return html;
  }

  _onReiniciar() {
    this.rodada = 0;
    this.log = [];
    this.encerrado = false;
    this.vencedor = null;
    this.perdedor = null;
    this.render(false);
  }
}
