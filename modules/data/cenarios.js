/**
 * Versão expandida dos 20 Locais Ícone dos Anos 2000 (Cap. 6.2), para virar
 * páginas de Journal em vez de só uma linha na Rollable Table. Cada local
 * ganha um Tom de Cena sugerido (Cap. 3.3) e 2 Ganchos de Cena prontos,
 * grounded nas mecânicas do sistema (Confronto, Vínculos, Segredos,
 * Reputação, Tribos).
 */
export const CENARIOS = [
  {
    titulo: "Diner / Lanchonete Retrô",
    descricao: "Estofados de vinil vermelho rasgados, cabines de madeira, jukebox tocando pop-rock, cheiro de hambúrguer e leite condensado, garçonete servindo café em jarras de vidro.",
    tom: "Indie Rock & Britpop — o clima de conversa despretensiosa entre uma refeição e outra.",
    ganchos: [
      "Um grupo de Tribo Rival ocupa a cabine favorita dos PJs — decidir se cede o lugar ou inicia um Confronto por status.",
      "A garçonete comenta, sem querer, ter visto um PJ em companhia estranha na noite passada — gancho pra um Segredo Confidencial vazar."
    ]
  },
  {
    titulo: "Pista de Skate Abandonada",
    descricao: "Pista de concreto cheia de grafites coloridos, latas de refrigerante amassadas, som portátil tocando punk-rock no volume máximo, jovens treinando manobras sob postes piscando.",
    tom: "Pop-Punk & Nu-Metal — energia, ousadia e um pouco de caos.",
    ganchos: [
      "Um Rebelde propõe um desafio arriscado de manobra (teste de Atletismo) pra provar quem manda no local.",
      "Pichações novas na pista mencionam um boato picante — ótimo lugar pra rolar a Tabela de Boatos e Fofocas."
    ]
  },
  {
    titulo: "Porão de Festa de Casa",
    descricao: "Teto baixo com lâmpadas pisca-pisca soltas, sofás velhos afundados, cheiro de bebida derramada, luzes de estroboscópio e copos vermelhos de plástico pelo carpete.",
    tom: "Pop-Punk & Nu-Metal, alternando pra Pop 2000s & R&B quando o clima esquenta.",
    ganchos: [
      "A energia cai bem no momento mais tenso da noite — use o evento \"Apagão Geral na Casa\" (Tabela de Eventos de Festa) pra forçar decisões no escuro.",
      "Um PJ percebe que o anfitrião não tem ideia de quem convidou metade das pessoas ali — chance perfeita de infiltrar um NPC indesejado."
    ]
  },
  {
    titulo: "Loja de Conveniência 24h",
    descricao: "Luzes fluorescentes zumbindo, cheiro de cachorro-quente de máquina, corredores estreitos, balcão de acrílico com revistas de fofoca e um atendente entediado.",
    tom: "Músicas de Tensão / Suspense Urbano — o silêncio esquisito da madrugada.",
    ganchos: [
      "É tarde da noite e o PJ está sozinho no caixa com alguém que definitivamente não deveria estar acordado àquela hora.",
      "As câmeras de segurança (quebradas há meses) viram, ironicamente, o álibi perfeito — ou a desculpa perfeita pra um Segredo nunca ser provado."
    ]
  },
  {
    titulo: "Quarto de Adolescente",
    descricao: "Paredes cobertas de pôsteres colados com fita, computador de tubo piscando o aplicativo de mensagens, luzes de néon roxo, CDs arranhados fora das caixas.",
    tom: "Balada Romântica / Acústico ou Emo & Pop-Rock Dramático, dependendo da cena.",
    ganchos: [
      "Um Vínculo de Romance pode evoluir aqui — conversa sincera à meia-luz, TV ligada, ninguém em casa.",
      "Um pôster fora do lugar ou uma gaveta entreaberta revela pra um visitante um pedaço do Segredo Confidencial do dono do quarto."
    ]
  },
  {
    titulo: "Fliperama / Arcade Zone",
    descricao: "Ruído ensurdecedor de moedas caindo e efeitos sonoros de jogos de luta, carpetes com estampas neon, máquinas de dança lotadas, luzes negras nas camisetas.",
    tom: "Pop-Punk & Nu-Metal — competitivo e barulhento.",
    ganchos: [
      "Uma aposta boba num jogo de luta vira questão de Reputação diante da galera reunida.",
      "O recordista da máquina mais popular é NPC de uma Tribo Rival — disputar o topo do ranking pode virar rivalidade pessoal."
    ]
  },
  {
    titulo: "Estacionamento da Escola",
    descricao: "Carros antigos e esportivos com som automotivo alto, jovens encostados nos capôs conversando, fumaça de cigarro escondida atrás do ônibus, sol da tarde no asfalto.",
    tom: "Indie Rock & Britpop — o intervalo entre uma coisa e outra.",
    ganchos: [
      "Um carro conhecido está estacionado torto e enferrujado, longe do habitual — pista visual de que algo mudou na vida de um NPC.",
      "Duas Tribos Rivais dividem o mesmo canto do estacionamento hoje — tensão imediata sem uma palavra ser dita."
    ]
  },
  {
    titulo: "Biblioteca do Campus",
    descricao: "Fileiras intermináveis de prateleiras de madeira alta, computadores bege pesados, cheiro de papel velho, cantos isolados entre corredores para conversas secretas.",
    tom: "Músicas de Tensão / Suspense Urbano — silêncio que amplifica qualquer segredo.",
    ganchos: [
      "Um livro devolvido com anotações reveladoras nas margens vira pista pra um Segredo alheio.",
      "O silêncio absoluto torna qualquer sussurro ouvível — ótimo cenário pra um teste de Percepção decidir o rumo da cena."
    ]
  },
  {
    titulo: "Arquibancada do Ginásio",
    descricao: "Estruturas de madeira ecoando passos, cheiro de piso encerado, faixas do time penduradas nas vigas, luzes de refletores focadas no centro da quadra.",
    tom: "Pop 2000s & R&B — o orgulho (ou vergonha) coletivo do time em jogo.",
    ganchos: [
      "Um jogo decisivo está rolando lá embaixo — a Reputação de quem joga bem (ou mal) muda na frente de todo mundo.",
      "Alguém sobe até o topo da arquibancada só pra ficar sozinho — bom momento pra uma conversa que ninguém mais devia ouvir."
    ]
  },
  {
    titulo: "Locadora de Filmes / Games",
    descricao: "Fileiras de caixas de VHS e DVDs, capas de filmes de terror dos anos 2000 em destaque, TV de tubo no balcão, cheiro de pipoca de micro-ondas.",
    tom: "Indie Rock & Britpop — nostalgia e companheirismo tranquilo.",
    ganchos: [
      "O último exemplar de um lançamento concorrido sobra só um — decidir quem fica com ele pode virar teste social ou favor cobrado depois.",
      "O atendente reconhece um PJ de outro contexto da cidade — conexão inesperada, gancho de Vínculo novo."
    ]
  },
  {
    titulo: "Piscina Pública / Clube Local",
    descricao: "Água azul refletindo o sol forte, espreguiçadeiras de plástico branco, rádio FM tocando os sucessos do verão, cheiro forte de protetor solar de coco.",
    tom: "Pop 2000s & R&B — flerte, holofote e exposição social.",
    ganchos: [
      "Um boato picante circula entre as espreguiçadeiras antes mesmo do PJ notar que é sobre ele.",
      "Alguém 'esquece' a toalha ou os pertences perto demais do grupo errado — pequeno atrito que pode virar Confronto."
    ]
  },
  {
    titulo: "Loja de Discos / CDs Usados",
    descricao: "Caixas de madeira repletas de CDs e discos de vinil para garimpar, fones pendurados no balcão, iluminação amarelada, paredes repletas de autógrafos.",
    tom: "Indie Rock & Britpop — descoberta e paixão por música.",
    ganchos: [
      "Um vinil raro e caro aparece por um preço suspeito — de onde ele veio, exatamente?",
      "Dois PJs de Tribos diferentes se encontram garimpando a mesma caixa — interesse em comum que ninguém esperava."
    ]
  },
  {
    titulo: "Cafeteria Universitária",
    descricao: "Mesas de metal ao ar livre sob árvores grandes, copos de papelão com nomes escritos de caneta, jovens com notebooks pesados, som de violão acústico ao fundo.",
    tom: "Indie Rock & Britpop — leve, cotidiano, propício a conversas longas.",
    ganchos: [
      "Um grupo de estudo se forma sem querer ao redor da mesma mesa — força interação entre PJs que normalmente não se falariam.",
      "Um professor está sentado bem perto, ouvindo mais do que deveria."
    ]
  },
  {
    titulo: "Telhado do Bloco Escolar",
    descricao: "Vento forte, vista panorâmica da cidade e do campo de futebol, cascalho solto, pichações discretas com iniciais de casais — o lugar perfeito para conversas a sós.",
    tom: "Balada Romântica / Acústico — intimidade e confissões.",
    ganchos: [
      "O lugar clássico pra confissões — ótimo gatilho pra evoluir a Escala de Afeto de um Vínculo.",
      "Alguém já está lá quando o PJ chega, claramente fugindo de algo — quem, e por quê?"
    ]
  },
  {
    titulo: "Píer / Beira do Lago",
    descricao: "Madeira antiga rangendo com a água, fogueira improvisada na areia, latas de bebida fria em isopores, som das ondas ao entardecer sob um céu alaranjado.",
    tom: "Balada Romântica / Acústico — calmaria antes ou depois da tempestade.",
    ganchos: [
      "Uma fogueira improvisada reúne gente de Tribos opostas por uma noite só — trégua temporária ou nova amizade?",
      "Um objeto pessoal é jogado n'água num momento de raiva — e alguém vai ter que decidir se recupera."
    ]
  },
  {
    titulo: "Shopping Center (Praça de Alimentação)",
    descricao: "Mesas de fórmica sob claraboia de vidro gigante, som distante das lojas de departamento, jovens circulando em grupos, cheiro de canela e fast-food.",
    tom: "Pop 2000s & R&B — o desfile social do fim de semana.",
    ganchos: [
      "Um encontro 'por acaso' que na real foi planejado — perfeito pra um golpe de Sedução Sutil ou Lábia.",
      "Seguranças da loja seguem de perto um grupo específico — a Reputação prévia (boa ou ruim) já precede os PJs."
    ]
  },
  {
    titulo: "Vestiário dos Atletas",
    descricao: "Fileiras de armários de metal cinza com trincos barulhentos, bancos de madeira compridos, cheiro de desodorante spray e piso de azulejo frio ainda úmido.",
    tom: "Pop-Punk & Nu-Metal — testosterona, provocação e adrenalina pré-jogo.",
    ganchos: [
      "Uma conversa não deveria ter sido ouvida por quem estava no chuveiro — Segredo exposto sem querer.",
      "A rivalidade entre titulares e reservas esquenta antes de um jogo importante."
    ]
  },
  {
    titulo: "Auditório do Colégio",
    descricao: "Camadas de poltronas de veludo vermelho encarando um palco de madeira largo, cortinas pesadas nas laterais, eco profundo e cheiro de mofo suave no ar.",
    tom: "Emo & Pop-Rock Dramático — o clima teatral por natureza.",
    ganchos: [
      "Um ensaio é interrompido por um boato explosivo que já está circulando entre a plateia vazia.",
      "As luzes de palco escondem quem está na plateia — perfeito pra alguém espionar sem ser visto."
    ]
  },
  {
    titulo: "Parque de Diversões Local",
    descricao: "Roda-gigante iluminada contra o céu noturno, barracas de jogos com bichos de pelúcia gigantes, cheiro de algodão-doce, gritos vindos da montanha-russa de ferro.",
    tom: "Pop 2000s & R&B, virando Balada Romântica no alto da roda-gigante.",
    ganchos: [
      "A roda-gigante para no ponto mais alto bem na hora errada — dois PJs presos juntos, sem escapatória da conversa.",
      "Um jogo de prêmios manipulado vira desculpa pra provocar ou impressionar alguém."
    ]
  },
  {
    titulo: "Posto de Gasolina na Rota de Saída",
    descricao: "Um oásis isolado sob holofotes brancos potentes no meio da noite, bombas de combustível antigas, poças de óleo no chão e um telefone público na parede.",
    tom: "Músicas de Tensão / Suspense Urbano — a última parada antes do desconhecido.",
    ganchos: [
      "É a última parada antes de sair da cidade — a decisão de ficar ou ir embora pesa mais aqui do que em qualquer outro lugar.",
      "Um estranho de passagem sabe mais sobre o PJ do que deveria."
    ]
  }
];
