export const IMINTOYOU = {};

IMINTOYOU.characteristics = {
  presenca: "IMINTOYOU.Presenca",
  sagacidade: "IMINTOYOU.Sagacidade",
  estilo: "IMINTOYOU.Estilo",
  vigor: "IMINTOYOU.Vigor",
  atletismo: "IMINTOYOU.Atletismo",
  empatia: "IMINTOYOU.Empatia"
};

IMINTOYOU.talents = {
  presenca: ["labia", "intimidacao", "performance", "provocacao"],
  sagacidade: ["investigacao", "conhecimento", "malandragem", "percepcao"],
  estilo: ["postura", "seducaoSutil", "furtividadeSocial", "autocontrole"],
  vigor: ["resistencia", "tolerancia", "recuperacao", "folego"],
  atletismo: ["esportes", "agilidade", "forcaBruta", "manobraCorporal"],
  empatia: ["intuicaoSocial", "acolhimento", "deteccaoMentira", "mediacao"]
};

IMINTOYOU.tribosSociais = [
  "Os Atletas (Jocks)",
  "As Garotas Populares / Patricinhas (Preps)",
  "Os Nerds / Geeks",
  "Os Alternativos / Emos / Góticos",
  "Os Rebeldes / Bad Boys & Girls",
  "Os Artistas / Pessoal do Teatro (Theater Kids)",
  "O Conselho Estudantil / Os Certinhos (Overachievers)",
  "Os Músicos da Banda de Garagem (Indie / Rockers)",
  "Os Festeiros / Galera das Fraternidades (Party Animals)",
  "Os Acomodados / De Boa (Slackers / Casuals)"
];

IMINTOYOU.characteristicIcons = {
  presenca: "fa-star",
  sagacidade: "fa-brain",
  estilo: "fa-crown",
  vigor: "fa-heart-pulse",
  atletismo: "fa-person-running",
  empatia: "fa-hand-holding-heart"
};

IMINTOYOU.dificuldades = {
  muitoFacil: 5,
  facil: 10,
  media: 15,
  dificil: 20,
  muitoDificil: 25,
  extraordinaria: 30
};

// Tabela de Progresso Relacional (Capítulo 3.2 do livro)
IMINTOYOU.escalaAfetoLabels = {
  "-3": "Inimigos Declarados",
  "-2": "Rivais de Corredor",
  "-1": "Tensão / Distância",
  "0": "Neutro / Conhecidos",
  "1": "Simpatia / Interesse",
  "2": "Confidentes / Par",
  "3": "Vínculo Máximo"
};

// Bônus de Elite destravados quando a Escala de Afeto chega em +3 ou -3 (3.2 do livro)
IMINTOYOU.bonusVinculo = {
  amizade: {
    titulo: "Bônus de Melhor Amigo (Afeto +3 Fraterno)",
    itens: [
      "A Aura \"A Gente Se Entende\": em testes cooperativos ou lado a lado na mesma cena, ambos recebem +2 em testes de Empatia e podem compartilhar Pontos de Hype entre si.",
      "O Resgate Emocional: uma vez por sessão, se o Melhor Amigo estiver prestes a sofrer um Surto, use uma ação livre e um teste de Empatia + Acolhimento (DF 15); se passar, limpe 2 pontos da barra de Conflito Interno dele imediatamente."
    ]
  },
  rivalidade: {
    titulo: "Bônus de Rival (Afeto -3)",
    itens: [
      "O Foco do Ódio: testes de Estilo, Atletismo ou Presença focados em superar, humilhar ou vencer o Rival em público ganham Vantagem (3d12, descarta o menor).",
      "A Obsessão Recíproca: +2 em testes de Percepção e Detecção de Mentira contra ele."
    ]
  },
  romance: {
    titulo: "Bônus de Romance (Afeto +3 Amoroso)",
    itens: [
      "A Química Escancarada: testes de Presença + Lábia e Estilo + Sedução Sutil feitos junto com o Par Romântico, pelo mesmo objetivo, têm a Dificuldade reduzida em 5 pontos.",
      "O Escudo do Coração: uma vez por sessão, ao ser alvo de Provocação ou ataque verbal que afetaria Conflito Interno ou Reputação, o Par Romântico pode se interpor — o teste de defesa passa a ser dele (Estilo + Autocontrole)."
    ]
  }
};

/**
 * Retorna o Bônus de Elite destravado (se algum) para um vínculo, de acordo
 * com a Escala de Afeto e o Tipo do vínculo. -3 sempre destrava o Bônus de
 * Rival, independente do tipo — ódio não escolhe rótulo.
 */
IMINTOYOU.getBonusElite = function (escalaAfeto, tipo) {
  if (escalaAfeto === -3) return IMINTOYOU.bonusVinculo.rivalidade;
  if (escalaAfeto === 3 && tipo === "romance") return IMINTOYOU.bonusVinculo.romance;
  if (escalaAfeto === 3) return IMINTOYOU.bonusVinculo.amizade;
  return null;
};
