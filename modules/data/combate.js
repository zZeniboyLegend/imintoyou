/**
 * Objetos Improvisados (Cap. 8.2) e Ferimentos Prolongados (Cap. 8.1) do
 * Combate Físico. O bônus dos objetos médios/pesados depende de o atacante
 * ter Atletismo 2+ ou não (regra do livro).
 */
export const OBJETOS_IMPROVISADOS = {
  nenhum: {
    label: "Nenhum (mãos e pés)",
    bonus: () => 0
  },
  pequeno: {
    label: "Objeto Pequeno (livro pesado, cinto, bandeja de metal)",
    bonus: () => 2
  },
  medio: {
    label: "Objeto Médio (cadeira, taco de sinuca, skate, garrafa)",
    bonus: (atletismo) => (atletismo >= 2 ? 4 : 2),
    requerAtletismo: 2
  },
  pesado: {
    label: "Objeto Pesado (taco de baseball, lixeira de metal, banco)",
    bonus: (atletismo) => (atletismo >= 2 ? 6 : 3),
    requerAtletismo: 2
  }
};

/**
 * Cada entrada pode trazer um "efeitoAtivo": os changes que viram um Active
 * Effect de verdade na ficha do alvo (Cap. 8, Etapa de Automação Técnica),
 * além do texto narrativo e dos deltas numéricos já existentes.
 */
export const FERIMENTOS_PROLONGADOS = {
  1: {
    nome: "Olho Roxo / Cordeiro na Bochecha",
    efeito: "-1 em testes de Presença e Sedução Sutil durante 1 semana devido às marcas visíveis no rosto.",
    efeitoAtivo: {
      icon: "icons/svg/downgrade.svg",
      duracaoLabel: "1 semana",
      changes: [
        { key: "system.characteristics.presenca.value", value: -1 },
        { key: "system.talents.estilo.seducaoSutil", value: -1 }
      ]
    }
  },
  2: {
    nome: "Corte no Lábio / Nariz Sangrando",
    efeito: "Mancha a roupa de sangue e adiciona +2 na barra de Conflito Interno do alvo pelo pânico e dor.",
    conflitoInternoDelta: 2
  },
  3: {
    nome: "Ombro Deslocado / Pulso Torcido",
    efeito: "Penalidade de -2 em qualquer teste que envolva Atletismo ou Força Bruta até ser tratado no hospital.",
    efeitoAtivo: {
      icon: "icons/svg/downgrade.svg",
      duracaoLabel: "Até ser tratado no hospital",
      changes: [{ key: "system.characteristics.atletismo.value", value: -2 }]
    }
  },
  4: {
    nome: "Costela Contundida",
    efeito: "Respirar fundo dói. Reduz o Fôlego em -2 e exige testes de Vigor para não perder o ar ao correr.",
    efeitoAtivo: {
      icon: "icons/svg/downgrade.svg",
      duracaoLabel: "Até se recuperar",
      changes: [{ key: "system.talents.vigor.folego", value: -2 }]
    }
  },
  5: {
    nome: "Tontura / Concussão Leve",
    efeito: "O mundo roda. O personagem sofre Desvantagem em testes de Sagacidade e Percepção pelo resto do dia.",
    efeitoAtivo: {
      icon: "icons/svg/downgrade.svg",
      duracaoLabel: "Resto do dia (aproximação de Desvantagem em Sagacidade/Percepção)",
      changes: [{ key: "system.characteristics.sagacidade.value", value: -2 }]
    }
  },
  6: {
    nome: "Cicatriz Marcante",
    efeito: "O ferimento exige pontos no hospital. Gera uma marca permanente que concede +1 em Intimidação, mas -1 de Reputação com adultos.",
    reputacaoDelta: -1,
    efeitoAtivo: {
      icon: "icons/svg/upgrade.svg",
      duracaoLabel: "Permanente",
      permanente: true,
      changes: [{ key: "system.talents.presenca.intimidacao", value: 1 }]
    }
  }
};
