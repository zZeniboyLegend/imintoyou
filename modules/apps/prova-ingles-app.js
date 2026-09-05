import { ProvaAppBase } from "./prova-base.js";
import { cargasVantagem } from "../data/aulas.js";
import { PALAVRAS_PT } from "../data/palavras-pt.js";
import { PALAVRAS_EN } from "../data/palavras-en.js";

const TAMANHO_GRADE = 5;
const SEGUNDOS_POR_CARGA = 8;

// Distribuição de letras aproximada (frequência) — repete letras comuns
// mais vezes na "sacola" de sorteio pra não sair grade cheia de Q/K/W.
const SACOLA_PT = "AAAAAAAAAAAEEEEEEEEEEIIIIIIOOOOOOOOOUUUUUCCCDDDDFGGHHLLLLMMMMNNNNPPPPRRRRRRSSSSSSSSTTTTTTVVXZ".split("");
const SACOLA_EN = "AAAAAAAAABCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIILLLLMMNNNNNNOOOOOOOPPRRRRRRSSSSTTTTTTUUUVWWXYYZ".split("");

function sortearGrade(sacola) {
  const grade = [];
  for (let i = 0; i < TAMANHO_GRADE * TAMANHO_GRADE; i++) {
    grade.push(sacola[Math.floor(Math.random() * sacola.length)]);
  }
  return grade;
}

function saoAdjacentes(i1, i2) {
  const l1 = Math.floor(i1 / TAMANHO_GRADE), c1 = i1 % TAMANHO_GRADE;
  const l2 = Math.floor(i2 / TAMANHO_GRADE), c2 = i2 % TAMANHO_GRADE;
  return Math.abs(l1 - l2) <= 1 && Math.abs(c1 - c2) <= 1 && i1 !== i2;
}

export class ProvaInglesApp extends ProvaAppBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-prova-ingles",
      classes: ["imintoyou", "imintoyou-prova"],
      template: "systems/imintoyou/templates/apps/prova-ingles.hbs",
      title: "Prova de Inglês — I'm Into You",
      width: 480,
      height: "auto",
      resizable: false
    });
  }

  constructor(options = {}) {
    super({ ...options, materia: "ingles" });
    this.dicionario = this.idioma === "en" ? PALAVRAS_EN : PALAVRAS_PT;
    this.grade = sortearGrade(this.idioma === "en" ? SACOLA_EN : SACOLA_PT);
    this.selecionadas = [];
    this.palavrasValidadas = [];
    this.pontuacao = 0;

    const cargas = cargasVantagem(this.actor, "sagacidade", "conhecimento");
    this.duracaoSegundos += cargas * SEGUNDOS_POR_CARGA;
    this.tempoRestante = this.duracaoSegundos;
  }

  /** @override */
  async getData(options) {
    return {
      grade: this.grade,
      selecionadas: this.selecionadas,
      palavraAtual: this.selecionadas.map((i) => this.grade[i]).join(""),
      palavrasValidadas: this.palavrasValidadas,
      pontuacao: this.pontuacao,
      tempoRestante: this.tempoRestante,
      idioma: this.idioma === "en" ? "Inglês" : "Português"
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-letra").on("click", (ev) => this._onClicarLetra(ev));
    html.find(".imintoyou-btn-confirmar").on("click", () => this._onConfirmar());
    html.find(".imintoyou-btn-limpar").on("click", () => this._onLimpar());

    this.iniciarTimer(() => this.finalizarProva(this.pontuacao, this._pontuacaoMaxima(), `${this.palavrasValidadas.length} palavra(s) formada(s)`));
  }

  _onClicarLetra(ev) {
    const idx = Number(ev.currentTarget.dataset.idx);
    if (this.selecionadas.includes(idx)) {
      // clicar na última letra selecionada desfaz o passo
      if (this.selecionadas[this.selecionadas.length - 1] === idx) this.selecionadas.pop();
      this.render();
      return;
    }
    const ultima = this.selecionadas[this.selecionadas.length - 1];
    if (this.selecionadas.length === 0 || saoAdjacentes(ultima, idx)) {
      this.selecionadas.push(idx);
      this.render();
    }
  }

  _onLimpar() {
    this.selecionadas = [];
    this.render();
  }

  _onConfirmar() {
    const palavra = this.selecionadas.map((i) => this.grade[i]).join("");
    if (palavra.length >= 3 && this.dicionario.includes(palavra) && !this.palavrasValidadas.includes(palavra)) {
      this.palavrasValidadas.push(palavra);
      this.pontuacao += Math.max(palavra.length - 2, 1);
      ui.notifications.info(`Palavra válida: ${palavra} (+${Math.max(palavra.length - 2, 1)})`);
    } else {
      ui.notifications.warn("Palavra inválida ou já usada.");
    }
    this.selecionadas = [];
    this.render();
  }

  // Referência fixa pra converter pontuação em nota (ajustável depois de
  // testar em mesa de verdade).
  _pontuacaoMaxima() {
    return 12;
  }
}
