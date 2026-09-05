export const NOME_JOURNAL_LIVRO = "Livro da Amizade — I'm Into You";

/**
 * Cria o Journal Entry que serve de álbum de recordações. Ownership default
 * = OWNER pra todos os jogadores, assim qualquer um pode adicionar
 * polaroides (imagem + legenda) sem depender do Mestre.
 */
export async function importarLivroAmizade() {
  let journal = game.journal.getName(NOME_JOURNAL_LIVRO);
  if (journal) {
    ui.notifications.info("O Livro da Amizade já está importado neste mundo.");
    return journal;
  }

  let pasta = game.folders.find((f) => f.type === "JournalEntry" && f.name === "I'm Into You" && !f.folder);
  if (!pasta) {
    pasta = await Folder.create({ name: "I'm Into You", type: "JournalEntry", color: "#3b5a78" });
  }

  journal = await JournalEntry.create({
    name: NOME_JOURNAL_LIVRO,
    folder: pasta.id,
    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER },
    flags: { imintoyou: { polaroides: [] } }
  });

  ui.notifications.info("Livro da Amizade criado! Todos os jogadores já podem adicionar lembranças.");
  return journal;
}

export function obterJournalLivro() {
  return game.journal.getName(NOME_JOURNAL_LIVRO) ?? null;
}
