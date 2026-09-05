import { CENARIOS } from "./data/cenarios.js";

const NOME_JOURNAL = "Locais Ícone dos Anos 2000 — I'm Into You";

function paginaHtml(cenario) {
  return `
    <div class="imintoyou-cenario">
      <p class="imintoyou-cenario-descricao">${cenario.descricao}</p>
      <h3>🎵 Tom de Cena Sugerido</h3>
      <p>${cenario.tom}</p>
      <h3>🎯 Ganchos de Cena</h3>
      <ul>
        ${cenario.ganchos.map((g) => `<li>${g}</li>`).join("\n        ")}
      </ul>
    </div>`;
}

/**
 * Cria um único Journal Entry com 20 páginas — uma por Local Ícone dos Anos
 * 2000 (Cap. 6.2), cada uma já com Tom de Cena sugerido e Ganchos de Cena
 * prontos. Não recria se o Journal já existir no mundo.
 */
export async function importarCenarios() {
  if (game.journal.getName(NOME_JOURNAL)) {
    ui.notifications.info("O Compêndio de Cenários já está importado neste mundo.");
    return;
  }

  let pasta = game.folders.find((f) => f.type === "JournalEntry" && f.name === "I'm Into You" && !f.folder);
  if (!pasta) {
    pasta = await Folder.create({ name: "I'm Into You", type: "JournalEntry", color: "#3b5a78" });
  }

  const pages = CENARIOS.map((cenario, i) => ({
    name: cenario.titulo,
    type: "text",
    sort: (i + 1) * 100,
    text: {
      content: paginaHtml(cenario),
      format: CONST.JOURNAL_ENTRY_PAGE_FORMATS?.HTML ?? 1
    }
  }));

  await JournalEntry.create({
    name: NOME_JOURNAL,
    folder: pasta.id,
    pages
  });

  ui.notifications.info(`Compêndio de Cenários importado com ${pages.length} locais.`);
}
