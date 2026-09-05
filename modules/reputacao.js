/**
 * Uso Estratégico de Reputação (Capítulo 3.6 do livro).
 */

const SUGESTOES_GANCHO = [
  "um dilema de liderança na Tribo Social dele/dela",
  "um convite exclusivo para um evento restrito",
  "uma intriga familiar batendo à porta",
  "um segredo trazido por um grupo de amigos",
  "um evento de grande visibilidade no campus"
];

/**
 * 1. Impulso Social Imediato (Gasto Queimado) — abre um diálogo perguntando
 * quantos pontos de Reputação o jogador quer queimar para somar o mesmo
 * valor como bônus fixo numa rolagem de Presença ou Estilo. Retorna o valor
 * escolhido (0 se cancelado ou sem Reputação disponível).
 */
export async function abrirDialogoImpulsoSocial(actor, charKey, talentKey) {
  const repAtual = actor.system.status?.reputacao?.value ?? 0;
  if (repAtual <= 0) {
    ui.notifications.warn(`${actor.name} não tem pontos de Reputação para queimar.`);
    return 0;
  }

  const rotulo = talentKey ? `${charKey} + ${talentKey}` : charKey;

  return new Promise((resolve) => {
    new Dialog({
      title: "Impulso Social Imediato",
      content: `
        <p>Queime pontos de Reputação para somar o <strong>mesmo valor</strong> como bônus fixo nesta rolagem de <strong>${rotulo}</strong>.</p>
        <p>Reputação atual de ${actor.name}: <strong>${repAtual}</strong></p>
        <div class="form-group">
          <label>Pontos a queimar (0 a ${repAtual})</label>
          <input type="number" id="imintoyou-pontos-impulso" min="0" max="${repAtual}" value="0" style="width:100%" />
        </div>`,
      buttons: {
        confirmar: {
          label: "Rolar com Bônus",
          callback: (html) => {
            const bruto = Number(html.find("#imintoyou-pontos-impulso").val()) || 0;
            resolve(Math.min(repAtual, Math.max(0, bruto)));
          }
        },
        cancelar: {
          label: "Rolar sem Bônus",
          callback: () => resolve(0)
        }
      },
      default: "confirmar",
      close: () => resolve(0)
    }).render(true);
  });
}

/**
 * 2. Chamado do Holofote (Abertura de Arco Secundário) — converte e gasta
 * 5 Pontos de Reputação para exigir do Mestre um Gancho Narrativo de
 * Destaque. Posta um card no chat com uma sugestão sorteada.
 */
export async function chamarDoHolofote(actor) {
  const repAtual = actor.system.status?.reputacao?.value ?? 0;
  if (repAtual < 5) {
    ui.notifications.warn(`${actor.name} precisa de pelo menos 5 pontos de Reputação (tem ${repAtual}).`);
    return;
  }

  await actor.update({ "system.status.reputacao.value": repAtual - 5 });

  const sugestao = SUGESTOES_GANCHO[Math.floor(Math.random() * SUGESTOES_GANCHO.length)];
  const content = `
    <div class="imintoyou-holofote">
      <h3>🎬 Chamado do Holofote</h3>
      <p><strong>${actor.name}</strong> converteu 5 pontos de Reputação para exigir um <strong>Gancho Narrativo de Destaque</strong>.</p>
      <p class="hint">Sugestão de gancho (o Mestre pode usar ou criar outro): ${sugestao}. Completar esse capítulo de desenvolvimento próprio concede uma quantidade significativa de XP.</p>
    </div>`;

  await ChatMessage.create({ speaker: ChatMessage.getSpeaker({ actor }), content });
}

/**
 * 3. Presença Dominante (Bônus Passivo Contínuo) — usado pela janela de
 * Confronto. Quem mantém a Reputação em 5-9 ganha +2 passivo só na Defesa;
 * quem mantém em 10 (máxima) ganha +2 passivo em Ataque E Defesa.
 */
export function bonusReputacaoConfronto(actor, papel) {
  const rep = actor.system.status?.reputacao?.value ?? 0;
  if (rep >= 10) return 2; // Lenda do Campus
  if (papel === "defesa" && rep >= 5) return 2; // Nível de Respeito
  return 0;
}
