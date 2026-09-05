import { ProvaAppBase } from "./prova-base.js";
import { cargasVantagem } from "../data/aulas.js";
import { ESTACOES_EDFISICA, LARGURA_EXTRA_POR_CARGA } from "../data/edfisica.js";

export class ProvaEdFisicaApp extends ProvaAppBase {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-prova-edfisica",
      classes: ["imintoyou", "imintoyou-prova"],
      template: "systems/imintoyou/templates/apps/prova-edfisica.hbs",
      title: "Prova de Educação Física — I'm Into You",
      width: 480,
      height: "auto",
      resizable: false
    });
  }

  constructor(options = {}) {
    super({ ...options, materia: "edfisica", duracaoSegundos: null });
    this.cargas = cargasVantagem(this.actor, "atletismo", "esportes");
    this.estacaoAtual = 0;
    this.pontuacao = 0;
    this.resultados = [];
    this._rodando = false;
    this._marcadorPos = 0;
    this._direcao = 1;
    this._rafId = null;
  }

  get estacaoConfig() {
    const base = ESTACOES_EDFISICA[this.estacaoAtual];
    if (!base) return null;
    const extra = this.cargas * LARGURA_EXTRA_POR_CARGA;
    return {
      ...base,
      zonaPerfeita: [Math.max(base.zonaPerfeita[0] - extra, 0), Math.min(base.zonaPerfeita[1] + extra, 100)]
    };
  }

  /** @override */
  async getData(options) {
    return {
      estacao: this.estacaoConfig,
      estacaoNumero: this.estacaoAtual + 1,
      totalEstacoes: ESTACOES_EDFISICA.length,
      pontuacao: this.pontuacao,
      resultados: this.resultados
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-btn-marcar").on("click", () => this._onMarcar());
    this._iniciarEstacao();
  }

  _iniciarEstacao() {
    const cfg = this.estacaoConfig;
    if (!cfg) return;
    this._marcadorPos = 0;
    this._direcao = 1;
    this._rodando = true;
    const inicio = performance.now();
    const passo = (agora) => {
      if (!this._rodando) return;
      const t = ((agora - inicio) % cfg.velocidade) / cfg.velocidade;
      // vai e volta (0 -> 100 -> 0) suavemente
      this._marcadorPos = t < 0.5 ? t * 200 : (1 - t) * 200;
      const el = this.element?.[0]?.querySelector(".imintoyou-marcador");
      if (el) el.style.left = `${this._marcadorPos}%`;
      this._rafId = requestAnimationFrame(passo);
    };
    this._rafId = requestAnimationFrame(passo);
  }

  _pararEstacao() {
    this._rodando = false;
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  _onMarcar() {
    if (!this._rodando) return;
    this._pararEstacao();
    const cfg = this.estacaoConfig;
    const pos = this._marcadorPos;
    let resultado = "errou";
    let pontos = 0;
    if (pos >= cfg.zonaPerfeita[0] && pos <= cfg.zonaPerfeita[1]) {
      resultado = "perfeito";
      pontos = 3;
    } else if (pos >= cfg.zonaOk[0] && pos <= cfg.zonaOk[1]) {
      resultado = "ok";
      pontos = 1;
    }
    this.pontuacao += pontos;
    this.resultados.push({ estacao: cfg.nome, resultado, pontos });

    this.estacaoAtual += 1;
    if (this.estacaoAtual >= ESTACOES_EDFISICA.length) {
      this.finalizarProva(this.pontuacao, this._pontuacaoMaxima(), this.resultados.map((r) => r.resultado).join(", "));
    } else {
      this.render();
      // pequena espera antes de iniciar a próxima estação, pra dar tempo
      // do jogador ler o feedback visual
      setTimeout(() => this._iniciarEstacao(), 600);
    }
  }

  /** @override */
  async close(options) {
    this._pararEstacao();
    return super.close(options);
  }

  _pontuacaoMaxima() {
    return ESTACOES_EDFISICA.length * 3;
  }
}
