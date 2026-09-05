import { TABELAS_PADRAO } from "./data/tabelas-geradoras.js";

const ICONE_NPC = "icons/svg/mystery-man.svg";
const ICONE_LOCAL = "icons/svg/village.svg";
const ICONE_BOATO = "icons/svg/aura.svg";
const ICONE_FESTA = "icons/svg/tankard.svg";
const ICONE_PADRAO = "icons/svg/dice-target.svg";

function iconePara(tabela) {
  if (tabela.grupo === "npc") return ICONE_NPC;
  if (tabela.name.startsWith("6.2")) return ICONE_LOCAL;
  if (tabela.name.startsWith("6.3")) return ICONE_BOATO;
  if (tabela.name.startsWith("6.4")) return ICONE_FESTA;
  return ICONE_PADRAO;
}

const NOMES_SUBTABELAS_NPC = [
  "6.1 — Nome e Sobrenome",
  "6.1 — Tribo Social",
  "6.1 — Segredo do NPC",
  "6.1 — Cacoete e Vício Visual",
  "6.1 — Motivação Imediata na Cena"
];

/**
 * Cria as 8 Tabelas Geradoras do Capítulo 6 como RollTable nativas do
 * Foundry, organizadas em pastas ("I'm Into You" > "Gerador de NPCs de
 * Corredor" para as 5 sub-tabelas do NPC, e direto na pasta principal para
 * Locais/Boatos/Festas). Não recria tabelas cujo nome já existe no mundo.
 */
export async function importarTabelasGeradoras() {
  let folderPrincipal = game.folders.find((f) => f.type === "RollTable" && f.name === "I'm Into You" && !f.folder);
  if (!folderPrincipal) {
    folderPrincipal = await Folder.create({ name: "I'm Into You", type: "RollTable", color: "#e85d9c" });
  }

  let folderNpc = game.folders.find(
    (f) => f.type === "RollTable" && f.name === "Gerador de NPCs de Corredor" && f.folder?.id === folderPrincipal.id
  );
  if (!folderNpc) {
    folderNpc = await Folder.create({
      name: "Gerador de NPCs de Corredor",
      type: "RollTable",
      folder: folderPrincipal.id,
      color: "#e85d9c"
    });
  }

  const existentes = game.tables.map((t) => t.name);
  const aCriar = [];

  for (const tabela of TABELAS_PADRAO) {
    if (existentes.includes(tabela.name)) continue;
    aCriar.push({
      name: tabela.name,
      folder: tabela.grupo === "npc" ? folderNpc.id : folderPrincipal.id,
      formula: tabela.formula,
      img: iconePara(tabela),
      replacement: true,
      displayRoll: true,
      results: tabela.resultados.map(([min, max, text]) => ({
        type: CONST.TABLE_RESULT_TYPES?.TEXT ?? "text",
        text,
        range: [min, max],
        weight: 1
      }))
    });
  }

  if (!aCriar.length) {
    ui.notifications.info("As Tabelas Geradoras já estão importadas neste mundo.");
    return;
  }

  await RollTable.create(aCriar);
  ui.notifications.info(`${aCriar.length} Tabela(s) Geradora(s) importada(s) com sucesso.`);
}

/**
 * Rola as 5 sub-tabelas do Gerador de NPCs de Corredor de uma vez e posta
 * um único card no chat com o NPC pronto (Cap. 6.1 do livro).
 */
export async function gerarNpcCompleto() {
  const tabelas = NOMES_SUBTABELAS_NPC.map((nome) => game.tables.getName(nome));

  if (tabelas.some((t) => !t)) {
    ui.notifications.warn("Importe as Tabelas Geradoras primeiro (botão \"Importar Tabelas Geradoras\").");
    return;
  }

  const resultados = [];
  for (const tabela of tabelas) {
    const draw = await tabela.draw({ displayChat: false });
    resultados.push(draw.results[0]?.text ?? draw.results[0]?.getChatText?.() ?? "—");
  }

  const [nome, tribo, segredo, cacoete, motivacao] = resultados;

  const content = `
    <div class="imintoyou-npc-gerado">
      <h3>🧑 NPC de Corredor Gerado</h3>
      <p class="npc-nome">${nome}</p>
      <p><strong>Tribo Social:</strong> ${tribo}</p>
      <p><strong>Segredo:</strong> ${segredo}</p>
      <p><strong>Cacoete:</strong> ${cacoete}</p>
      <p><strong>Motivação na Cena:</strong> ${motivacao}</p>
    </div>`;

  await ChatMessage.create({ content, speaker: { alias: "I'm Into You — Gerador de NPC" } });
}
