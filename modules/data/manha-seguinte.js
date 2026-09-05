/**
 * A Tabela de Acontecimentos da Manhã Seguinte (Capítulo 3.5, 1d12).
 * Cada entrada tem o texto do evento e, quando o efeito é puramente
 * numérico, os deltas aplicados automaticamente nas barras do personagem.
 * Efeitos que dependem de uma escolha do Mestre (quem é o destinatário,
 * qual Vínculo, etc.) ficam só no texto, para resolução narrativa.
 */
export const TABELA_MANHA_SEGUINTE = {
  1: {
    titulo: "O Texto da Madrugada",
    texto: "Você enviou uma mensagem comprometedora para o ex-namorado, rival ou crush às 3h40.",
    efeitoTexto: "+2 de Conflito Interno e -1 na Escala de Afeto com o destinatário (ajuste manualmente o Vínculo envolvido).",
    conflitoInternoDelta: 2
  },
  2: {
    titulo: "Onde Está Meu…?",
    texto: "Seu veículo (ou sua mochila/carteira) não está onde deveria. Você precisa rodar a cidade para achar.",
    efeitoTexto: "Atraso automático para o próximo compromisso e +1 de Conflito Interno.",
    conflitoInternoDelta: 1
  },
  3: {
    titulo: "Tatuagem / Rabisco de Canetinha",
    texto: "Você acorda com algo desenhado no rosto ou no braço com caneta permanente (ou uma tatuagem duvidosa).",
    efeitoTexto: "-1 em testes de Presença até conseguir remover a marca (efeito temporário — aplique manualmente enquanto durar)."
  },
  4: {
    titulo: "O Casaco Perdido",
    texto: "Você está vestindo uma jaqueta ou carregando um pertence que pertence a outra pessoa de uma Tribo rival.",
    efeitoTexto: "Ganha um Ganchinho de Investigação ou Vínculo imediato com o dono do item (crie o Vínculo manualmente)."
  },
  5: {
    titulo: "Promessa de Bêbado",
    texto: "Você prometeu algo absurdo para um NPC influente e ele já está cobrando logo cedo no SMS.",
    efeitoTexto: "Cumprir a promessa rende +1 de Reputação; recusar gera uma rivalidade instantânea (decida na cena e ajuste a Reputação/Vínculo manualmente)."
  },
  6: {
    titulo: "Ressaca Violenta",
    texto: "A cabeça dói e a luz do sol machuca os olhos.",
    efeitoTexto: "Penalidade de -2 em todos os testes físicos e mentais até o meio-dia (ou até tomar um café forte e passar num teste de Vigor DF 20+).",
    efeitoAtivo: {
      icon: "icons/svg/downgrade.svg",
      duracaoLabel: "Até o meio-dia (ou teste de Vigor DF 20+)",
      changes: [
        { key: "system.characteristics.vigor.value", value: -2 },
        { key: "system.characteristics.atletismo.value", value: -2 },
        { key: "system.characteristics.sagacidade.value", value: -2 }
      ]
    }
  },
  7: {
    titulo: "A Foto Vazada",
    texto: "Uma foto constrangedora da sua noite começou a circular nos flip phones e blogs da escola.",
    efeitoTexto: "Perde 1 ponto de Reputação temporária durante aquela semana.",
    reputacaoDelta: -1
  },
  8: {
    titulo: "Acordando no Lugar Errado",
    texto: "Você desperta no sofá da casa de um desconhecido, no gramado do campus ou no vestiário trancado.",
    efeitoTexto: "Precisa fazer um teste de Furtividade Social para sair sem virar piada."
  },
  9: {
    titulo: "Herói da Noite",
    texto: "Sem lembrar como, você fez algo incrivelmente engraçado ou épico que todos adoraram.",
    efeitoTexto: "Recebe +1 de Reputação e ganha 1 Ponto de Hype gratuito.",
    reputacaoDelta: 1,
    hypeDelta: 1
  },
  10: {
    titulo: "O Beijo Inesperado",
    texto: "Pessoas no pátio comentam que viram você ficando ou tendo um momento memorável com alguém totalmente improvável na festa.",
    efeitoTexto: "Altera o status na Escala de Afeto em +1 com esse personagem (ajuste manualmente o Vínculo envolvido)."
  },
  11: {
    titulo: "O Segredo Escorregou",
    texto: "Sob o efeito da empolgação, você contou parte do seu Segredo Confidencial para alguém que agora tem uma pista sobre você.",
    efeitoTexto: "Um NPC ganha uma dica sobre seu Segredo (resolva narrativamente com o Mestre)."
  },
  12: {
    titulo: "Paz Abençoada",
    texto: "Milagrosamente, nada de errado aconteceu. Você dormiu bem, tomou água e acordou renovado.",
    efeitoTexto: "Recupera 3 pontos da barra de Conflito Interno e ganha um bônus de +1 na primeira rolagem do dia.",
    conflitoInternoDelta: -3
  }
};
