import { LABEL_MATERIA, SOM_INICIO_PROVA, SOM_FIM_PROVA, calcularNota, TEXTOS_SABOR, TEXTO_NAO_FEZ } from "../data/aulas.js";

/**
 * Classe base das Provas de Aula (Inglês, Química, Matemática, Educação
 * Física). Cuida da parte comum: timer, som de início/fim, cálculo de nota
 * e o chat sussurrado pro Mestre — cada subclasse só implementa a lógica
 * do próprio minigame e chama `this.finalizarProva(pontuacao, maximo, detalhe)`
 * quando a prova acabar (por tempo, por vidas ou por completar tudo).
 *
 * Se a janela for fechada sem a prova ter sido finalizada, o Mestre recebe
 * um sussurro avisando que o personagem "não fez a prova" — sem nenhuma
 * outra informação, mantendo a tensão pedida (o jogador nunca vê a nota).
 */
export class ProvaAppBase extends Application {
  constructor(options = {}) {
    super(options);
    this.actorId = options.actorId ?? null;
    this.materia = options.materia;
    this.duracaoSegundos = options.duracaoSegundos ?? null;
    this.idioma = options.idioma ?? null;
    this.provaNumero = options.provaNumero ?? null;
    this.tempoRestante = this.duracaoSegundos;
    this._intervalId = null;
    this.finalizada = false;
  }

  get actor() {
    return this.actorId ? game.actors.get(this.actorId) : null;
  }

  /** Toca um som local (só no cliente que chama, não sincroniza rede). */
  tocarSom(src) {
    try {
      const Helper = foundry.audio?.AudioHelper ?? AudioHelper;
      Helper.play({ src, volume: 0.7, autoplay: true, loop: false }, false);
    } catch (e) {
      console.warn("I'm Into You | Não foi possível tocar o som da prova:", e);
    }
  }

  /** @override */
  async _render(force, options) {
    await super._render(force, options);
    if (!this._somInicioTocado) {
      this._somInicioTocado = true;
      this.tocarSom(SOM_INICIO_PROVA);
    }
  }

  /** Inicia a contagem regressiva; chama `aoAcabarOTempo()` quando chegar a 0. */
  iniciarTimer(aoAcabarOTempo) {
    if (!this.duracaoSegundos) return;
    this._intervalId = setInterval(() => {
      this.tempoRestante -= 1;
      const elTimer = this.element?.[0]?.querySelector(".imintoyou-prova-timer");
      if (elTimer) elTimer.textContent = `${Math.max(this.tempoRestante, 0)}s`;
      if (this.tempoRestante <= 0) {
        this.pararTimer();
        aoAcabarOTempo();
      }
    }, 1000);
  }

  pararTimer() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
  }

  /**
   * Encerra a prova, calcula a nota e envia o sussurro pro Mestre.
   * `detalheExtra` é um texto curto tipo "7 palavras formadas" mostrado
   * junto da nota no chat do Mestre (o jogador nunca vê nada disso).
   */
  async finalizarProva(pontuacao, maximo, detalheExtra = "") {
    if (this.finalizada) return;
    this.finalizada = true;
    this.pararTimer();
    this.tocarSom(SOM_FIM_PROVA);

    const nota = calcularNota(pontuacao, maximo);
    const variacoes = TEXTOS_SABOR[nota] ?? [""];
    const sabor = variacoes[Math.floor(Math.random() * variacoes.length)];
    const label = LABEL_MATERIA[this.materia] ?? this.materia;

    if (this.actor && this.provaNumero) {
      await this.actor.setFlag("imintoyou", `boletim.${this.materia}.prova${this.provaNumero}`, nota);
    }

    await ChatMessage.create({
      whisper: ChatMessage.getWhisperRecipients("GM"),
      speaker: { alias: "Provas de Aula" },
      content: `<div class="imintoyou-prova-resultado">
        <p><strong>${this.actor?.name ?? "?"}</strong> — Prova de ${label}${this.provaNumero ? ` (${this.provaNumero}/6)` : ""}: <strong>Nota ${nota}</strong> ${detalheExtra ? `<span class="hint">(${detalheExtra})</span>` : ""}</p>
        <p class="hint">${sabor}</p>
      </div>`
    });

    this._mostrarTelaFinal();
  }

  /** Mostra a tela "Prova entregue!" sem revelar nada pro jogador. */
  _mostrarTelaFinal() {
    const root = this.element?.[0];
    if (!root) return;
    const corpo = root.querySelector(".imintoyou-prova-corpo");
    if (corpo) {
      corpo.innerHTML = `<div class="imintoyou-prova-entregue">
        <i class="fa-solid fa-clipboard-check"></i>
        <p>Prova entregue!</p>
        <p class="hint">O resultado será revelado quando o professor devolver as provas corrigidas.</p>
      </div>`;
    }
    setTimeout(() => this.close(), 2500);
  }

  /** @override */
  async close(options) {
    this.pararTimer();
    if (!this.finalizada) {
      this.finalizada = true; // evita duplo aviso se close() rodar duas vezes
      await ChatMessage.create({
        whisper: ChatMessage.getWhisperRecipients("GM"),
        speaker: { alias: "Provas de Aula" },
        content: `<div class="imintoyou-prova-resultado">
          <p><strong>${this.actor?.name ?? "?"}</strong> — Prova de ${LABEL_MATERIA[this.materia] ?? this.materia}: <strong>Não fez a prova</strong></p>
          <p class="hint">${TEXTO_NAO_FEZ}</p>
        </div>`
      });
    }
    return super.close(options);
  }
}
