import { DURACAO_PADRAO, LABEL_MATERIA, TOTAL_PROVAS_ANO } from "../data/aulas.js";
import { dispararProva } from "../aulas.js";
import { BoletimApp } from "./boletim-app.js";

/** Janela do Mestre para iniciar uma Prova de Aula em todos os clientes. */
export class AulasApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-aulas",
      classes: ["imintoyou", "imintoyou-aulas"],
      template: "systems/imintoyou/templates/apps/aulas.hbs",
      title: "Provas de Aula — I'm Into You",
      width: 380,
      height: "auto",
      resizable: false
    });
  }

  constructor(options = {}) {
    super(options);
    this.materia = "ingles";
    this.idioma = "pt";
    this.provaNumero = 1;
    this.duracaoSegundos = DURACAO_PADRAO.ingles;
  }

  /** @override */
  async getData(options) {
    return {
      materias: LABEL_MATERIA,
      materiaAtual: this.materia,
      idiomaAtual: this.idioma,
      mostrarIdioma: this.materia === "ingles",
      mostrarDuracao: this.materia !== "edfisica",
      provaNumero: this.provaNumero,
      provasDoAno: Array.from({ length: TOTAL_PROVAS_ANO }, (_, i) => i + 1),
      duracaoSegundos: this.duracaoSegundos
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find("select[name='materia']").on("change", (ev) => {
      this.materia = ev.currentTarget.value;
      this.duracaoSegundos = DURACAO_PADRAO[this.materia];
      this.render();
    });

    html.find("select[name='idioma']").on("change", (ev) => {
      this.idioma = ev.currentTarget.value;
    });

    html.find("select[name='provaNumero']").on("change", (ev) => {
      this.provaNumero = Number(ev.currentTarget.value);
    });

    html.find("input[name='duracao']").on("change", (ev) => {
      const valor = Number(ev.currentTarget.value);
      if (valor > 0) this.duracaoSegundos = valor;
    });

    html.find(".imintoyou-btn-iniciar-prova").on("click", () => {
      dispararProva({
        materia: this.materia,
        idioma: this.idioma,
        provaNumero: this.provaNumero,
        duracaoSegundos: this.duracaoSegundos
      });
      this.close();
    });

    html.find(".imintoyou-btn-ver-boletim").on("click", () => {
      new BoletimApp().render(true);
    });
  }
}
