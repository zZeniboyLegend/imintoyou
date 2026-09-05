/**
 * Minigame de Armário com Cadeado — puzzle de combinação de 3 dígitos
 * (0-9 cada) pra revelar um item/bilhete secreto. Diferente das Provas de
 * Aula, aqui o conteúdo é pra ser encontrado pelo próprio jogador (não é
 * segredo do Mestre) — então mostra na tela assim que acertar.
 */
export class ArmarioApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-armario",
      classes: ["imintoyou", "imintoyou-armario"],
      template: "systems/imintoyou/templates/apps/armario.hbs",
      title: "Armário Trancado — I'm Into You",
      width: 380,
      height: "auto",
      resizable: false
    });
  }

  constructor(options = {}) {
    super(options);
    this.combinacao = options.combinacao ?? this._gerarCombinacaoAleatoria();
    this.conteudo = options.conteudo ?? "Um bilhete dobrado, sem assinatura.";
    this.dicionario = [0, 0, 0];
    this.aberto = false;
    this.tentativas = 0;
  }

  _gerarCombinacaoAleatoria() {
    return [0, 1, 2].map(() => Math.floor(Math.random() * 10));
  }

  /** @override */
  async getData(options) {
    return {
      dials: this.dicionario,
      aberto: this.aberto,
      conteudo: this.conteudo,
      tentativas: this.tentativas
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-dial-mais").on("click", (ev) => this._ajustarDial(ev, 1));
    html.find(".imintoyou-dial-menos").on("click", (ev) => this._ajustarDial(ev, -1));
    html.find(".imintoyou-btn-testar").on("click", () => this._testarCombinacao());
  }

  _ajustarDial(ev, delta) {
    const idx = Number(ev.currentTarget.dataset.idx);
    this.dicionario[idx] = (this.dicionario[idx] + delta + 10) % 10;
    this.render();
  }

  _testarCombinacao() {
    this.tentativas += 1;
    const acertou = this.dicionario.every((v, i) => v === this.combinacao[i]);
    if (acertou) {
      this.aberto = true;
      ui.notifications.info("Click! O armário abriu.");
    } else {
      ui.notifications.warn("A combinação está errada — o cadeado não abre.");
    }
    this.render();
  }
}
