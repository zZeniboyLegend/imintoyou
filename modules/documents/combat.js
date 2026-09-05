/**
 * Integração com o Combat Tracker nativo do Foundry (Capítulo 8.1: "Ordem
 * de ação na rodada é determinada por um teste direto de Atletismo +
 * Agilidade. Em caso de empate, age primeiro o personagem com a maior
 * Presença base.").
 *
 * Isso é complementar à janela de Combate Físico (que resolve ataque x
 * defesa 1 contra 1): o Combat Tracker entra quando a cena tem 3+
 * combatentes e o Mestre precisa de uma ordem de turno de verdade.
 */
export class ImIntoYouCombat extends Combat {
  /** @override */
  _getInitiativeFormula(combatant) {
    const sys = combatant.actor?.system;
    const atletismo = sys?.characteristics?.atletismo?.value ?? 0;
    const agilidade = sys?.talents?.atletismo?.agilidade ?? 0;
    return `2d12 + ${atletismo} + ${agilidade}`;
  }

  /** @override */
  _sortCombatants(a, b) {
    const ia = a.initiative ?? -Infinity;
    const ib = b.initiative ?? -Infinity;
    if (ia !== ib) return ib - ia;

    // Empate: quem tiver maior Presença age primeiro (Cap. 8.1)
    const pa = a.actor?.system?.characteristics?.presenca?.value ?? 0;
    const pb = b.actor?.system?.characteristics?.presenca?.value ?? 0;
    if (pa !== pb) return pb - pa;

    return (a.id ?? "").localeCompare(b.id ?? "");
  }
}
