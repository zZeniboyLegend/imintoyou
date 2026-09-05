import { TRIBOS_PADRAO } from "./data/tribos.js";

/**
 * Cria as 10 Tribos Sociais do livro como Items do mundo, se ainda não
 * existirem. Retorna a lista de nomes que ficaram faltando (nenhum, se tudo
 * já estava importado) — usado tanto pelo botão do diretório de Items
 * quanto pelo importador de NPCs Prontos, que depende das Tribos já
 * existirem para embutir nos personagens.
 */
export async function importarTribos({ silencioso = false } = {}) {
  const existentes = game.items.filter((i) => i.type === "tribo").map((i) => i.name);
  const aCriar = TRIBOS_PADRAO.filter((t) => !existentes.includes(t.name));

  if (!aCriar.length) {
    if (!silencioso) ui.notifications.info("As 10 Tribos Sociais já estão importadas neste mundo.");
    return;
  }

  await Item.create(aCriar, { renderSheet: false });
  if (!silencioso) ui.notifications.info(`${aCriar.length} Tribo(s) Social(is) importada(s) com sucesso.`);
}
