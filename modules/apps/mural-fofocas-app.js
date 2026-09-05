import { obterJournalMural } from "../mural-fofocas.js";

const CORES_POSTIT = ["#fbe28f", "#f7c1cf", "#c7e8c5", "#bcd8f0", "#e6c8f2"];

/** Mural de post-its livre — qualquer jogador pode adicionar/editar/mover/apagar. */
export class MuralFofocasApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-mural-fofocas",
      classes: ["imintoyou", "imintoyou-mural"],
      template: "systems/imintoyou/templates/apps/mural-fofocas.hbs",
      title: "Mural de Fofocas — I'm Into You",
      width: 700,
      height: 520,
      resizable: true
    });
  }

  constructor(options = {}) {
    super(options);
    this.journal = obterJournalMural();
    this._onUpdateJournal = (doc) => {
      if (doc.id === this.journal?.id) this.render(false);
    };
    this._dragGlobalBound = false;
    this._onDragMove = this._onDragMove.bind(this);
    this._onDragEnd = this._onDragEnd.bind(this);
  }

  /** @override */
  async _render(force, options) {
    await super._render(force, options);
    Hooks.on("updateJournalEntry", this._onUpdateJournal);
  }

  /** @override */
  async close(options) {
    Hooks.off("updateJournalEntry", this._onUpdateJournal);
    if (this._dragGlobalBound) {
      window.removeEventListener("mousemove", this._onDragMove);
      window.removeEventListener("mouseup", this._onDragEnd);
      this._dragGlobalBound = false;
    }
    return super.close(options);
  }

  get notas() {
    return this.journal?.getFlag("imintoyou", "notas") ?? [];
  }

  async _salvarNotas(notas) {
    if (!this.journal) return;
    await this.journal.setFlag("imintoyou", "notas", notas);
  }

  /** @override */
  async getData(options) {
    return { semMural: !this.journal, notas: this.notas };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.journal) return;

    html.find(".imintoyou-btn-add-postit").on("click", () => this._adicionarPostit());
    html.find(".imintoyou-postit-texto").on("blur", (ev) => this._salvarTexto(ev));
    html.find(".imintoyou-postit-apagar").on("click", (ev) => this._apagarPostit(ev));
    html.find(".imintoyou-postit-cor").on("click", (ev) => this._trocarCor(ev));

    html.find(".imintoyou-postit").each((_, el) => this._bindArrastar(el));

    if (!this._dragGlobalBound) {
      this._dragGlobalBound = true;
      window.addEventListener("mousemove", this._onDragMove);
      window.addEventListener("mouseup", this._onDragEnd);
    }
  }

  _bindArrastar(el) {
    const cabecalho = el.querySelector(".imintoyou-postit-arrastar");
    if (!cabecalho) return;
    cabecalho.addEventListener("mousedown", (ev) => {
      this._dragEl = el;
      const rect = el.getBoundingClientRect();
      this._dragOffsetX = ev.clientX - rect.left;
      this._dragOffsetY = ev.clientY - rect.top;
      ev.preventDefault();
    });
  }

  _onDragMove(ev) {
    if (!this._dragEl) return;
    const quadro = this.element?.[0]?.querySelector(".imintoyou-mural-quadro");
    if (!quadro) return;
    const rectQuadro = quadro.getBoundingClientRect();
    let x = ((ev.clientX - this._dragOffsetX - rectQuadro.left) / rectQuadro.width) * 100;
    let y = ((ev.clientY - this._dragOffsetY - rectQuadro.top) / rectQuadro.height) * 100;
    x = Math.max(0, Math.min(90, x));
    y = Math.max(0, Math.min(90, y));
    this._dragEl.style.left = `${x}%`;
    this._dragEl.style.top = `${y}%`;
  }

  async _onDragEnd() {
    if (!this._dragEl) return;
    const el = this._dragEl;
    this._dragEl = null;
    const id = el.dataset.id;
    const x = parseFloat(el.style.left);
    const y = parseFloat(el.style.top);
    const notas = this.notas.map((n) => (n.id === id ? { ...n, x, y } : n));
    await this._salvarNotas(notas);
  }

  async _adicionarPostit() {
    const notas = [...this.notas];
    notas.push({
      id: foundry.utils.randomID(),
      x: 10 + Math.random() * 60,
      y: 10 + Math.random() * 55,
      texto: "clique para editar...",
      cor: CORES_POSTIT[Math.floor(Math.random() * CORES_POSTIT.length)],
      autor: game.user.name
    });
    await this._salvarNotas(notas);
  }

  async _salvarTexto(ev) {
    const id = ev.currentTarget.closest(".imintoyou-postit").dataset.id;
    const texto = ev.currentTarget.value;
    const notas = this.notas.map((n) => (n.id === id ? { ...n, texto } : n));
    await this._salvarNotas(notas);
  }

  async _apagarPostit(ev) {
    const id = ev.currentTarget.closest(".imintoyou-postit").dataset.id;
    const notas = this.notas.filter((n) => n.id !== id);
    await this._salvarNotas(notas);
  }

  async _trocarCor(ev) {
    const id = ev.currentTarget.closest(".imintoyou-postit").dataset.id;
    const nota = this.notas.find((n) => n.id === id);
    if (!nota) return;
    const idxAtual = CORES_POSTIT.indexOf(nota.cor);
    const proximaCor = CORES_POSTIT[(idxAtual + 1) % CORES_POSTIT.length];
    const notas = this.notas.map((n) => (n.id === id ? { ...n, cor: proximaCor } : n));
    await this._salvarNotas(notas);
  }
}
