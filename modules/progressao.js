import { XP_POR_NIVEL, FASE_POR_NIVEL, BENEFICIOS_NIVEL } from "./data/progressao.js";

/**
 * Tenta subir o personagem para o próximo nível (Capítulo 4.2 do livro).
 * Verifica se há XP suficiente, aplica os ganhos fixos de Vitalidade/Conflito
 * Interno, credita os pontos livres de Talento/Característica, marca
 * Especializações e Habilidades de Tribo disponíveis, e posta um resumo no chat.
 */
export async function subirDeNivel(actor) {
  const sys = actor.system;
  const nivelAtual = sys.nivel?.value ?? 1;

  if (nivelAtual >= 10) {
    ui.notifications.info(`${actor.name} já está no Nível 10 (${FASE_POR_NIVEL[10]}) — o máximo do sistema.`);
    return;
  }

  const proximoNivel = nivelAtual + 1;
  const xpNecessario = XP_POR_NIVEL[proximoNivel];
  const xpAtual = sys.xp?.value ?? 0;

  if (xpAtual < xpNecessario) {
    ui.notifications.warn(
      `${actor.name} precisa de ${xpNecessario} XP para chegar ao Nível ${proximoNivel} (tem ${xpAtual}).`
    );
    return;
  }

  const beneficio = BENEFICIOS_NIVEL[proximoNivel];
  const vigor = sys.characteristics?.vigor?.value ?? 0;
  const vitalidadeGanha = beneficio.vitalidade === "vigor" ? vigor : beneficio.vitalidade;

  const updateData = {
    "system.nivel.value": proximoNivel,
    "system.bonusVitalidadeAcumulado": (sys.bonusVitalidadeAcumulado ?? 0) + vitalidadeGanha,
    "system.bonusConflitoAcumulado": (sys.bonusConflitoAcumulado ?? 0) + beneficio.conflito,
    "system.pontosTalentoLivres": (sys.pontosTalentoLivres ?? 0) + (beneficio.pontosTalento ?? 0),
    "system.pontosCaracteristicaLivres": (sys.pontosCaracteristicaLivres ?? 0) + (beneficio.pontosCaracteristica ?? 0),
    "system.especializacoesDisponiveis": (sys.especializacoesDisponiveis ?? 0) + (beneficio.especializacao ? 1 : 0)
  };
  if (beneficio.dadoHypeD8) updateData["system.dadoHypeD8"] = true;

  await actor.update(updateData);

  await _postarResumoDeNivel(actor, proximoNivel, beneficio, vitalidadeGanha);
}

async function _postarResumoDeNivel(actor, nivel, beneficio, vitalidadeGanha) {
  const ganhos = [];
  ganhos.push(`+${vitalidadeGanha} Vitalidade Máxima, +${beneficio.conflito} Conflito Interno Máximo`);
  if (beneficio.pontosTalento) ganhos.push(`${beneficio.pontosTalento} Ponto(s) de Talento livre(s)`);
  if (beneficio.pontosCaracteristica) ganhos.push(`${beneficio.pontosCaracteristica} Ponto(s) de Característica`);
  if (beneficio.especializacao) ganhos.push("1 Especialização de Talento disponível");

  if (beneficio.habilidadeTribo) {
    const tribo = actor.items.find((i) => i.type === "tribo");
    const hab = tribo?.system?.habilidades?.[beneficio.habilidadeTribo];
    if (hab?.nome) ganhos.push(`Habilidade de Tribo destravada: <strong>${hab.nome}</strong>`);
    else ganhos.push("Nova Habilidade de Tribo destravada (aplique uma Tribo para ver qual)");
  }
  if (beneficio.dadoHypeD8) ganhos.push("O Dado de Hype agora é <strong>1d8</strong> em vez de 1d6");
  if (beneficio.acoesExclusivas) ganhos.push("Acesso liberado à <strong>Ação Exclusiva de Tribo</strong> (Nível 9 da Tribo)");
  if (beneficio.feitoDoAno) ganhos.push("<strong>O Feito do Ano / Legado do Campus</strong> — o ápice da jornada");

  const content = `
    <h3>🎓 ${actor.name} alcançou o Nível ${nivel}!</h3>
    <p><em>${FASE_POR_NIVEL[nivel]}</em></p>
    <ul>${ganhos.map((g) => `<li>${g}</li>`).join("")}</ul>`;

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    content
  });
}
