export const NOME_JOURNAL_MURAL = "Mural de Fofocas — I'm Into You";

/**
 * Cria o Journal Entry que serve de "banco de dados" do Mural de Fofocas.
 * Ownership default = OWNER pra todos os jogadores, assim qualquer um pode
 * adicionar/editar/mover post-its sem depender do Mestre. Só o Mestre roda
 * essa importação (uma vez só, por mundo).
 */
export async function importarMuralFofocas() {
  let journal = game.journal.getName(NOME_JOURNAL_MURAL);
  if (journal) {
    ui.notifications.info("O Mural de Fofocas já está importado neste mundo.");
    return journal;
  }

  let pasta = game.folders.find((f) => f.type === "JournalEntry" && f.name === "I'm Into You" && !f.folder);
  if (!pasta) {
    pasta = await Folder.create({ name: "I'm Into You", type: "JournalEntry", color: "#3b5a78" });
  }

  journal = await JournalEntry.create({
    name: NOME_JOURNAL_MURAL,
    folder: pasta.id,
    ownership: { default: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER },
    flags: { imintoyou: { notas: [] } }
  });

  ui.notifications.info("Mural de Fofocas criado! Todos os jogadores já podem usar.");
  return journal;
}

export function obterJournalMural() {
  return game.journal.getName(NOME_JOURNAL_MURAL) ?? null;
}
