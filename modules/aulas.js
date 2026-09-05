import { ProvaInglesApp } from "./apps/prova-ingles-app.js";
import { ProvaQuimicaApp } from "./apps/prova-quimica-app.js";
import { ProvaMatematicaApp } from "./apps/prova-matematica-app.js";
import { ProvaEdFisicaApp } from "./apps/prova-edfisica-app.js";

const SOCKET_NAME = "system.imintoyou";

const APPS_POR_MATERIA = {
  ingles: ProvaInglesApp,
  quimica: ProvaQuimicaApp,
  matematica: ProvaMatematicaApp,
  edfisica: ProvaEdFisicaApp
};

/**
 * Registra o listener de socket que abre a prova automaticamente na tela de
 * cada jogador com um personagem atribuído, assim que o Mestre disparar.
 * Chamado uma vez no hook "ready" (ver imintoyou.js).
 */
export function registrarSocketAulas() {
  console.log("I'm Into You | Socket de Provas de Aula registrado neste cliente.");
  game.socket.on(SOCKET_NAME, (payload) => {
    console.log("I'm Into You | Evento de socket recebido:", payload);
    if (payload?.action !== "iniciarProva") return;
    if (game.user.isGM) {
      console.log("I'm Into You | Ignorado (este cliente é o Mestre).");
      return;
    }
    abrirProvaLocal(payload);
  });
}

/** Chamado pelo Mestre (AulasApp) para disparar a prova em todos os clientes. */
export function dispararProva({ materia, idioma, duracaoSegundos, provaNumero }) {
  if (!game.user.isGM) {
    ui.notifications.warn("Só o Mestre pode iniciar uma Prova de Aula.");
    return;
  }
  game.socket.emit(SOCKET_NAME, { action: "iniciarProva", materia, idioma, duracaoSegundos, provaNumero });
  ui.notifications.info("Prova disparada para todos os jogadores conectados.");
}

function abrirProvaLocal({ materia, idioma, duracaoSegundos, provaNumero }) {
  const actor = game.user.character;
  console.log("I'm Into You | Personagem deste usuário:", actor?.name ?? "(nenhum)");
  if (!actor) {
    console.warn("I'm Into You | Este usuário não tem personagem atribuído (Configure User > Character). A prova não vai abrir.");
    return;
  }

  const AppClass = APPS_POR_MATERIA[materia];
  if (!AppClass) {
    console.warn("I'm Into You | Matéria desconhecida recebida no socket:", materia);
    return;
  }

  try {
    new AppClass({ actorId: actor.id, duracaoSegundos, idioma, provaNumero }).render(true);
    console.log("I'm Into You | Prova aberta com sucesso para", actor.name);
  } catch (erro) {
    console.error("I'm Into You | Erro ao abrir a prova:", erro);
  }
}
