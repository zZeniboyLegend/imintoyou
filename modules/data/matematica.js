/**
 * Dados da Prova de Matemática — "Linha de Montagem de Equações".
 * Dificuldade sobe a cada 3 acertos: nível 1 = soma/subtração simples,
 * nível 2 = multiplicação, nível 3+ = duas operações combinadas.
 */
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarOpcoes(resposta) {
  const opcoes = new Set([resposta]);
  while (opcoes.size < 4) {
    const desvio = aleatorio(-6, 6);
    const candidato = resposta + (desvio === 0 ? 1 : desvio);
    if (candidato >= 0) opcoes.add(candidato);
  }
  return [...opcoes].sort(() => Math.random() - 0.5);
}

export function gerarEquacao(nivel) {
  let a, b, texto, resposta;

  if (nivel <= 1) {
    a = aleatorio(1, 20);
    b = aleatorio(1, 20);
    if (Math.random() < 0.5) {
      texto = `${a} + ${b} = ▢`;
      resposta = a + b;
    } else {
      const maior = Math.max(a, b);
      const menor = Math.min(a, b);
      texto = `${maior} − ${menor} = ▢`;
      resposta = maior - menor;
    }
  } else if (nivel === 2) {
    a = aleatorio(2, 12);
    b = aleatorio(2, 10);
    texto = `${a} × ${b} = ▢`;
    resposta = a * b;
  } else {
    a = aleatorio(2, 10);
    b = aleatorio(2, 10);
    const c = aleatorio(1, 15);
    texto = `(${a} × ${b}) + ${c} = ▢`;
    resposta = a * b + c;
  }

  return {
    texto,
    resposta,
    opcoes: gerarOpcoes(resposta),
    nivel
  };
}
