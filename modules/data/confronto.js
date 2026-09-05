/**
 * As 4 Ações Verbais de Ataque e as 3 Posturas de Defesa do Confronto
 * (Capítulo 3.4 do livro). Cada ataque define qual Característica + Talento
 * o atacante rola, e como o dano de Conflito Interno é calculado.
 */
export const ATAQUES_CONFRONTO = {
  direto: {
    label: "Ataque Direto / Provocação",
    char: "presenca",
    talent: "provocacao",
    dano: (sys) => sys.characteristics.presenca.value,
    descricao: "Acusações abertas, ironia afiada, expor contradições em público. Se acertar, causa dano igual à Presença."
  },
  pressaoLogica: {
    label: "Pressão Lógica / Argumentação",
    char: "sagacidade",
    talentOptions: ["conhecimento", "investigacao"],
    dano: (sys) => sys.characteristics.sagacidade.value,
    ignoraReducaoPostura: true,
    descricao: "Fatos frios, provas, consequências lógicas inescapáveis. Se acertar, causa dano igual à Sagacidade — ignora a redução de dano da Postura Inabalável."
  },
  persuasao: {
    label: "Persuasão Emocional / Chantagem Afetiva",
    char: "empatia",
    talentOptions: ["acolhimento", "labia"],
    dano: (sys) => sys.characteristics.empatia.value,
    bonusVinculoPositivo: 2,
    descricao: "Tocar no ponto fraco, apelar para o passado ou para a culpa. Causa dano igual à Empatia (+2 se o alvo tiver Vínculo Positivo com você)."
  },
  blefe: {
    label: "Blefe / Jogada de Risco",
    char: "presenca",
    talent: "labia",
    defesaFixa: { char: "sagacidade", talent: "percepcao" },
    danoDado: "1d6",
    danoBonus: (sys) => sys.characteristics.presenca.value,
    autoDanoSeFalhar: 3,
    descricao: "Mentira descarada ou ameaça falsa. Testado sempre contra Sagacidade + Percepção do alvo (não a Postura escolhida). Se passar: 1d6 + Presença de dano. Se falhar: você sofre 3 de Conflito Interno."
  }
};

export const POSTURAS_CONFRONTO = {
  inabalavel: {
    label: "Postura Inabalável",
    char: "estilo",
    talent: "autocontrole",
    reduzDano: (sys) => sys.characteristics.estilo.value,
    descricao: "Mantém o olhar frio. Reduz todo dano emocional recebido na rodada em valor igual ao Estilo, mesmo se o atacante acertar."
  },
  ironia: {
    label: "Ironia / Deboche",
    char: "estilo",
    talent: "postura",
    contraAtaqueSeAtacanteFalhar: 2,
    descricao: "Devolve a estocada com desdém. Se o atacante falhar, ele sofre 2 de Conflito Interno pelo constrangimento."
  },
  escudo: {
    label: "Escudo de Vínculo / Desviar o Foco",
    char: "empatia",
    talent: "intuicaoSocial",
    curaSeAtacanteFalhar: 1,
    descricao: "Joga a culpa em um terceiro ou usa uma testemunha. Se o atacante falhar, o defensor recupera 1 ponto de Conflito Interno."
  }
};
