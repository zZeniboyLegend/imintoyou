import { TABELA_MANHA_SEGUINTE } from "./data/manha-seguinte.js";
import { criarEfeito } from "./efeitos.js";

const DF_CLARIDADE = 15;

/**
 * Roda a mecânica de Manhã Seguinte (Capítulo 3.5) para um personagem:
 * Teste de Claridade = 2d12 + Vigor + Tolerância contra DF 15.
 * Sucesso: memória intacta, sem complicações.
 * Falha: rola 1d12 na Tabela de Acontecimentos e aplica os efeitos
 * automatizáveis (Conflito Interno, Reputação, Hype) direto na ficha.
 */
export async function rodarManhaSeguinte(actor) {
  const sys = actor.system;
  const vigor = sys.characteristics?.vigor?.value ?? 0;
  const tolerancia = sys.talents?.vigor?.tolerancia ?? 0;

  const roll = await new Roll("2d12 + @vigor + @tolerancia", { vigor, tolerancia }).roll();
  const sucesso = roll.total >= DF_CLARIDADE;

  if (sucesso) {
    await ChatMessage.create({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: `🌅 Manhã Seguinte — Teste de Claridade (DF ${DF_CLARIDADE})`,
      content: `<div class="imintoyou-manha-seguinte">
        <p><strong>${actor.name}</strong> acorda com a <strong>memória intacta</strong> (total ${roll.total}).</p>
        <p class="hint">Lembra perfeitamente de tudo o que fez, falou e ouviu — só o desgaste normal da noite, narrado à parte pelo Mestre.</p>
      </div>`,
      rolls: [roll]
    });
    return;
  }

  const dadoEvento = await new Roll("1d12").roll();
  const evento = TABELA_MANHA_SEGUINTE[dadoEvento.total];

  const efeitosAplicados = [];
  const updateData = {};

  if (evento.conflitoInternoDelta) {
    const atual = sys.status.conflitoInterno.value;
    const max = sys.status.conflitoInterno.max;
    const novo = Math.max(0, Math.min(max, atual + evento.conflitoInternoDelta));
    updateData["system.status.conflitoInterno.value"] = novo;
    efeitosAplicados.push(
      evento.conflitoInternoDelta > 0
        ? `+${evento.conflitoInternoDelta} de Conflito Interno`
        : `${evento.conflitoInternoDelta} de Conflito Interno (recuperação)`
    );
  }
  if (evento.reputacaoDelta) {
    const atual = sys.status.reputacao.value;
    const max = sys.status.reputacao.max;
    const novo = Math.max(0, Math.min(max, atual + evento.reputacaoDelta));
    updateData["system.status.reputacao.value"] = novo;
    efeitosAplicados.push(`${evento.reputacaoDelta > 0 ? "+" : ""}${evento.reputacaoDelta} de Reputação`);
  }
  if (evento.hypeDelta) {
    const atual = sys.hype.value;
    updateData["system.hype.value"] = atual + evento.hypeDelta;
    efeitosAplicados.push(`+${evento.hypeDelta} Ponto de Hype`);
  }

  if (Object.keys(updateData).length) await actor.update(updateData);

  if (evento.efeitoAtivo) {
    await criarEfeito(actor, {
      label: evento.titulo,
      icon: evento.efeitoAtivo.icon,
      changes: evento.efeitoAtivo.changes,
      duracaoLabel: evento.efeitoAtivo.duracaoLabel,
      permanente: evento.efeitoAtivo.permanente ?? false
    });
    efeitosAplicados.push(`Efeito colado na ficha (${evento.efeitoAtivo.duracaoLabel})`);
  }

  await ChatMessage.create({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: `🌅 Manhã Seguinte — Teste de Claridade (DF ${DF_CLARIDADE})`,
    content: `<div class="imintoyou-manha-seguinte falhou">
      <p><strong>${actor.name}</strong> acorda com <strong>lacunas de memória</strong> (total ${roll.total}) — rolou <strong>${dadoEvento.total}</strong> na Tabela de Acontecimentos:</p>
      <p><strong>${evento.titulo}</strong></p>
      <p><em>${evento.texto}</em></p>
      <p>${evento.efeitoTexto}</p>
      ${efeitosAplicados.length ? `<p class="hint">Aplicado automaticamente: ${efeitosAplicados.join(", ")}.</p>` : ""}
    </div>`,
    rolls: [roll, dadoEvento]
  });
}
