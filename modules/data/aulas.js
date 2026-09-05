/**
 * Configuração comum das "Provas de Aula" (Etapa 17) — minigames de Inglês,
 * Química, Matemática e Educação Física. Ver README para a especificação
 * completa aprovada.
 */

// Duração padrão de cada prova em segundos. O Mestre pode sobrescrever no
// diálogo de "Iniciar Prova" (AulasApp). Educação Física não usa duração
// corrida — é sempre 5 tentativas fixas (ver prova-edfisica-app.js) — mas
// mantemos aqui como referência/label.
export const DURACAO_PADRAO = {
  ingles: 60,
  quimica: 60,
  matematica: 60,
  edfisica: 25
};

export const LABEL_MATERIA = {
  ingles: "Inglês",
  quimica: "Química",
  matematica: "Matemática",
  edfisica: "Educação Física"
};

// Sons padrão (usam arquivos que já vêm com o core do Foundry, pra não
// depender de asset extra). Se quiser trocar por um som próprio, basta
// substituir o valor aqui — todo o resto do código só chama SOM_INICIO_PROVA
// / SOM_FIM_PROVA, sem caminho fixo espalhado pelo código.
export const SOM_INICIO_PROVA = "sounds/notify.wav";
export const SOM_FIM_PROVA = "sounds/notify.wav";

// Cortes de nota — mesma tabela pra todas as 4 matérias (% da pontuação
// máxima possível daquela rodada específica).
const CORTES_NOTA = [
  { nota: "F", min: 0 },
  { nota: "D", min: 0.21 },
  { nota: "C", min: 0.41 },
  { nota: "B", min: 0.61 },
  { nota: "A", min: 0.81 },
  { nota: "A+", min: 0.96 }
];

export function calcularNota(pontuacao, maximo) {
  const pct = maximo > 0 ? pontuacao / maximo : 0;
  let nota = "F";
  for (const corte of CORTES_NOTA) {
    if (pct >= corte.min) nota = corte.nota;
  }
  return nota;
}

// "Cargas de vantagem" que o Talento relevante do personagem concede dentro
// do minigame (nunca facilita a lógica do desafio em si — só dá tempo/vidas/
// dicas extras). 1 carga a cada 2 pontos no Talento (0-6 -> 0 a 3 cargas).
export function cargasVantagem(actor, characteristic, talent) {
  const valor = actor?.system?.talents?.[characteristic]?.[talent] ?? 0;
  return Math.floor(valor / 2);
}

// 5 variações de texto de sabor por nota — usadas no chat sussurrado pro
// Mestre, reaproveitadas pelas 4 matérias (o contexto muda pouco de uma
// matéria pra outra, então um texto genérico funciona bem pras 4).
export const TEXTOS_SABOR = {
  "F": [
    "Só rabiscou o nome na folha e ficou olhando pro teto o resto da aula.",
    "Entregou a prova quase em branco, sem nem tentar disfarçar.",
    "Passou a aula inteira mais preocupado com outra coisa do que com a matéria.",
    "Nem terminou de ler o enunciado direito antes de desistir.",
    "Uma daquelas provas que o professor nem sabe por onde começar a comentar."
  ],
  "D": [
    "Terminou, mas dava pra ver que estava só chutando nas últimas questões.",
    "Só arranhou o conteúdo — o mínimo pra não zerar de vez.",
    "Começou bem e foi perdendo o fio da meada até o fim.",
    "Uma prova de quem estudou por cima, na correria da véspera.",
    "Ficou devendo o básico, mas pelo menos entregou algo."
  ],
  "C": [
    "Nada de especial, mas resolveu o suficiente pra passar despercebido.",
    "Prova mediana — cumpriu tabela sem brilhar em nada.",
    "Deu pra ver esforço, mas faltou segurança nas respostas.",
    "Ficou bem no meio do pelotão dessa vez.",
    "Nem chamou atenção pra cima nem pra baixo."
  ],
  "B": [
    "Prova sólida — o tipo de nota que ninguém comenta, mas que segura a média.",
    "Foi seguro do início ao fim, sem grandes tropeços.",
    "Deu pra notar que estudou de verdade pra essa.",
    "Uma prova consistente, sem luxo mas sem susto.",
    "Ficou entre os melhores da turma sem forçar a barra."
  ],
  "A": [
    "Terminou bem antes do sinal e ainda ajudou o vizinho de carteira escondido.",
    "Uma das melhores provas da turma — só faltou um detalhezinho pra perfeição.",
    "Resolveu tudo com uma confiança que chamou atenção do professor.",
    "Deixou até os mais aplicados da sala de queixo caído.",
    "Prova impecável, do tipo que rende elogio em voz alta."
  ],
  "A+": [
    "O tipo de prova que o professor lê em voz alta como exemplo pra turma.",
    "Nota máxima — já saiu comentário no corredor sobre essa prova.",
    "Simplesmente perfeita, sem um único deslize do início ao fim.",
    "Prova que vai parar no mural de destaques da escola.",
    "Um desempenho tão bom que até os rivais tiveram que reconhecer."
  ]
};

export const TEXTO_NAO_FEZ = "Fechou o caderno e nem tentou — a prova voltou completamente em branco.";

// ---- Boletim (Etapa 18) ----

// 6 provas por matéria ao longo do ano letivo.
export const TOTAL_PROVAS_ANO = 6;

// Notas consideradas "boas" pra contar na regra de aprovação.
const NOTAS_BOAS = ["B", "A", "A+"];

/**
 * Lê o boletim acumulado (flags.imintoyou.boletim) de um Actor e devolve um
 * objeto pronto pra tela: notas por matéria/prova, contagem de notas B+ e se
 * o personagem está aprovado (>= 3 notas B ou acima, em qualquer matéria).
 */
export function lerBoletim(actor) {
  const boletim = actor.getFlag("imintoyou", "boletim") ?? {};
  let totalBoas = 0;
  const materias = {};
  for (const materia of Object.keys(LABEL_MATERIA)) {
    const notas = [];
    for (let i = 1; i <= TOTAL_PROVAS_ANO; i++) {
      const nota = boletim?.[materia]?.[`prova${i}`] ?? null;
      if (nota && NOTAS_BOAS.includes(nota)) totalBoas += 1;
      notas.push(nota);
    }
    materias[materia] = notas;
  }
  return { materias, totalBoas, aprovado: totalBoas >= 3 };
}

