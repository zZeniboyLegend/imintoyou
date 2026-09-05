import { ProvaAppBase } from "./prova-base.js";
import { cargasVantagem } from "../data/aulas.js";
import { FRASCOS_QUIMICA, gerarReceitaQuimica } from "../data/quimica.js";

const PASSOS_INICIAIS = 2;

export class ProvaQuimicaApp extends ProvaAppBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-prova-quimica",
      classes: ["imintoyou", "imintoyou-prova"],
      template: "systems/imintoyou/templates/apps/prova-quimica.hbs",
      title: "Prova de Química — I'm Into You",
      width: 480,
      height: "auto",
      resizable: false
    });
  }

  constructor(options = {}) {
    super({ ...options, materia: "quimica" });
    this.frascos = FRASCOS_QUIMICA;
    this.passosAtuais = PASSOS_INICIAIS;
    this.receita = gerarReceitaQuimica(this.passosAtuais);
    this.progresso = [];
    this.receitasCompletas = 0;
    this.pontuacao = 0;
    this.erros = 0;
    this.dicasRestantes = cargasVantagem(this.actor, "sagacidade", "conhecimento");
    this.dicaAtiva = null;
  }

  /** @override */
  async getData(options) {
    return {
      frascos: this.frascos,
      receita: this.receita,
      progresso: this.progresso,
      pontuacao: this.pontuacao,
      receitasCompletas: this.receitasCompletas,
      tempoRestante: this.tempoRestante,
      dicasRestantes: this.dicasRestantes,
      dicaAtiva: this.dicaAtiva
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-frasco").on("click", (ev) => this._onClicarFrasco(ev));
    html.find(".imintoyou-btn-dica").on("click", () => this._onPedirDica());

    this.iniciarTimer(() => {
      const pontuacaoEfetiva = Math.max(this.pontuacao - this.erros, 0);
      this.finalizarProva(pontuacaoEfetiva, this._pontuacaoMaxima(), `${this.receitasCompletas} receita(s) completa(s), ${this.erros} erro(s)`);
    });
  }

  _onPedirDica() {
    if (this.dicasRestantes <= 0) return;
    this.dicasRestantes -= 1;
    this.dicaAtiva = this.receita[this.progresso.length] ?? null;
    this.render();
  }

  _onClicarFrasco(ev) {
    const id = ev.currentTarget.dataset.id;
    const esperado = this.receita[this.progresso.length];

    if (id === esperado) {
      this.progresso.push(id);
      this.dicaAtiva = null;
      const elBequer = this.element?.[0]?.querySelector(".imintoyou-bequer");
      elBequer?.classList.add("imintoyou-reacao-boa");
      setTimeout(() => elBequer?.classList.remove("imintoyou-reacao-boa"), 400);

      if (this.progresso.length === this.receita.length) {
        this.pontuacao += this.receita.length;
        this.receitasCompletas += 1;
        this.passosAtuais = Math.min(this.passosAtuais + 1, 6);
        this.receita = gerarReceitaQuimica(this.passosAtuais);
        this.progresso = [];
      }
    } else {
      this.erros += 1;
      this.progresso = [];
      const elBequer = this.element?.[0]?.querySelector(".imintoyou-bequer");
      elBequer?.classList.add("imintoyou-reacao-ruim");
      setTimeout(() => elBequer?.classList.remove("imintoyou-reacao-ruim"), 500);
    }
    this.render();
  }

  // Pontuação máxima de referência fixa (ajustável depois de testar em
  // mesa). Erros penalizam descontando da pontuação bruta (ver acima), não
  // do máximo — assim errar sempre piora a nota, nunca melhora.
  _pontuacaoMaxima() {
    return 18;
  }
}
