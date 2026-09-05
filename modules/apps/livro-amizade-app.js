import { obterJournalLivro } from "../livro-amizade.js";

/** Álbum de polaroides livre — qualquer jogador pode adicionar/apagar lembranças. */
export class LivroAmizadeApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-livro-amizade",
      classes: ["imintoyou", "imintoyou-livro"],
      template: "systems/imintoyou/templates/apps/livro-amizade.hbs",
      title: "Livro da Amizade — I'm Into You",
      width: 720,
      height: 560,
      resizable: true
    });
  }

  constructor(options = {}) {
    super(options);
    this.journal = obterJournalLivro();
    this._onUpdateJournal = (doc) => {
      if (doc.id === this.journal?.id) this.render(false);
    };
  }

  /** @override */
  async _render(force, options) {
    await super._render(force, options);
    Hooks.on("updateJournalEntry", this._onUpdateJournal);
  }

  /** @override */
  async close(options) {
    Hooks.off("updateJournalEntry", this._onUpdateJournal);
    return super.close(options);
  }

  get polaroides() {
    return this.journal?.getFlag("imintoyou", "polaroides") ?? [];
  }

  async _salvar(polaroides) {
    if (!this.journal) return;
    await this.journal.setFlag("imintoyou", "polaroides", polaroides);
  }

  /** @override */
  async getData(options) {
    return { semLivro: !this.journal, polaroides: [...this.polaroides].reverse() };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.journal) return;

    html.find(".imintoyou-btn-add-polaroid").on("click", () => this._adicionarPolaroid(html));
    html.find(".imintoyou-polaroid-apagar").on("click", (ev) => this._apagarPolaroid(ev));
  }

  async _adicionarPolaroid(html) {
    const fp = new FilePicker({
      type: "image",
      callback: async (path) => {
        const legenda = html[0].querySelector(".imintoyou-nova-legenda")?.value ?? "";
        const polaroides = [...this.polaroides];
        polaroides.push({
          id: foundry.utils.randomID(),
          imagem: path,
          legenda,
          autor: game.user.name,
          data: new Date().toLocaleDateString("pt-BR")
        });
        await this._salvar(polaroides);
        const campoLegenda = html[0].querySelector(".imintoyou-nova-legenda");
        if (campoLegenda) campoLegenda.value = "";
      }
    });
    fp.render(true);
  }

  async _apagarPolaroid(ev) {
    const id = ev.currentTarget.closest(".imintoyou-polaroid-card").dataset.id;
    const polaroides = this.polaroides.filter((p) => p.id !== id);
    await this._salvar(polaroides);
  }
}
