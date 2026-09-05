import { ProvaAppBase } from "./prova-base.js";
import { cargasVantagem } from "../data/aulas.js";
import { gerarEquacao } from "../data/matematica.js";

const VIDAS_BASE = 3;
const VIDAS_MAXIMO = 5;
const ACERTOS_POR_NIVEL = 3;

export class ProvaMatematicaApp extends ProvaAppBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-prova-matematica",
      classes: ["imintoyou", "imintoyou-prova"],
      template: "systems/imintoyou/templates/apps/prova-matematica.hbs",
      title: "Prova de Matemática — I'm Into You",
      width: 460,
      height: "auto",
      resizable: false
    });
  }

  constructor(options = {}) {
    super({ ...options, materia: "matematica" });
    const cargas = cargasVantagem(this.actor, "sagacidade", "conhecimento");
    this.vidas = Math.min(VIDAS_BASE + cargas, VIDAS_MAXIMO);
    this.nivel = 1;
    this.acertosSeguidos = 0;
    this.pontuacao = 0;
    this.equacaoAtual = gerarEquacao(this.nivel);
  }

  /** @override */
  async getData(options) {
    return {
      vidas: this.vidas,
      nivel: this.nivel,
      pontuacao: this.pontuacao,
      equacao: this.equacaoAtual,
      tempoRestante: this.tempoRestante
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-opcao-numero").on("click", (ev) => this._onResponder(ev));

    this.iniciarTimer(() => this._acabarProva());
  }

  _onResponder(ev) {
    if (this.finalizada) return;
    const valor = Number(ev.currentTarget.dataset.valor);
    if (valor === this.equacaoAtual.resposta) {
      this.pontuacao += this.equacaoAtual.nivel;
      this.acertosSeguidos += 1;
      if (this.acertosSeguidos >= ACERTOS_POR_NIVEL) {
        this.acertosSeguidos = 0;
        this.nivel += 1;
      }
    } else {
      this.vidas -= 1;
      if (this.vidas <= 0) {
        this._acabarProva();
        return;
      }
    }
    this.equacaoAtual = gerarEquacao(this.nivel);
    this.render();
  }

  _acabarProva() {
    this.finalizarProva(this.pontuacao, this._pontuacaoMaxima(), `nível ${this.nivel}, ${this.vidas} vida(s) restante(s)`);
  }

  // Referência fixa pra converter pontuação em nota (ajustável depois).
  _pontuacaoMaxima() {
    return 20;
  }
}
