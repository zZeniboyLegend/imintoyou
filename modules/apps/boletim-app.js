import { LABEL_MATERIA, lerBoletim } from "../data/aulas.js";

/** Janela do Mestre que mostra o boletim acumulado de todos os personagens. */
export class BoletimApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-boletim",
      classes: ["imintoyou", "imintoyou-boletim"],
      template: "systems/imintoyou/templates/apps/boletim.hbs",
      title: "Boletim — I'm Into You",
      width: 620,
      height: "auto",
      resizable: true
    });
  }

  constructor(options = {}) {
    super(options);
    this.aberto = false;
  }

  /** @override */
  async getData(options) {
    const personagens = game.actors.filter((a) => a.type === "personagem");
    const boletins = personagens.map((actor) => ({
      actor,
      ...lerBoletim(actor)
    }));

    return {
      aberto: this.aberto,
      boletins,
      materias: LABEL_MATERIA
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-btn-abrir-envelope").on("click", () => {
      this.aberto = true;
      this.render();
    });
  }
}
