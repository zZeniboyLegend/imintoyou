import { ConfrontoApp } from "../apps/confronto-app.js";
import { CombateApp } from "../apps/combate-app.js";
import { abrirDialogoImpulsoSocial, chamarDoHolofote } from "../reputacao.js";

/**
 * Ficha de NPC — enxuta de propósito. NPCs precisam de Características,
 * Talentos e um limite de Conflito Interno (para servir de "Defensor" no
 * Confronto), mas não têm Tribo, Vínculos, Hype ou Segredo Confidencial
 * como os Personagens de Jogador.
 */
export class ImIntoYouNpcSheet extends ActorSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["imintoyou", "sheet", "actor", "npc"],
      template: "systems/imintoyou/templates/sheets/npc-sheet.hbs",
      width: 620,
      height: 640,
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
    context.efeitosAtivos = this.actor.effects.map((e) => ({
      id: e.id,
      name: e.name,
      img: e.img,
      duracaoLabel: e.flags?.imintoyou?.duracaoLabel ?? "",
      permanente: e.flags?.imintoyou?.permanente ?? false
    }));
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".imintoyou-iniciar-confronto").on("click", () => {
      new ConfrontoApp({ defensorId: this.actor.id }).render(true);
    });

    html.find(".imintoyou-iniciar-combate").on("click", () => {
      new CombateApp({ defensorId: this.actor.id }).render(true);
    });

    html.find(".imintoyou-chamado-holofote").on("click", () => chamarDoHolofote(this.actor));

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
    html.find(".rollable").on("click", (event) => this._onRoll(event));
  }

  async _onRoll(event) {
    event.preventDefault();
    const el = event.currentTarget;
    const charKey = el.dataset.characteristic;
    const talentKey = el.dataset.talent;

    const charValue = this.actor.system.characteristics?.[charKey]?.value ?? 0;
    const talentValue = talentKey ? (this.actor.system.talents?.[charKey]?.[talentKey] ?? 0) : 0;

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
    let flavor = `${game.i18n.localize("IMINTOYOU." + (charKey?.charAt(0).toUpperCase() + charKey?.slice(1)))}${talentKey ? " + " + talentKey : ""}`;
    if (bonusImpulso > 0) flavor += ` + ${bonusImpulso} (Impulso Social — Reputação queimada)`;

    await roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      flavor
    });
  }
}
