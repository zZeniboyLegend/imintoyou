import { ArmarioApp } from "./apps/armario-app.js";

const SOCKET_NAME = "system.imintoyou";

/** Registrado uma vez no hook "ready" (ver imintoyou.js). */
export function registrarSocketArmario() {
  game.socket.on(SOCKET_NAME, (payload) => {
    if (payload?.action !== "abrirArmario") return;
    if (game.user.isGM) return;
    const actor = game.user.character;
    if (!actor || actor.id !== payload.actorId) return;
    new ArmarioApp({ combinacao: payload.combinacao, conteudo: payload.conteudo }).render(true);
  });
}

/** Chamado pelo Mestre (ArmarioLauncherApp) para abrir o armário só pro jogador escolhido. */
export function dispararArmario({ actorId, combinacao, conteudo }) {
  if (!game.user.isGM) {
    ui.notifications.warn("Só o Mestre pode abrir um Armário pra um jogador.");
    return;
  }
  if (!actorId) {
    ui.notifications.warn("Escolha um personagem antes de disparar.");
    return;
  }
  game.socket.emit(SOCKET_NAME, { action: "abrirArmario", actorId, combinacao, conteudo });
  ui.notifications.info("Armário disparado para o jogador selecionado.");
}
