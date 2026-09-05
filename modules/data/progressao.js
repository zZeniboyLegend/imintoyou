/**
 * A Jornada do Amadurecimento (Capítulo 4.2 do livro): XP necessário por
 * nível e os benefícios concedidos em cada um.
 */
export const XP_POR_NIVEL = {
  1: 0,
  2: 10,
  3: 25,
  4: 45,
  5: 70,
  6: 100,
  7: 135,
  8: 175,
  9: 220,
  10: 270
};

export const FASE_POR_NIVEL = {
  1: "O Calouro Indeciso",
  2: "Ajustando o Passo",
  3: "Rosto Conhecido",
  4: "Veterano em Ascensão",
  5: "O Auge do Semestre",
  6: "Influência no Pátio",
  7: "Lenda do Campus",
  8: "Mestre das Cenas",
  9: "Dono da Porra Toda",
  10: "O Epílogo Inesquecível"
};

/**
 * "vitalidade" pode ser um número fixo ou a string "vigor" (significa
 * "+ valor do Vigor do personagem", como nos níveis 3, 6 e 9 do livro).
 */
export const BENEFICIOS_NIVEL = {
  2: { vitalidade: 1, conflito: 1, pontosTalento: 1, pontosCaracteristica: 0, especializacao: false, habilidadeTribo: null, dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: false },
  3: { vitalidade: "vigor", conflito: 2, pontosTalento: 1, pontosCaracteristica: 0, especializacao: true, habilidadeTribo: null, dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: false },
  4: { vitalidade: 1, conflito: 2, pontosTalento: 0, pontosCaracteristica: 1, especializacao: false, habilidadeTribo: "nivel4", dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: false },
  5: { vitalidade: 1, conflito: 2, pontosTalento: 2, pontosCaracteristica: 0, especializacao: false, habilidadeTribo: null, dadoHypeD8: true, acoesExclusivas: false, feitoDoAno: false },
  6: { vitalidade: "vigor", conflito: 3, pontosTalento: 1, pontosCaracteristica: 0, especializacao: true, habilidadeTribo: null, dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: false },
  7: { vitalidade: 1, conflito: 3, pontosTalento: 0, pontosCaracteristica: 1, especializacao: false, habilidadeTribo: "nivel7", dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: false },
  8: { vitalidade: 1, conflito: 2, pontosTalento: 2, pontosCaracteristica: 0, especializacao: false, habilidadeTribo: null, dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: false },
  9: { vitalidade: "vigor", conflito: 3, pontosTalento: 1, pontosCaracteristica: 0, especializacao: false, habilidadeTribo: null, dadoHypeD8: false, acoesExclusivas: true, feitoDoAno: false },
  10: { vitalidade: 1, conflito: 5, pontosTalento: 2, pontosCaracteristica: 1, especializacao: false, habilidadeTribo: null, dadoHypeD8: false, acoesExclusivas: false, feitoDoAno: true }
};

/** Nível mínimo em que cada marco de habilidade de Tribo é destravado. */
export const NIVEL_HABILIDADE_TRIBO = {
  nivel1: 1,
  nivel4: 4,
  nivel7: 7,
  nivel9: 9
};
