/**
 * Dados da Prova de Química — "Bancada de Reagentes".
 * 6 frascos fixos, cor + rótulo genérico (sem pretensão de precisão
 * química de verdade — o tom aqui é lúdico, não didático).
 */
export const FRASCOS_QUIMICA = [
  { id: "a", rotulo: "Composto A", cor: "#e63946" },
  { id: "b", rotulo: "Composto B", cor: "#2a9d8f" },
  { id: "c", rotulo: "Composto C", cor: "#e9c46a" },
  { id: "d", rotulo: "Composto D", cor: "#457b9d" },
  { id: "e", rotulo: "Composto E", cor: "#9b5de5" },
  { id: "f", rotulo: "Composto F", cor: "#f4a261" }
];

/**
 * Gera uma receita com `passos` etapas (cada etapa = 1 frasco a adicionar).
 * Evita repetir o mesmo frasco duas vezes seguidas (só por variedade visual).
 */
export function gerarReceitaQuimica(passos) {
  const receita = [];
  let anterior = null;
  for (let i = 0; i < passos; i++) {
    let opcoes = FRASCOS_QUIMICA.filter((f) => f.id !== anterior);
    const escolhido = opcoes[Math.floor(Math.random() * opcoes.length)];
    receita.push(escolhido.id);
    anterior = escolhido.id;
  }
  return receita;
}
