import { OBJETOS_IMPROVISADOS, FERIMENTOS_PROLONGADOS } from "../data/combate.js";
import { criarEfeito } from "../efeitos.js";

/**
 * Janela que roda um Combate Físico (Capítulo 8) entre um Atacante e um
 * Defensor, na Vitalidade em vez do Conflito Interno. Assim como o
 * Confronto, é pensada para uma pessoa só operar (o Mestre), escolhendo a
 * ação de ambos os lados a cada rodada.
 */
export class CombateApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-combate",
      classes: ["imintoyou", "imintoyou-confronto"],
      template: "systems/imintoyou/templates/apps/combate.hbs",
      title: "Combate Físico — I'm Into You",
      width: 640,
      height: "auto",
      resizable: true
    });
  }

  constructor(options = {}) {
    super(options);
    this.atacanteId = options.atacanteId ?? null;
    this.defensorId = options.defensorId ?? null;
    this.tipoAtaque = "socoDireto"; // "socoDireto" | "objeto"
    this.socoModo = "forcaBruta"; // "forcaBruta" | "agilidade"
    this.objetoTipo = "pequeno";
    this.objetoTalento = "esportes"; // "esportes" | "forcaBruta"
    this.posturaDefesa = "esquiva"; // "esquiva" | "bloqueio"
    this.rodada = 0;
    this.log = [];
    this.encerrado = false;
    this.mensagemFinal = null;
    this.nocauteados = new Set();
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

    return {
      actors,
      atacanteId: this.atacanteId,
      defensorId: this.defensorId,
      atacante: this.atacante,
      defensor: this.defensor,
      tipoAtaque: this.tipoAtaque,
      socoModo: this.socoModo,
      objetoTipo: this.objetoTipo,
      objetoTalento: this.objetoTalento,
      posturaDefesa: this.posturaDefesa,
      objetos: OBJETOS_IMPROVISADOS,
      rodada: this.rodada,
      log: this.log,
      encerrado: this.encerrado,
      mensagemFinal: this.mensagemFinal
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
    html.find("select[name='tipoAtaque']").on("change", (ev) => {
      this.tipoAtaque = ev.currentTarget.value;
      this.render(false);
    });
    html.find("select[name='socoModo']").on("change", (ev) => (this.socoModo = ev.currentTarget.value));
    html.find("select[name='objetoTipo']").on("change", (ev) => (this.objetoTipo = ev.currentTarget.value));
    html.find("select[name='objetoTalento']").on("change", (ev) => (this.objetoTalento = ev.currentTarget.value));
    html.find("select[name='posturaDefesa']").on("change", (ev) => {
      this.posturaDefesa = ev.currentTarget.value;
      this.render(false);
    });

    html.find(".imintoyou-resolver-rodada").on("click", () => this._onResolverRodada());
    html.find(".imintoyou-reiniciar-confronto").on("click", () => this._onReiniciar());
    html.find(".imintoyou-primeiros-socorros").on("click", () => this._onPrimeirosSocorros());
    html.find(".imintoyou-noite-de-sono").on("click", () => this._onNoiteDeSono());
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
      ui.notifications.warn("Este Combate já terminou. Clique em 'Reiniciar' para começar outro.");
      return;
    }

    this.rodada += 1;

    const atacanteSys = this.atacante.system;
    const defensorSys = this.defensor.system;

    const atletismoAtacante = atacanteSys.characteristics?.atletismo?.value ?? 0;
    const forcaBrutaAtacante = atacanteSys.talents?.atletismo?.forcaBruta ?? 0;
    const agilidadeAtacante = atacanteSys.talents?.atletismo?.agilidade ?? 0;

    let talentoAtaque;
    let bonusObjeto = 0;
    let descricaoAtaque;

    if (this.tipoAtaque === "socoDireto") {
      talentoAtaque = this.socoModo;
      descricaoAtaque = this.socoModo === "forcaBruta" ? "Briga / Soco Direto (Força Bruta)" : "Briga / Golpe Rápido (Agilidade)";
    } else {
      talentoAtaque = this.objetoTalento;
      const objetoDef = OBJETOS_IMPROVISADOS[this.objetoTipo];
      bonusObjeto = objetoDef.bonus(atletismoAtacante);
      descricaoAtaque = `Ataque com ${objetoDef.label}`;
    }

    const talentoAtaqueVal = atacanteSys.talents?.atletismo?.[talentoAtaque] ?? 0;
    const rollAtaque = await new Roll("2d12 + @c + @t", { c: atletismoAtacante, t: talentoAtaqueVal }).roll();
    const d1Ataque = rollAtaque.terms[0].results[0].result;
    const d2Ataque = rollAtaque.terms[0].results[1].result;
    const sucessoIncrivel = d1Ataque === 12 && d2Ataque === 12;
    const falhaDesastrosa = d1Ataque === 1 && d2Ataque === 1;

    const defesaChar = this.posturaDefesa === "esquiva" ? "atletismo" : "vigor";
    const defesaTalent = this.posturaDefesa === "esquiva" ? "agilidade" : "resistencia";
    const defesaCharVal = defensorSys.characteristics?.[defesaChar]?.value ?? 0;
    const defesaTalentVal = defensorSys.talents?.[defesaChar]?.[defesaTalent] ?? 0;
    const rollDefesa = await new Roll("2d12 + @c + @t", { c: defesaCharVal, t: defesaTalentVal }).roll();

    const detalhes = [];
    let acertou;
    if (falhaDesastrosa) {
      acertou = false;
      detalhes.push("Falha Desastrosa (1 e 1) — o golpe erra feio, ignorando qualquer bônus.");
    } else if (sucessoIncrivel) {
      acertou = true;
      detalhes.push("Sucesso Incrível (12 e 12)! O golpe acerta automaticamente, não importa a defesa.");
    } else {
      acertou = rollAtaque.total > rollDefesa.total;
      if (!acertou) detalhes.push("O defensor empatou ou superou o ataque — golpe esquivado/amortecido, sem dano.");
    }

    let dano = 0;
    let danoCritico = false;

    if (acertou) {
      const margem = Math.max(0, rollAtaque.total - rollDefesa.total);
      const danoBase = Math.max(forcaBrutaAtacante, agilidadeAtacante);
      dano = danoBase + margem + bonusObjeto;
      detalhes.push(`Dano = ${danoBase} (maior entre Força Bruta/Agilidade) + ${margem} (margem) ${bonusObjeto ? `+ ${bonusObjeto} (objeto)` : ""}`);

      const vitalidadeAtualDefensor = defensorSys.status.vitalidade.value;
      if (sucessoIncrivel || dano >= vitalidadeAtualDefensor / 2) {
        danoCritico = true;
      }
    }

    let mensagemMorte = null;
    let mensagemNocaute = null;

    if (dano > 0) {
      const vitalidadeAtual = defensorSys.status.vitalidade.value;
      const jaNocauteado = this.nocauteados.has(this.defensor.id);
      const bruto = vitalidadeAtual - dano;

      if (jaNocauteado) {
        mensagemMorte = `${this.defensor.name} já estava nocauteado e recebeu mais dano — o personagem não resiste.`;
        this.encerrado = true;
        this.mensagemFinal = mensagemMorte;
      } else if (bruto <= -3) {
        mensagemMorte = `O golpe foi brutal demais (${bruto} de Vitalidade) — ${this.defensor.name} não resiste.`;
        this.encerrado = true;
        this.mensagemFinal = mensagemMorte;
        await this.defensor.update({ "system.status.vitalidade.value": 0 });
      } else if (bruto <= 0) {
        this.nocauteados.add(this.defensor.id);
        mensagemNocaute = `${this.defensor.name} foi nocauteado (Vitalidade zerada)!`;
        await this.defensor.update({ "system.status.vitalidade.value": 0 });
      } else {
        await this.defensor.update({ "system.status.vitalidade.value": bruto });
      }
    }

    let ferimento = null;
    if (danoCritico && !mensagemMorte) {
      const rollFerimento = await new Roll("1d6").roll();
      ferimento = FERIMENTOS_PROLONGADOS[rollFerimento.total];

      const updateData = {};
      if (ferimento.conflitoInternoDelta) {
        const atual = defensorSys.status.conflitoInterno.value;
        const max = defensorSys.status.conflitoInterno.max;
        updateData["system.status.conflitoInterno.value"] = Math.min(max, atual + ferimento.conflitoInternoDelta);
      }
      if (ferimento.reputacaoDelta) {
        const atual = defensorSys.status.reputacao.value;
        const max = defensorSys.status.reputacao.max;
        updateData["system.status.reputacao.value"] = Math.max(0, Math.min(max, atual + ferimento.reputacaoDelta));
      }
      if (Object.keys(updateData).length) await this.defensor.update(updateData);

      if (ferimento.efeitoAtivo) {
        await criarEfeito(this.defensor, {
          label: ferimento.nome,
          icon: ferimento.efeitoAtivo.icon,
          changes: ferimento.efeitoAtivo.changes,
          duracaoLabel: ferimento.efeitoAtivo.duracaoLabel,
          permanente: ferimento.efeitoAtivo.permanente ?? false
        });
      }
    }

    const entrada = {
      rodada: this.rodada,
      atacanteNome: this.atacante.name,
      defensorNome: this.defensor.name,
      descricaoAtaque,
      posturaLabel: this.posturaDefesa === "esquiva" ? "Esquiva" : "Bloqueio / Absorção",
      rollAtaqueTotal: rollAtaque.total,
      rollDefesaTotal: rollDefesa.total,
      acertou,
      dano,
      danoCritico,
      detalhes,
      ferimento,
      mensagemNocaute,
      mensagemMorte
    };
    this.log.unshift(entrada);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: this.atacante }),
      content: this._renderEntradaChat(entrada)
    });

    this.render(false);
  }

  async _onPrimeirosSocorros() {
    if (!this.atacante || !this.defensor) {
      ui.notifications.warn("Selecione quem presta o socorro (Atacante) e quem recebe (Defensor).");
      return;
    }
    const socorrista = this.atacante;
    const ferido = this.defensor;
    const sys = socorrista.system;

    const talento = Math.max(sys.talents?.sagacidade?.conhecimento ?? 0, sys.talents?.sagacidade?.investigacao ?? 0);
    const roll = await new Roll("2d12 + @c + @t", { c: sys.characteristics?.sagacidade?.value ?? 0, t: talento }).roll();
    const sucesso = roll.total >= 12;

    let texto = `<strong>${socorrista.name}</strong> tenta Primeiros Socorros em <strong>${ferido.name}</strong> (DF 12): total ${roll.total} — `;
    if (sucesso) {
      const max = ferido.system.status.vitalidade.max;
      const novo = Math.min(max, ferido.system.status.vitalidade.value + 3);
      await ferido.update({ "system.status.vitalidade.value": novo });
      texto += `<strong>sucesso!</strong> +3 de Vitalidade.`;
      this.nocauteados.delete(ferido.id);
    } else {
      texto += `<strong>falhou.</strong> Nenhuma recuperação.`;
    }

    await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor: socorrista }), content: texto, rolls: [roll] });
    this.render(false);
  }

  async _onNoiteDeSono() {
    if (!this.defensor) {
      ui.notifications.warn("Selecione o personagem que vai descansar (campo Defensor).");
      return;
    }
    const alvo = this.defensor;
    const vigor = alvo.system.characteristics?.vigor?.value ?? 0;
    const cura = 3 + vigor;
    const max = alvo.system.status.vitalidade.max;
    const novo = Math.min(max, alvo.system.status.vitalidade.value + cura);
    await alvo.update({ "system.status.vitalidade.value": novo });
    this.nocauteados.delete(alvo.id);

    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor: alvo }),
      content: `<strong>${alvo.name}</strong> dorme pelo menos 8 horas e recupera <strong>${cura}</strong> de Vitalidade (3 + Vigor).`
    });
    this.render(false);
  }

  _renderEntradaChat(e) {
    const resultado = e.acertou
      ? `<span style="color:#2a7d2a;font-weight:bold;">ACERTOU</span>`
      : `<span style="color:#a33;font-weight:bold;">FALHOU</span>`;
    let html = `<div class="imintoyou-confronto-chat">
      <strong>Combate — Rodada ${e.rodada}</strong><br/>
      ${e.atacanteNome} usa <em>${e.descricaoAtaque}</em> (total ${e.rollAtaqueTotal}) contra ${e.defensorNome},
      que reage com <em>${e.posturaLabel}</em> (total ${e.rollDefesaTotal}): ${resultado}`;
    if (e.dano > 0) html += `<br/>💥 <strong>${e.dano}</strong> de Vitalidade em ${e.defensorNome}${e.danoCritico ? " — <strong>DANO CRÍTICO!</strong>" : ""}.`;
    if (e.detalhes?.length) html += `<ul>${e.detalhes.map((d) => `<li>${d}</li>`).join("")}</ul>`;
    if (e.ferimento) {
      html += `<div class="imintoyou-ferimento"><strong>🩹 Ferimento Prolongado: ${e.ferimento.nome}</strong><p>${e.ferimento.efeito}</p>${e.ferimento.efeitoAtivo ? `<p class="hint">📌 Efeito colado na ficha (${e.ferimento.efeitoAtivo.duracaoLabel})</p>` : ""}</div>`;
    }
    if (e.mensagemNocaute) html += `<p style="color:#c98a2b;font-weight:bold;">😵 ${e.mensagemNocaute}</p>`;
    if (e.mensagemMorte) html += `<p style="color:#a33;font-weight:bold;">💀 ${e.mensagemMorte}</p>`;
    html += `</div>`;
    return html;
  }

  _onReiniciar() {
    this.rodada = 0;
    this.log = [];
    this.encerrado = false;
    this.mensagemFinal = null;
    this.nocauteados.clear();
    this.render(false);
  }
}
