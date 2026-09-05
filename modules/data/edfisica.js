/**
 * Dados da Prova de Educação Física — "Circuito de Ritmo".
 * 5 estações fixas, cada uma com 1 tentativa (QTE de timing).
 * `velocidade` = duração em ms de uma volta completa do marcador na barra
 * (menor = mais rápido = mais difícil). `zonaOk` e `zonaPerfeita` são faixas
 * percentuais (0-100) da barra.
 */
export const ESTACOES_EDFISICA = [
  { id: "arremesso", nome: "Arremesso de Peso", velocidade: 1400, zonaOk: [40, 70], zonaPerfeita: [52, 60] },
  { id: "corrida", nome: "Corrida de Revezamento", velocidade: 1100, zonaOk: [35, 65], zonaPerfeita: [47, 55] },
  { id: "salto", nome: "Salto em Distância", velocidade: 1300, zonaOk: [42, 72], zonaPerfeita: [54, 62] },
  { id: "embaixadinha", nome: "Embaixadinha", velocidade: 950, zonaOk: [38, 68], zonaPerfeita: [50, 58] },
  { id: "flexao", nome: "Flexão Cronometrada", velocidade: 1200, zonaOk: [40, 70], zonaPerfeita: [52, 60] }
];

// Largura extra (em pontos percentuais) que cada "carga" de vantagem soma
// dos dois lados da zona perfeita daquela estação.
export const LARGURA_EXTRA_POR_CARGA = 3;
