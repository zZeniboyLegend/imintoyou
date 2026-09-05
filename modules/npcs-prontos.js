import { PERSONAGENS_PRONTOS, PROFESSORES_PRONTOS } from "./data/npcs-prontos.js";
import { importarTribos } from "./tribos.js";

const ORDEM_CARACTERISTICAS = ["presenca", "sagacidade", "estilo", "vigor", "atletismo", "empatia"];

function characteristicsParaSistema(caracteristicas) {
  return Object.fromEntries(ORDEM_CARACTERISTICAS.map((c) => [c, { value: caracteristicas[c] ?? 0 }]));
}

async function garantirPasta(nome, tipo, pastaPaiId = null) {
  let pasta = game.folders.find((f) => f.type === tipo && f.name === nome && (f.folder?.id ?? null) === pastaPaiId);
  if (!pasta) {
    pasta = await Folder.create({ name: nome, type: tipo, folder: pastaPaiId, color: "#3b5a78" });
  }
  return pasta;
}

/**
 * Importa os 22 NPCs Prontos (17 Personagens com Tribo + 5 Professores) como
 * Atores do mundo. Não recria quem já existe (verifica por nome). Garante
 * que as Tribos Sociais já estejam importadas antes, já que os Personagens
 * dependem delas.
 */
export async function importarNpcsProntos() {
  await importarTribos({ silencioso: true });

  const tribosDisponiveis = game.items.filter((i) => i.type === "tribo");
  if (!tribosDisponiveis.length) {
    ui.notifications.error("Não foi possível importar as Tribos Sociais — importe manualmente na aba Items antes de tentar de novo.");
    return;
  }

  const pastaPrincipal = await garantirPasta("I'm Into You", "Actor");
  const pastaAlunos = await garantirPasta("NPCs Prontos — Alunos", "Actor", pastaPrincipal.id);
  const pastaProfessores = await garantirPasta("NPCs Prontos — Professores", "Actor", pastaPrincipal.id);

  const nomesExistentes = game.actors.map((a) => a.name);
  let criados = 0;

  for (const p of PERSONAGENS_PRONTOS) {
    if (nomesExistentes.includes(p.name)) continue;

    const actor = await Actor.create({
      name: p.name,
      type: "personagem",
      img: p.img,
      folder: pastaAlunos.id,
      system: {
        characteristics: characteristicsParaSistema(p.characteristics),
        talents: p.talents,
        background: p.background
      }
    });

    const triboItem = tribosDisponiveis.find((t) => t.name === p.triboName);
    if (triboItem) {
      const triboData = triboItem.toObject();
      delete triboData._id;
      await actor.createEmbeddedDocuments("Item", [triboData]);
    }

    const itemsExtras = (p.vinculos ?? []).map((v) => ({
      name: v.alvo ? `Vínculo com ${v.alvo}` : "Vínculo Inicial",
      type: "vinculo",
      system: { alvo: v.alvo, descricao: v.descricao, tipo: v.tipo, escalaAfeto: 0 }
    }));
    if (p.segredo) {
      itemsExtras.push({ name: "Segredo Confidencial", type: "segredo", system: { texto: p.segredo, revelado: false } });
    }
    if (itemsExtras.length) await actor.createEmbeddedDocuments("Item", itemsExtras);

    criados++;
  }

  for (const p of PROFESSORES_PRONTOS) {
    if (nomesExistentes.includes(p.name)) continue;

    await Actor.create({
      name: p.name,
      type: "npc",
      img: p.img,
      folder: pastaProfessores.id,
      system: {
        characteristics: characteristicsParaSistema(p.characteristics),
        talents: p.talents,
        status: p.status,
        papel: p.papel
      }
    });

    criados++;
  }

  if (!criados) {
    ui.notifications.info("Os 22 NPCs Prontos já estão importados neste mundo.");
    return;
  }
  ui.notifications.info(`${criados} NPC(s) Pronto(s) importado(s) com sucesso.`);
}
