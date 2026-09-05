/**
 * As 10 Tribos Sociais do livro "I'm Into You" (Capítulo 3.1), já convertidas
 * para o formato de Item do sistema. Usado pelo botão "Importar Tribos" no
 * diretório de Items.
 */
export const TRIBOS_PADRAO = [
  {
    name: "Os Atletas (Jocks)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/atletas.webp",
    system: {
      descricao: "\"O mundo é um campo de jogo, e os refletores foram feitos para brilhar sobre nós.\"",
      visaoDeFora: "Acham que mandar no colégio se resume a usar uma jaqueta universitária e gritar na arquibancada. São mimados, competitivos e acham que qualquer problema se resolve no grito ou no esbarrão. Mas, sendo sincero? Quando a festa acontece ou o ginásio lota, todo mundo quer estar do lado deles.",
      vitalidadeBase: 15,
      conflitoInternoBase: 8,
      reputacaoBase: 3,
      triboRival: "Os Nerds",
      bonusTalento: "+1 em Esportes e +1 em Resistência (ou +2 em Esportes)",
      habilidades: {
        nivel1: { nome: "Espírito de Equipe", descricao: "Uma vez por sessão, ao realizar um teste de Atletismo enquanto é incentivado por aliados, você pode rolar o Dado de Hype (+1d6) sem gastar Pontos de Hype." },
        nivel4: { nome: "Passe de Elite", descricao: "A sua presença física impõe respeito. Você ganha +2 em testes de Intimidação quando estiver vestindo itens da sua equipe ou uniforme esportivo." },
        nivel7: { nome: "O Momento da Vitória", descricao: "Quando estiver a uma jogada de falhar miseravelmente em uma cena de grande visibilidade pública, você pode gastar 1 Ponto de Hype para transformar uma Falha Simples em um Sucesso em um teste de qualquer talento relacionado à característica de Atletismo." },
        nivel9: { nome: "A Jogada do Campeonato", descricao: "Em um teste físico ou esportivo crucial, você pode substituir a rolagem de 2d12 por um valor numérico fixo de 20." }
      }
    }
  },
  {
    name: "As Garotas Populares / Patricinhas (Preps)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/garotas-populares.webp",
    system: {
      descricao: "\"Não é fofoca se for a mais pura verdade.\"",
      visaoDeFora: "Elas andam pelo corredor como se estivessem numa passarela e controlam o ar que a gente respira. Bastam dois segundos de cochicho para destruírem a vida de alguém antes do almoço. É impossível não odiar o privilégio delas... e é impossível não querer ser aceito na mesa delas.",
      vitalidadeBase: 10,
      conflitoInternoBase: 10,
      reputacaoBase: 5,
      triboRival: "Os Alternativos / Emos",
      bonusTalento: "+1 em Lábia e +1 em Postura (ou +2 em Lábia)",
      habilidades: {
        nivel1: { nome: "Ditadora de Tendências", descricao: "Ao entrar em uma festa ou evento social, você pode gastar 1 ponto de Reputação para fazer com que todos os olhares se voltem para você, recebendo +2 em testes de Presença naquela cena." },
        nivel4: { nome: "A Bateria de Boatos", descricao: "Você sabe exatamente onde machuca. Seus ataques verbais de Provocação causam 2 pontos a mais de dano na barra de Conflito Interno do alvo se houver plateia assistindo." },
        nivel7: { nome: "Intocável", descricao: "Uma vez por história, quando sua Reputação estiver prestes a ser reduzida por uma humilhação pública, você pode culpar outro personagem, transferindo a perda de Reputação pela metade para ele (arredondando para cima se necessário)." },
        nivel9: { nome: "A Exclusão Social", descricao: "Você pode espalhar uma fofoca que obriga todos os membros da sua Tribo e simpatizantes a ignorarem um NPC ou PJ específico, aplicando -3 de penalidade em todas as rolagens sociais dele até que ele se retrate." }
      }
    }
  },
  {
    name: "Os Nerds / Geeks",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/nerds.webp",
    system: {
      descricao: "\"Enquanto vocês se preocupam com a festa de sexta, nós já calculamos os próximos dez anos, vamos ver quem vão ser os Perdedores no final!\"",
      visaoDeFora: "Esquisitos, obcecados por notas, computadores, jogos ou ficção científica. Vivem no próprio mundo e parecem invisíveis... Até o dia em que você precisa que alguém invada o sistema da escola para mudar sua nota de Química ou consertar seu computador.",
      vitalidadeBase: 8,
      conflitoInternoBase: 15,
      reputacaoBase: 1,
      triboRival: "Os Atletas",
      bonusTalento: "+1 em Investigação e +1 em Conhecimento (ou +2 em Investigação)",
      habilidades: {
        nivel1: { nome: "Plano B Estratégico", descricao: "Você antecipa falhas. Uma vez por sessão, ao falhar em um teste de Sagacidade, você pode explicitar um detalhe prévio que pensou e refazer a rolagem." },
        nivel4: { nome: "Hackear & Mapear", descricao: "Você consegue descobrir segredos ou padrões analisando redes sociais primitivas, fóruns ou históricos. Você recebe +2 em Investigação quando busca informações sobre a vida pessoal de NPCs ou PJs." },
        nivel7: { nome: "Triunfo dos Rejeitados", descricao: "Ao agir em prol de defender um amigo próximo que esteja sendo ridicularizado, você adiciona um bônus numérico fixo de +4 em qualquer teste de Sagacidade ou Empatia." },
        nivel9: { nome: "A Invasão ao Sistema", descricao: "Você ganha acesso irrestrito aos registros escolares, e-mails de professores ou câmeras de segurança, obtendo uma resposta 100% verdadeira do Mestre sobre qualquer evento passado." }
      }
    }
  },
  {
    name: "Os Alternativos / Emos / Góticos",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/alternativos.webp",
    system: {
      descricao: "\"Sua vida perfeita de comercial de margarina me dá ansiedade.\"",
      visaoDeFora: "Usam preto no calor de trinta graus, escrevem poesias depressivas e passam o tempo no fundo do pátio com fones de ouvido gigantes. Parecem drama puro, mas são os únicos que não fingem ser felizes o tempo todo para agradar os outros.",
      vitalidadeBase: 10,
      conflitoInternoBase: 14,
      reputacaoBase: 2,
      triboRival: "As Garotas Populares / As Patricinhas",
      bonusTalento: "+1 em Autocontrole e +1 em Performance (ou +2 em Autocontrole)",
      habilidades: {
        nivel1: { nome: "Abraçar o Caos", descricao: "O sofrimento é seu habitat. Quando sua barra de Conflito Interno estiver acima da metade, você recebe +1 em todas as rolagens de Estilo." },
        nivel4: { nome: "Poesia Crua", descricao: "Através de composições, artes ou conversas profundas na madrugada, você consegue reduzir a barra de Conflito Interno de um aliado em 3 pontos com um teste bem-sucedido de Empatia + Acolhimento." },
        nivel7: { nome: "Catarse Emocional", descricao: "Ao sofrer um Surto, em vez de ficar incapacitado, você pode canalizar essa explosão para realizar uma ação artística ou confrontativa memorável que concede +2 de Reputação com a sua tribo." },
        nivel9: { nome: "O Manifesto Subterrâneo", descricao: "Você organiza um evento ou lança um manifesto artístico que limpa toda a barra de Conflito Interno de todos os aliados presentes na cena." }
      }
    }
  },
  {
    name: "Os Rebeldes / Bad Boys & Girls",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/rebeldes.webp",
    system: {
      descricao: "\"Regras são apenas sugestões para quem tem medo de viver.\"",
      visaoDeFora: "Jaquetas de couro, cigarros escondidos atrás do ginásio, notas no limite e uma ficha cheia de advertências na diretoria. Eles dão dor de cabeça só de olhar, mas vamos ser honestos: são as pessoas mais fascinantes e perigosas do colégio.",
      vitalidadeBase: 14,
      conflitoInternoBase: 11,
      reputacaoBase: 2,
      triboRival: "O Conselho Estudantil / Certinhos",
      bonusTalento: "+1 em Malandragem e +1 em Intimidação (ou +2 em Malandragem)",
      habilidades: {
        nivel1: { nome: "Fora da Lei", descricao: "Você conhece os pontos cegos do campus e os esquemas da cidade. Ganha +2 em testes de Furtividade Social e Malandragem para burlar regras ou segurança." },
        nivel4: { nome: "Charme Perigoso", descricao: "A sua aura de perigo atrai as pessoas. Testes de Sedução Sutil contra personagens de tribos certinhas ou populares recebem +2 de bônus." },
        nivel7: { nome: "Casca Grossa", descricao: "Uma vez por cena, ao sofrer dano na Vitalidade por brigas ou acidentes, você pode gastar 1 Ponto de Hype para ignorar completamente o dano físico sofrido." },
        nivel9: { nome: "A Revolta no Campus", descricao: "Você inicia um tumulto no pátio ou no refeitório que paralisa as atividades escolares pelo dia inteiro e impede que qualquer autoridade aplique advertências naquela cena." }
      }
    }
  },
  {
    name: "Os Artistas / Pessoal do Teatro (Theater Kids)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/artistas.webp",
    system: {
      descricao: "\"A vida é um palco gigante, e nós somos os únicos que realmente sabem interpretar.\"",
      visaoDeFora: "Dramáticos até para pedir um copo d'água no refeitório, vivem no auditório e cantam do nada nos corredores. Podem ser intensos e meio cansativos, mas quando eles sobem ao palco ou organizam um evento, ninguém consegue tirar os olhos.",
      vitalidadeBase: 10,
      conflitoInternoBase: 12,
      reputacaoBase: 3,
      triboRival: "Os Acomodados / De Boa",
      bonusTalento: "+1 em Performance e +1 em Lábia (ou +2 em Performance)",
      habilidades: {
        nivel1: { nome: "Mudar de Máscara", descricao: "Você consegue fingir emoções que não está sentindo. Ganha +2 em testes de Lábia para fingir inocência, choro ou empolgação diante de professores ou autoridades." },
        nivel4: { nome: "Monólogo Dramático", descricao: "Em um momento de tensão, você pode tomar a palavra com um discurso apaixonado. Todos os ouvintes devem fazer um teste de Estilo + Autocontrole; se falharem, ficam paralisados escutando você até o fim da cena." },
        nivel7: { nome: "O Show Tem Que Continuar", descricao: "Uma vez por sessão, se sua Vitalidade ou Conflito Interno chegarem a zero, você pode adiar os efeitos negativos até o final da cena atual através de pura força dramática." },
        nivel9: { nome: "A Atuação Perfeita", descricao: "Você pode fingir uma mentira tão convincente que até mesmo testes de Detecção de Mentira falham automaticamente contra você durante uma cena inteira." }
      }
    }
  },
  {
    name: "O Conselho Estudantil / Os Certinhos (Overachievers)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/conselho-estudantil.webp",
    system: {
      descricao: "\"Alguém precisa manter este lugar funcionando, e claramente não são vocês.\"",
      visaoDeFora: "Organizadores do baile, voluntários de tudo, favoritos dos professores e obcecados pelo currículo universitário. São céticos, controladores e vivem estressados com prazos, mas sem eles a escola desmoronava em dois dias.",
      vitalidadeBase: 9,
      conflitoInternoBase: 14,
      reputacaoBase: 4,
      triboRival: "Os Rebeldes / Bad Boys",
      bonusTalento: "+1 em Conhecimento e +1 em Mediação (ou +2 em Mediação)",
      habilidades: {
        nivel1: { nome: "Carteirada de Autoridade", descricao: "Você tem o aval da direção. Uma vez por sessão, pode requisitar acesso a áreas restritas, chaves ou registros escolares sem precisar fazer testes." },
        nivel4: { nome: "Gestão de Crise", descricao: "Quando a situação sai do controle, sua mente fria encontra soluções formais. Ganha +2 em testes de Mediação e Autocontrole ao tentar acalmar uma multidão ou evitar uma punição coletiva." },
        nivel7: { nome: "Network de Ouro", descricao: "A sua lista de contatos é impecável. Você pode gastar 2 pontos de Reputação para conseguir um favor extraordinário de um professor, diretor ou figura de autoridade da cidade." },
        nivel9: { nome: "Interdição Oficial", descricao: "Você pode usar o regulamento do campus para suspender um aluno, cancelar um evento oficial ou trancar um local do campus por 24 horas." }
      }
    }
  },
  {
    name: "Os Músicos da Banda de Garagem (Indie / Rockers)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/musicos.webp",
    system: {
      descricao: "\"Três acordes, uma bateria furada e mais verdade do que qualquer aula que você já teve.\"",
      visaoDeFora: "Cheiram a café barato, carregam capas de guitarra pesadas para todo canto e passam o intervalo discutindo bandas obscuras dos anos 90. Parecem desligados, mas quando eles entram na garagem e o som começa, todo mundo quer chegar perto da janela para ouvir.",
      vitalidadeBase: 12,
      conflitoInternoBase: 11,
      reputacaoBase: 3,
      triboRival: "Os Festeiros / Frat Boys",
      bonusTalento: "+1 em Performance e +1 em Malandragem (ou +2 em Performance)",
      habilidades: {
        nivel1: { nome: "Acorde Certo", descricao: "Suas músicas traduzem sentimentos que palavras normais não conseguem. Você pode usar Performance no lugar de Lábia ou Acolhimento se estiver com um instrumento em mãos." },
        nivel4: { nome: "Trilha Sonora Humana", descricao: "Você sabe ler a energia do ambiente através do ritmo. Recebe +2 em testes de Intuição Social quando estiver em festas, shows ou ambientes barulhentos." },
        nivel7: { nome: "O Hino da Galera", descricao: "Uma vez por história, ao tocar uma música autoral em um evento grande, você pode conceder 1 Ponto de Hype imediato para todos os aliados presentes na cena." },
        nivel9: { nome: "O Show Inesquecível", descricao: "Você realiza um show que concede a todos os presentes um bônus de +2 na barra de Reputação temporária para o fim de semana." }
      }
    }
  },
  {
    name: "Os Festeiros / Galera das Fraternidades (Party Animals)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/festeiros.webp",
    system: {
      descricao: "\"A vida é curta demais para passar a noite de sexta dormindo.\"",
      visaoDeFora: "Os primeiros a chegar na festa e os últimos a ir embora. Sabem onde estão as melhores bebidas, conhecem todo mundo na porta dos clubes e não levam nada a sério. São irresponsáveis ao extremo, só que é impossível ter uma noite entediante do lado deles.",
      vitalidadeBase: 13,
      conflitoInternoBase: 9,
      reputacaoBase: 4,
      triboRival: "Os Músicos da Banda de Garagem",
      bonusTalento: "+1 em Tolerância e +1 em Sedução Sutil (ou +2 em Tolerância)",
      habilidades: {
        nivel1: { nome: "Fazer Amigos no Banheiro", descricao: "Você faz contatos instantâneos em ambientes festivos. Recebe +2 em Lábia e Intuição Social dentro de festas, baladas ou aglomerações." },
        nivel4: { nome: "Fazer Curar a Ressaca", descricao: "Seu corpo é acostumado aos desafios. Você ignora as penalidades da primeira rolagem da mecânica de Manhã Seguinte após um evento noturno." },
        nivel7: { nome: "O Rei/A Rainha da Noite", descricao: "Uma vez por história, você pode transformar qualquer reunião pacata em uma festa lendária, garantindo a todos os presentes +1 em rolagens sociais durante aquele evento." },
        nivel9: { nome: "A Festa Lendária", descricao: "Você organiza um evento que dobra a taxa de recuperação de Vitalidade e Conflito Interno de todos os participantes e zera o estresse da Manhã Seguinte." }
      }
    }
  },
  {
    name: "Os Acomodados / De Boa (Slackers / Casuals)",
    type: "tribo",
    img: "systems/imintoyou/assets/tribos/acomodados.webp",
    system: {
      descricao: "\"Para que o estresse? No final, tudo se ajeita do jeito que tem que ser.\"",
      visaoDeFora: "Sentam no meio da sala, não se metem em briga de tribo, não ligam para popularidade e parecem flutuar pela rotina do colégio sem pressa. Parecem sem ambição para alguns, mas são os únicos que conseguem escapar das balas no meio dessa guerra de egos.",
      vitalidadeBase: 11,
      conflitoInternoBase: 13,
      reputacaoBase: 2,
      triboRival: "Os Artistas / Pessoal do Teatro",
      bonusTalento: "+1 em Autocontrole e +1 em Percepção (ou +2 em Autocontrole)",
      habilidades: {
        nivel1: { nome: "Inofensivo", descricao: "Ninguém te vê como uma ameaça. Testes de Furtividade Social para evitar ser puxado para brigas, discussões ou drama alheio ganham +2 de bônus." },
        nivel4: { nome: "Mente Aberta", descricao: "Como você não liga para rótulos, você ignora as penalidades de Desvantagem ao realizar testes de Empatia contra membros de qualquer Tribo Rival." },
        nivel7: { nome: "Muro de Concreto", descricao: "Quando alguém tenta atacar o seu Conflito Interno através de ofensas, chantagens ou provocações, você reduz o dano sofrido nessa barra pela metade." },
        nivel9: { nome: "A Paz Inabalável", descricao: "Você se recusa a entrar em um Confronto ou briga e sua calma irritante faz com que o agressor receba 5 pontos de Conflito Interno pelo próprio constrangimento." }
      }
    }
  }
];

/**
 * Mapeamento estruturado do "Bônus de Talento" de cada Tribo (Cap. 3.1),
 * usado pelo Assistente de Criação de Personagem para aplicar automaticamente
 * a escolha do jogador (+1/+1 em dois talentos OU +2 em um só — o primeiro
 * da lista é sempre o "principal" usado no modo +2).
 */
export const BONUS_TALENTO_TRIBO = {
  "Os Atletas (Jocks)": [
    { char: "atletismo", talent: "esportes" },
    { char: "vigor", talent: "resistencia" }
  ],
  "As Garotas Populares / Patricinhas (Preps)": [
    { char: "presenca", talent: "labia" },
    { char: "estilo", talent: "postura" }
  ],
  "Os Nerds / Geeks": [
    { char: "sagacidade", talent: "investigacao" },
    { char: "sagacidade", talent: "conhecimento" }
  ],
  "Os Alternativos / Emos / Góticos": [
    { char: "estilo", talent: "autocontrole" },
    { char: "presenca", talent: "performance" }
  ],
  "Os Rebeldes / Bad Boys & Girls": [
    { char: "sagacidade", talent: "malandragem" },
    { char: "presenca", talent: "intimidacao" }
  ],
  "Os Artistas / Pessoal do Teatro (Theater Kids)": [
    { char: "presenca", talent: "performance" },
    { char: "presenca", talent: "labia" }
  ],
  "O Conselho Estudantil / Os Certinhos (Overachievers)": [
    { char: "sagacidade", talent: "conhecimento" },
    { char: "empatia", talent: "mediacao" }
  ],
  "Os Músicos da Banda de Garagem (Indie / Rockers)": [
    { char: "presenca", talent: "performance" },
    { char: "sagacidade", talent: "malandragem" }
  ],
  "Os Festeiros / Galera das Fraternidades (Party Animals)": [
    { char: "vigor", talent: "tolerancia" },
    { char: "estilo", talent: "seducaoSutil" }
  ],
  "Os Acomodados / De Boa (Slackers / Casuals)": [
    { char: "estilo", talent: "autocontrole" },
    { char: "sagacidade", talent: "percepcao" }
  ]
};
