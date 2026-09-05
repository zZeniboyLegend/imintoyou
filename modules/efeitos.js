/**
 * Efeitos Ativos do sistema — usa o motor nativo de Active Effects do
 * Foundry. Cada efeito criado por aqui já vem com uma "flag" própria
 * (flags.imintoyou.duracaoLabel) guardando o texto de duração em português
 * do livro (ex: "1 semana", "Até ser tratado no hospital"), já que o
 * sistema de duração nativo do Foundry (rodadas/segundos) não mapeia bem
 * pros prazos narrativos do livro.
 */
export async function criarEfeito(actor, { label, icon = "icons/svg/downgrade.svg", changes = [], duracaoLabel = "", permanente = false } = {}) {
  if (!changes.length) return null;

  const [efeito] = await actor.createEmbeddedDocuments("ActiveEffect", [
    {
      name: label,
      img: icon,
      disabled: false,
      changes: changes.map((c) => ({
        key: c.key,
        mode: CONST.ACTIVE_EFFECT_MODES.ADD,
        value: c.value
      })),
      flags: {
        imintoyou: { duracaoLabel, permanente }
      }
    }
  ]);
  return efeito;
}
