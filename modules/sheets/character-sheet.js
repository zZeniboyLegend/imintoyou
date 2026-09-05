/**
 * Ficha de Personagem do sistema "I'm Into You".
 */
import { ConfrontoApp } from "../apps/confronto-app.js";
import { CombateApp } from "../apps/combate-app.js";
import { subirDeNivel } from "../progressao.js";
import { NIVEL_HABILIDADE_TRIBO, FASE_POR_NIVEL } from "../data/progressao.js";
import { rodarManhaSeguinte } from "../manha-seguinte.js";
import { abrirDialogoImpulsoSocial, chamarDoHolofote } from "../reputacao.js";

export class ImIntoYouCharacterSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["imintoyou", "sheet", "actor", "personagem"],
      template: "systems/imintoyou/templates/sheets/character-sheet.hbs",
      width: 760,
      height: 860,
      tabs: [
        { navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "principal" }
      ]
    });
  }

  /** @override */
  async getData(options) {
    const context = await super.getData(options);
    context.system = context.actor.system;
    context.config = CONFIG.IMINTOYOU;
    context.nivelAtual = context.system.nivel?.value ?? 1;
    context.faseAtual = FASE_POR_NIVEL[context.nivelAtual];
    context.podeSubirNivel =
      context.nivelAtual < 10 && (context.system.xp?.value ?? 0) >= (context.system.xpProximoNivel ?? Infinity);

    // Opções para gastar Pontos de Talento livres (formato "característica.talento")
    context.talentoOptions = [];
    for (const [charKey, grupo] of Object.entries(context.system.talents ?? {})) {
      for (const talentKey of Object.keys(grupo)) {
        context.talentoOptions.push({
          value: `${charKey}.${talentKey}`,
          label: `${this._capitalize(charKey)} → ${this._capitalize(talentKey)}`
        });
      }
    }

    // Opções para gastar Pontos de Característica livres
    context.caracteristicaOptions = Object.keys(context.system.characteristics ?? {}).map((key) => ({
      value: key,
      label: this._capitalize(key)
    }));

    // Habilidades de Tribo — quais já estão destravadas pelo Nível atual
    if (context.system.triboAtiva) {
      context.habilidadesTribo = Object.entries(context.system.triboAtiva.habilidades ?? {}).map(([key, hab]) => ({
        key,
        nome: hab.nome,
        descricao: hab.descricao,
        nivelRequerido: NIVEL_HABILIDADE_TRIBO[key] ?? 1,
        desbloqueada: context.nivelAtual >= (NIVEL_HABILIDADE_TRIBO[key] ?? 1)
      }));
    }

    // Especializações de Talento já criadas neste personagem
    context.especializacoes = this.actor.items
      .filter((i) => i.type === "especializacao")
      .map((i) => ({ id: i.id, name: i.name, talentoBase: i.system.talentoBase, descricao: i.system.descricao }));

    context.vinculos = this.actor.items
      .filter((i) => i.type === "vinculo")
      .map((i) => {
        const escala = i.system.escalaAfeto ?? 0;
        return {
          id: i.id,
          name: i.name,
          alvo: i.system.alvo,
          descricao: i.system.descricao,
          tipo: i.system.tipo,
          escalaAfeto: escala,
          label: CONFIG.IMINTOYOU.escalaAfetoLabels[String(escala)],
          bonusElite: CONFIG.IMINTOYOU.getBonusElite(escala, i.system.tipo)
        };
      });

    // Efeitos Ativos — os "adesivos" colados na ficha (Ferimentos Prolongados, Ressaca etc.)
    context.efeitosAtivos = this.actor.effects.map((e) => ({
      id: e.id,
      name: e.name,
      img: e.img,
      duracaoLabel: e.flags?.imintoyou?.duracaoLabel ?? "",
      permanente: e.flags?.imintoyou?.permanente ?? false
    }));

    return context;
  }

  _capitalize(str) {
    if (typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Remover a tribo ativa (funciona mesmo em modo de leitura, é útil ao Mestre)
    html.find(".imintoyou-remover-tribo").on("click", (event) => this._onRemoverTribo(event));

    // Vínculos
    html.find(".imintoyou-vinculo-criar").on("click", (event) => this._onCriarVinculo(event));
    html.find(".imintoyou-vinculo-editar").on("click", (event) => this._onEditarVinculo(event));
    html.find(".imintoyou-vinculo-excluir").on("click", (event) => this._onExcluirVinculo(event));
    html.find(".imintoyou-vinculo-subir").on("click", (event) => this._onAjustarVinculo(event, 1));
    html.find(".imintoyou-vinculo-descer").on("click", (event) => this._onAjustarVinculo(event, -1));

    // Confronto
    html.find(".imintoyou-iniciar-confronto").on("click", () => {
      new ConfrontoApp({ atacanteId: this.actor.id }).render(true);
    });

    html.find(".imintoyou-iniciar-combate").on("click", () => {
      new CombateApp({ atacanteId: this.actor.id }).render(true);
    });

    // Manhã Seguinte
    html.find(".imintoyou-manha-seguinte").on("click", () => rodarManhaSeguinte(this.actor));

    // Reputação
    html.find(".imintoyou-chamado-holofote").on("click", () => chamarDoHolofote(this.actor));

    // Progressão de Nível
    html.find(".imintoyou-subir-nivel").on("click", () => subirDeNivel(this.actor));
    html.find(".imintoyou-gastar-talento").on("click", (event) => this._onGastarPontoTalento(event));
    html.find(".imintoyou-gastar-caracteristica").on("click", (event) => this._onGastarPontoCaracteristica(event));
    html.find(".imintoyou-criar-especializacao").on("click", (event) => this._onCriarEspecializacao(event));
    html.find(".imintoyou-especializacao-abrir").on("click", (event) => {
      const id = event.currentTarget.closest("[data-item-id]")?.dataset.itemId;
      this.actor.items.get(id)?.sheet.render(true);
    });

    // Efeitos Ativos ("adesivos" na ficha)
    html.find(".imintoyou-efeito-abrir").on("click", (event) => {
      const id = event.currentTarget.closest("[data-effect-id]")?.dataset.effectId;
      this.actor.effects.get(id)?.sheet.render(true);
    });
    html.find(".imintoyou-efeito-remover").on("click", async (event) => {
      event.stopPropagation();
      const id = event.currentTarget.closest("[data-effect-id]")?.dataset.effectId;
      if (id) await this.actor.deleteEmbeddedDocuments("ActiveEffect", [id]);
    });

    if (!this.isEditable) return;

    // Clique numa Característica ou Talento dispara a rolagem 2d12 + Característica (+ Talento)
    html.find(".rollable").on("click", (event) => this._onRoll(event));
  }

  /** @override */
  async _onDropItem(event, data) {
    if (!this.actor.isOwner) return false;
    const item = await Item.implementation.fromDropData(data);

    // Só pode haver UMA Tribo Social ativa por personagem — remove a anterior
    // antes de deixar o comportamento padrão embutir a nova.
    if (item.type === "tribo") {
      const existentes = this.actor.items.filter((i) => i.type === "tribo");
      if (existentes.length) {
        await this.actor.deleteEmbeddedDocuments("Item", existentes.map((i) => i.id));
      }
      ui.notifications.info(`Tribo "${item.name}" aplicada a ${this.actor.name}. Vitalidade e Conflito Interno máximos foram recalculados.`);
    }

    return super._onDropItem(event, data);
  }

  async _onRemoverTribo(event) {
    event.preventDefault();
    const tribos = this.actor.items.filter((i) => i.type === "tribo");
    if (!tribos.length) return;
    await this.actor.deleteEmbeddedDocuments("Item", tribos.map((i) => i.id));
  }

  async _onCriarVinculo(event) {
    event.preventDefault();
    await this.actor.createEmbeddedDocuments("Item", [
      {
        name: "Novo Vínculo",
        type: "vinculo",
        system: { alvo: "", descricao: "", escalaAfeto: 0, tipo: "amizade" }
      }
    ]);
  }

  _getVinculoId(event) {
    return event.currentTarget.closest("[data-item-id]")?.dataset.itemId;
  }

  async _onEditarVinculo(event) {
    event.preventDefault();
    const id = this._getVinculoId(event);
    this.actor.items.get(id)?.sheet.render(true);
  }

  async _onExcluirVinculo(event) {
    event.preventDefault();
    const id = this._getVinculoId(event);
    const item = this.actor.items.get(id);
    if (!item) return;
    const confirmar = await Dialog.confirm({
      title: "Excluir Vínculo",
      content: `<p>Tem certeza que quer excluir o vínculo "<strong>${item.name}</strong>"?</p>`
    });
    if (confirmar) await item.delete();
  }

  async _onAjustarVinculo(event, delta) {
    event.preventDefault();
    const id = this._getVinculoId(event);
    const item = this.actor.items.get(id);
    if (!item) return;
    const novaEscala = Math.clamp
      ? Math.clamp(item.system.escalaAfeto + delta, -3, 3)
      : Math.min(3, Math.max(-3, item.system.escalaAfeto + delta));
    await item.update({ "system.escalaAfeto": novaEscala });
  }

  async _onGastarPontoTalento(event) {
    event.preventDefault();
    const select = this.element.find("select[name='gastoTalento']")[0];
    const valor = select?.value;
    if (!valor) return;

    const [charKey, talentKey] = valor.split(".");
    const pontosDisponiveis = this.actor.system.pontosTalentoLivres ?? 0;
    if (pontosDisponiveis <= 0) {
      ui.notifications.warn(`${this.actor.name} não tem Pontos de Talento livres para gastar.`);
      return;
    }

    const valorCaracteristica = this.actor.system.characteristics?.[charKey]?.value ?? 0;
    const valorTalentoAtual = this.actor.system.talents?.[charKey]?.[talentKey] ?? 0;

    // Regra de Ouro da Ficha (Cap. 2.3): um Talento nunca pode passar da sua Característica
    if (valorTalentoAtual + 1 > valorCaracteristica) {
      ui.notifications.warn(
        `Não é possível subir esse Talento: ele não pode ultrapassar o valor da Característica (${valorCaracteristica}).`
      );
      return;
    }

    await this.actor.update({
      [`system.talents.${charKey}.${talentKey}`]: valorTalentoAtual + 1,
      "system.pontosTalentoLivres": pontosDisponiveis - 1
    });
  }

  async _onGastarPontoCaracteristica(event) {
    event.preventDefault();
    const select = this.element.find("select[name='gastoCaracteristica']")[0];
    const charKey = select?.value;
    if (!charKey) return;

    const pontosDisponiveis = this.actor.system.pontosCaracteristicaLivres ?? 0;
    if (pontosDisponiveis <= 0) {
      ui.notifications.warn(`${this.actor.name} não tem Pontos de Característica livres para gastar.`);
      return;
    }

    const valorAtual = this.actor.system.characteristics?.[charKey]?.value ?? 0;
    if (valorAtual >= 6) {
      ui.notifications.warn("Essa Característica já está no valor máximo (6).");
      return;
    }

    await this.actor.update({
      [`system.characteristics.${charKey}.value`]: valorAtual + 1,
      "system.pontosCaracteristicaLivres": pontosDisponiveis - 1
    });
  }

  async _onCriarEspecializacao(event) {
    event.preventDefault();
    const pontosDisponiveis = this.actor.system.especializacoesDisponiveis ?? 0;
    if (pontosDisponiveis <= 0) {
      ui.notifications.warn(`${this.actor.name} não tem Especializações de Talento disponíveis (destravadas nos Níveis 3 e 6).`);
      return;
    }

    const [item] = await this.actor.createEmbeddedDocuments("Item", [
      {
        name: "Nova Especialização",
        type: "especializacao",
        system: { talentoBase: "", descricao: "" }
      }
    ]);
    await this.actor.update({ "system.especializacoesDisponiveis": pontosDisponiveis - 1 });
    item.sheet.render(true);
  }

  async _onRoll(event) {
    event.preventDefault();
    const el = event.currentTarget;
    const charKey = el.dataset.characteristic;
    const talentKey = el.dataset.talent;

    const charValue = this.actor.system.characteristics?.[charKey]?.value ?? 0;
    const talentValue = talentKey
      ? (this.actor.system.talents?.[charKey]?.[talentKey] ?? 0)
      : 0;

    // Impulso Social Imediato (Cap. 3.6): Shift+clique numa rolagem de
    // Presença ou Estilo abre o diálogo para queimar Reputação como bônus.
    let bonusImpulso = 0;
    if (event.shiftKey && (charKey === "presenca" || charKey === "estilo")) {
      bonusImpulso = await abrirDialogoImpulsoSocial(this.actor, charKey, talentKey);
      if (bonusImpulso > 0) {
        const repAtual = this.actor.system.status.reputacao.value;
        await this.actor.update({ "system.status.reputacao.value": repAtual - bonusImpulso });
      }
    }

    const roll = await new Roll(`2d12 + @char + @talent + @impulso`, {
      char: charValue,
      talent: talentValue,
      impulso: bonusImpulso
    }).roll();

    const d1 = roll.terms[0].results[0].result;
    const d2 = roll.terms[0].results[1].result;
    let flavor = `${game.i18n.localize("IMINTOYOU." + (charKey?.charAt(0).toUpperCase() + charKey?.slice(1)))}`;
    if (talentKey) flavor += ` + ${talentKey}`;
    if (bonusImpulso > 0) flavor += ` + ${bonusImpulso} (Impulso Social — Reputação queimada)`;
    if (d1 === 12 && d2 === 12) flavor += " — SUCESSO INCRÍVEL!";
    if (d1 === 1 && d2 === 1) flavor += " — FALHA DESASTROSA!";

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor,
      flags: {
        imintoyou: {
          isRollable: true,
          actorId: this.actor.id,
          hypeUsed: false
        }
      }
    });
  }
}
