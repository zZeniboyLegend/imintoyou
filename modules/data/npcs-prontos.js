/**
 * NPCs Prontos para importação em lote. 17 "Personagens" (com Tribo Social,
 * Vínculos e Segredo) — incluindo Newth Halloway e Gwen Mallory, os
 * exemplos do próprio livro (Cap. 4) — e 5 "Professores" (tipo NPC, sem
 * Tribo, cobrindo áreas de ensino diferentes).
 *
 * Campos de talents/characteristics podem ser esparsos: qualquer talento
 * não listado é preenchido com 0 automaticamente pelo template.json.
 */

export const PERSONAGENS_PRONTOS = [
  // --- Exemplos do próprio livro (Cap. 4) ---
  {
    name: "Newth Halloway",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Atletas (Jocks)",
    characteristics: { presenca: 2, sagacidade: 0, estilo: 1, vigor: 2, atletismo: 2, empatia: 0 },
    talents: {
      presenca: { labia: 1, provocacao: 1 },
      estilo: { postura: 1 },
      vigor: { resistencia: 2, folego: 1 },
      atletismo: { esportes: 3 }
    },
    background: {
      historico: "Filho de um ex-atleta local, Newth cresceu sob a pressão de ser perfeito nos esportes. É amigável, confiante por fora, mas carrega o peso de ter que sustentar o legado da família.",
      sonho: "Conseguir uma bolsa de estudos integral de esportes na universidade dos seus sonhos.",
      medo: "Sofrer uma lesão definitiva ou decepcionar o pai ao demonstrar que tem dúvidas sobre seu próprio futuro.",
      aparencia: "Alto, físico atlético, cabelos loiros levemente desalinhados e sorriso fácil.",
      estiloVisual: "Quase sempre vestindo a jaqueta universitária do time de baseball com o número 12, jeans levemente desbotado e tênis esportivo clássico branco."
    },
    vinculos: [
      { alvo: "Gwen Mallory", tipo: "romance", descricao: "Presto atenção em como a Gwen é inteligente e adoraria ter coragem de chamá-la para sair sem o pessoal do time zoar." },
      { alvo: "o capitão do time rival", tipo: "rivalidade", descricao: "Sinto que o capitão do time rival está tentando me desestabilizar fora de campo." }
    ],
    segredo: "No último exame médico, o médico alertou que meu ombro direito está lesionado e que eu deveria parar de rebater nesta temporada, mas escondi o laudo de todos."
  },
  {
    name: "Gwen Mallory",
    img: "icons/svg/mystery-man.svg",
    triboName: "O Conselho Estudantil / Os Certinhos (Overachievers)",
    characteristics: { presenca: 1, sagacidade: 3, estilo: 1, vigor: 0, atletismo: 0, empatia: 2 },
    talents: {
      presenca: { labia: 1 },
      sagacidade: { investigacao: 2, percepcao: 1 },
      estilo: { autocontrole: 1 },
      empatia: { deteccaoMentira: 1, intuicaoSocial: 1, mediacao: 2 }
    },
    background: {
      historico: "Filha de professores acadêmicos, Gwen sempre foi observadora. Ela prefere ficar atrás da câmera ou do teclado do que no centro das atenções, usando o jornal da escola como seu campo de ação.",
      sonho: "Ganhar um prêmio de jornalismo jovem com uma matéria investigativa bombástica e ser aceita em uma faculdade de prestígio.",
      medo: "Ser vista como uma garota fria e sem sentimentos, ou ser ridicularizada e marginalizada pelas garotas populares.",
      aparencia: "Postura ereta, olhos atentos, cabelos pretos bem longos com franja retinha e óculos de armação fina.",
      estiloVisual: "Camisas xadrez sobrepostas, saias plissadas ou calças de alfaiataria confortáveis, coturnos e uma bolsa de lona cheia de broches de bandas e bloquinhos de anotação."
    },
    vinculos: [
      { alvo: "a diretoria", tipo: "outro", descricao: "Desconfio que a diretoria está desviando verbas do clube de jornalismo para cobrir os custos do time de basquete." },
      { alvo: "seu melhor amigo do grupo dos nerds", tipo: "amizade", descricao: "Prometi defender meu melhor amigo do grupo dos nerds contra qualquer bullying dos veteranos." }
    ],
    segredo: "Fui eu quem hackeou o e-mail da coordenação no semestre passado para descobrir o gabarito das provas e passei para três alunos sob anonimato."
  },

  // --- Cobertura das 10 Tribos (8 novos) ---
  {
    name: "Madison Cole",
    img: "icons/svg/mystery-man.svg",
    triboName: "As Garotas Populares / Patricinhas (Preps)",
    characteristics: { presenca: 3, sagacidade: 1, estilo: 2, vigor: 0, atletismo: 1, empatia: 0 },
    talents: {
      presenca: { labia: 3, provocacao: 1 },
      sagacidade: { percepcao: 1 },
      estilo: { postura: 2, seducaoSutil: 1 },
      atletismo: { agilidade: 1 }
    },
    background: {
      historico: "Filha de uma ex-rainha do baile da cidade, Madison cresceu ouvindo que popularidade é a única moeda que realmente importa.",
      sonho: "Ser coroada Rainha do Baile de Formatura e conseguir uma vaga de intercâmbio na Califórnia.",
      medo: "Perder a posição no topo da hierarquia social e virar motivo de piada nos corredores.",
      aparencia: "Loira, sorriso perfeito, sempre impecavelmente maquiada.",
      estiloVisual: "Roupas de grife discretamente ostentosas, bolsa de grife, salto alto mesmo pra ir à escola."
    },
    vinculos: [
      { alvo: "Gwen Mallory", tipo: "rivalidade", descricao: "Odeio como todo mundo elogia a \"jornalista nerd\" só porque ela expôs um boato meu ano passado." },
      { alvo: "seu grupo de seguidoras", tipo: "amizade", descricao: "Prometi proteger minha melhor amiga de qualquer humilhação pública, custe o que custar." }
    ],
    segredo: "Uso um aplicativo de edição pra apagar todas as marcas de expressão das minhas fotos antes de postar — tenho pavor que descubram que não sou naturalmente assim."
  },
  {
    name: "Kevin Park",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Nerds / Geeks",
    characteristics: { presenca: 0, sagacidade: 4, estilo: 0, vigor: 1, atletismo: 0, empatia: 2 },
    talents: {
      sagacidade: { investigacao: 3, conhecimento: 3 },
      vigor: { resistencia: 1 },
      empatia: { deteccaoMentira: 1, intuicaoSocial: 1 }
    },
    background: {
      historico: "Filho de imigrantes que trabalham dobrado pra pagar a escola particular dele, Kevin sente um peso enorme de não poder decepcioná-los.",
      sonho: "Ganhar a bolsa integral de um programa de ciência da computação de elite.",
      medo: "Que a pressão dos pais e as poucas amizades reais façam ele explodir um dia.",
      aparencia: "Magro, óculos grossos, sempre com um notebook debaixo do braço.",
      estiloVisual: "Camisetas de referências geek, mochila cheia de pins e cabos soltos."
    },
    vinculos: [
      { alvo: "Newth Halloway", tipo: "amizade", descricao: "Ajudo o Newth escondido com os trabalhos de Química pra manter ele elegível pro time — e ele finge que não sabe que eu sei do segredo dele." },
      { alvo: "clube de robótica", tipo: "outro", descricao: "Nosso clube pode perder a verba pro time de futebol este ano, e isso me tira o sono." }
    ],
    segredo: "Fui eu quem descobriu a falha de segurança no sistema da escola, mas não contei pra ninguém porque uso ela pra checar minhas próprias notas antes da hora."
  },
  {
    name: "Raven Ashworth",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Alternativos / Emos / Góticos",
    characteristics: { presenca: 1, sagacidade: 1, estilo: 3, vigor: 1, atletismo: 0, empatia: 1 },
    talents: {
      presenca: { performance: 2 },
      sagacidade: { conhecimento: 1 },
      estilo: { autocontrole: 3, seducaoSutil: 1 },
      vigor: { tolerancia: 1 },
      empatia: { acolhimento: 1 }
    },
    background: {
      historico: "Raven cresceu se sentindo deslocada em qualquer ambiente 'normal' e encontrou identidade real só depois que descobriu a cena alternativa da cidade.",
      sonho: "Lançar um EP autoral antes de se formar.",
      medo: "Que alguém descubra o blog e ache que ela é 'fake' por escrever sobre dores que finge esconder tão bem.",
      aparencia: "Cabelo tingido de roxo escuro, delineador pesado, sempre com fones enormes no pescoço.",
      estiloVisual: "Jaqueta jeans cheia de pins de bandas, botas pretas gastas, camiseta larga."
    },
    vinculos: [
      { alvo: "uma banda local", tipo: "outro", descricao: "Estou tentando entrar pra banda mas tenho pavor de tocar na frente de gente que eu não conheço." },
      { alvo: "Madison Cole", tipo: "rivalidade", descricao: "A Madison vive tentando me constranger no corredor só porque eu não sigo o padrão dela." }
    ],
    segredo: "Escrevo um blog anônimo de poesia que, sem querer, já expôs segredos de meio colégio sem que ninguém soubesse que era eu."
  },
  {
    name: "Dante Reyes",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Rebeldes / Bad Boys & Girls",
    characteristics: { presenca: 2, sagacidade: 1, estilo: 1, vigor: 1, atletismo: 2, empatia: 0 },
    talents: {
      presenca: { intimidacao: 2, provocacao: 1 },
      sagacidade: { malandragem: 2 },
      estilo: { postura: 1 },
      vigor: { tolerancia: 1 },
      atletismo: { forcaBruta: 1, agilidade: 1 }
    },
    background: {
      historico: "Expulso de duas escolas anteriores, Dante age durão pra esconder o quanto tem medo de ser mais uma estatística.",
      sonho: "Provar pro pai que consegue terminar o ano sem se meter em confusão — mesmo que ninguém acredite.",
      medo: "Repetir os mesmos erros do pai dele e nunca sair dessa cidade.",
      aparencia: "Alto, tatuagens caseiras no braço, sempre com uma expressão de poucos amigos.",
      estiloVisual: "Jaqueta de couro surrada, botas pesadas, corrente na calça."
    },
    vinculos: [
      { alvo: "o pai dele", tipo: "outro", descricao: "Meu pai me colocou nessa escola de última chance — se eu for expulso de novo, é reformatório." },
      { alvo: "Kevin Park", tipo: "amizade", descricao: "O Kevin me ajudou escondido uma vez sem pedir nada em troca, e isso eu não esqueço." }
    ],
    segredo: "Fui eu quem picou os pneus do carro do vice-diretor no ano passado — e um professor sabe e usa isso pra me manter na linha."
  },
  {
    name: "Julian Voss",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Artistas / Pessoal do Teatro (Theater Kids)",
    characteristics: { presenca: 3, sagacidade: 1, estilo: 1, vigor: 0, atletismo: 0, empatia: 2 },
    talents: {
      presenca: { performance: 3, labia: 2 },
      sagacidade: { conhecimento: 1 },
      estilo: { postura: 1 },
      empatia: { acolhimento: 1, intuicaoSocial: 1 }
    },
    background: {
      historico: "Filho de uma família tradicional que acha teatro 'só um hobby', Julian usa o palco como a única forma que encontrou de ser visto de verdade.",
      sonho: "Ser aceito numa escola de artes cênicas fora do estado.",
      medo: "Que o pânico de palco vença bem na frente de todo mundo um dia.",
      aparencia: "Traços expressivos, gestos teatrais mesmo fora do palco.",
      estiloVisual: "Camisas com estampas ousadas, lenços, um toque vintage em tudo que veste."
    },
    vinculos: [
      { alvo: "o diretor da peça da escola", tipo: "outro", descricao: "Preciso do papel principal na peça de primavera nem que seja a última coisa que eu faça." },
      { alvo: "Raven Ashworth", tipo: "amizade", descricao: "A Raven é a única que entende meu lado mais sensível sem fazer piada." }
    ],
    segredo: "Ensaio sozinho no auditório vazio à noite porque tenho ataques de pânico antes de qualquer apresentação — e finjo que é só 'nervosismo normal'."
  },
  {
    name: "Skye Monroe",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Músicos da Banda de Garagem (Indie / Rockers)",
    characteristics: { presenca: 2, sagacidade: 2, estilo: 1, vigor: 1, atletismo: 0, empatia: 1 },
    talents: {
      presenca: { performance: 2, provocacao: 1 },
      sagacidade: { malandragem: 2, conhecimento: 1 },
      estilo: { seducaoSutil: 1 },
      vigor: { folego: 1 },
      empatia: { intuicaoSocial: 1 }
    },
    background: {
      historico: "Skye cresceu ouvindo os discos velhos dos pais e decidiu cedo que música seria a única coisa que importa.",
      sonho: "Gravar o primeiro álbum autoral da banda ainda no colégio.",
      medo: "Que a banda se separe antes deles conseguirem qualquer coisa de verdade.",
      aparencia: "Cabelo raspado de um lado, várias correntes no pescoço.",
      estiloVisual: "Camisetas de bandas obscuras, jaqueta remendada à mão."
    },
    vinculos: [
      { alvo: "a banda inteira", tipo: "amizade", descricao: "Prometi aos meus companheiros de banda que a gente vai tocar no festival da cidade nem que eu tenha que arranjar o dinheiro sozinho." },
      { alvo: "Marcus Webb", tipo: "rivalidade", descricao: "Ele vive tentando roubar nossos horários de show pras festas idiotas da fraternidade dele." }
    ],
    segredo: "Vendo covers autorais anonimamente pela internet pra pagar o conserto do meu baixo — e um cara da escola já reconheceu minha voz."
  },
  {
    name: "Marcus Webb",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Festeiros / Galera das Fraternidades (Party Animals)",
    characteristics: { presenca: 2, sagacidade: 0, estilo: 2, vigor: 2, atletismo: 1, empatia: 0 },
    talents: {
      presenca: { labia: 1, intimidacao: 1 },
      estilo: { seducaoSutil: 2, postura: 1 },
      vigor: { tolerancia: 3 },
      atletismo: { agilidade: 1 }
    },
    background: {
      historico: "Filho único de pais super ocupados, Marcus aprendeu cedo que ser o centro das atenções enche o vazio de casa vazia.",
      sonho: "Ser lembrado como quem deu a melhor festa da história da escola.",
      medo: "Que os pais descubram as festas e ele perca a única coisa que o faz se sentir importante.",
      aparencia: "Sorriso fácil, sempre bronzeado, carisma natural.",
      estiloVisual: "Camisas florais abertas, tênis caros, um colar de conchas."
    },
    vinculos: [
      { alvo: "os pais dele", tipo: "outro", descricao: "Meus pais acham que sou um estudante exemplar — se descobrirem as festas que organizo, era o fim." },
      { alvo: "Skye Monroe", tipo: "rivalidade", descricao: "Vivo brigando com a Skye por causa dos horários de festa que atrapalham os shows da banda dela." }
    ],
    segredo: "Sou eu quem organiza e financia as festas ilegais nos fins de semana usando o cartão dos meus pais sem eles saberem."
  },
  {
    name: "Milo Ferreira",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Acomodados / De Boa (Slackers / Casuals)",
    characteristics: { presenca: 0, sagacidade: 2, estilo: 2, vigor: 2, atletismo: 0, empatia: 1 },
    talents: {
      sagacidade: { percepcao: 2, conhecimento: 1 },
      estilo: { autocontrole: 3 },
      vigor: { resistencia: 1, tolerancia: 1 },
      empatia: { mediacao: 1 }
    },
    background: {
      historico: "Milo aprendeu a flutuar por todos os grupos sociais sem nunca escolher um lado, e isso virou parte da identidade dele.",
      sonho: "Viajar o mundo assim que se formar, sem plano nenhum.",
      medo: "Que todo mundo descubra que ele se importa mais do que aparenta.",
      aparencia: "Postura relaxada, sempre com uma expressão tranquila.",
      estiloVisual: "Moletom largo, tênis surrado, boné puxado pra frente."
    },
    vinculos: [
      { alvo: "todo mundo", tipo: "amizade", descricao: "De algum jeito sou amigo de gente de todas as tribos, e gosto de manter assim." },
      { alvo: "Dante Reyes", tipo: "amizade", descricao: "O Dante às vezes desabafa comigo porque sabe que eu não vou julgar nem espalhar." }
    ],
    segredo: "Finjo não ligar pra nada, mas na real tenho um caderno cheio de planos detalhados pro futuro que ninguém pode ver."
  },

  // --- Profundidade extra (7 personagens) ---
  {
    name: "Priya Chandrasekaran",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Atletas (Jocks)",
    characteristics: { presenca: 1, sagacidade: 1, estilo: 1, vigor: 2, atletismo: 2, empatia: 0 },
    talents: {
      presenca: { provocacao: 1 },
      sagacidade: { percepcao: 1 },
      estilo: { postura: 1 },
      vigor: { resistencia: 2, folego: 1 },
      atletismo: { esportes: 3 }
    },
    background: {
      historico: "Filha de imigrantes que sacrificaram tudo pra pagar as aulas de natação dela, Priya sente que precisa ser perfeita o tempo todo.",
      sonho: "Bater o recorde nacional juvenil de natação ainda no colégio.",
      medo: "Que a lesão no ombro a tire da água pra sempre.",
      aparencia: "Magra, ombros fortes, cabelo sempre preso.",
      estiloVisual: "Moletom da equipe de natação, sempre com uma touca por perto."
    },
    vinculos: [
      { alvo: "Newth Halloway", tipo: "rivalidade", descricao: "Disputo com o Newth quem é o atleta mais valioso da escola, mesmo em esportes diferentes." },
      { alvo: "seu técnico de natação", tipo: "outro", descricao: "Meu técnico prometeu me indicar pra seleção nacional se eu bater o recorde da escola." }
    ],
    segredo: "Escondo uma lesão no ombro há meses porque a bolsa de estudos depende de eu continuar competindo."
  },
  {
    name: "Isabela Duarte",
    img: "icons/svg/mystery-man.svg",
    triboName: "As Garotas Populares / Patricinhas (Preps)",
    characteristics: { presenca: 2, sagacidade: 2, estilo: 2, vigor: 0, atletismo: 0, empatia: 1 },
    talents: {
      presenca: { labia: 2, performance: 1 },
      sagacidade: { conhecimento: 2 },
      estilo: { postura: 2, seducaoSutil: 1 },
      empatia: { intuicaoSocial: 1 }
    },
    background: {
      historico: "Isabela aprendeu a jogar o jogo social como um tabuleiro de xadrez, sempre um passo à frente.",
      sonho: "Virar influenciadora de moda em tempo integral após o colégio.",
      medo: "Que descubram o blog anônimo e toda a manipulação por trás dele.",
      aparencia: "Sempre impecável, troca de estilo toda semana.",
      estiloVisual: "Peças de tendência antes de qualquer outra pessoa usar."
    },
    vinculos: [
      { alvo: "Madison Cole", tipo: "rivalidade", descricao: "Disputo com a Madison quem realmente manda no nosso grupo, e ela não sabe que eu sei dos segredos dela." },
      { alvo: "seu blog de moda", tipo: "outro", descricao: "Administro secretamente um perfil de moda com milhares de seguidores fora da escola." }
    ],
    segredo: "O perfil de moda anônimo mais seguido da região é meu, e uso ele pra plantar fofocas que beneficiam minha posição social."
  },
  {
    name: "Oliver Finch",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Nerds / Geeks",
    characteristics: { presenca: 0, sagacidade: 3, estilo: 1, vigor: 1, atletismo: 0, empatia: 2 },
    talents: {
      sagacidade: { conhecimento: 3, investigacao: 2 },
      estilo: { autocontrole: 1 },
      vigor: { tolerancia: 1 },
      empatia: { deteccaoMentira: 1, acolhimento: 1 }
    },
    background: {
      historico: "Oliver é tímido além da conta, e a robótica é o único lugar onde ele se sente realmente competente.",
      sonho: "Vencer a competição nacional de robótica com o time da escola.",
      medo: "Que o bot que ele criou seja descoberto e ele perca a única coisa que o faz se sentir especial.",
      aparencia: "Baixinho, sempre com as mãos sujas de graxa ou tinta de circuito.",
      estiloVisual: "Camiseta do clube de robótica, sempre com ferramentas no bolso."
    },
    vinculos: [
      { alvo: "Kevin Park", tipo: "amizade", descricao: "O Kevin e eu somos praticamente irmãos desde o fundamental — a gente cobre um pelo outro sempre." },
      { alvo: "um professor específico", tipo: "outro", descricao: "Meu professor de robótica é o único adulto que realmente acredita em mim." }
    ],
    segredo: "Fui eu quem programou o bot que vaza as respostas de provas antigas pro grupo de robótica — achei que era só entre a gente."
  },
  {
    name: "Sasha Volkov",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Rebeldes / Bad Boys & Girls",
    characteristics: { presenca: 2, sagacidade: 1, estilo: 2, vigor: 1, atletismo: 1, empatia: 0 },
    talents: {
      presenca: { intimidacao: 3 },
      sagacidade: { malandragem: 2 },
      estilo: { postura: 1, autocontrole: 1 },
      vigor: { tolerancia: 1 },
      atletismo: { agilidade: 1 }
    },
    background: {
      historico: "Sasha imigrou há três anos e usa a postura durona como uma armadura contra o mundo novo à sua volta.",
      sonho: "Formar uma coalizão de estudantes forte o bastante pra mudar as regras da escola.",
      medo: "Ser separada da família por causa de alguma confusão na escola.",
      aparencia: "Postura ereta, olhar desafiador, cabelo raspado de um lado.",
      estiloVisual: "Jaqueta militar surrada, botas de combate."
    },
    vinculos: [
      { alvo: "Dante Reyes", tipo: "romance", descricao: "Tem uma coisa rolando entre mim e o Dante que a gente finge que não é nada na frente dos outros." },
      { alvo: "a diretoria", tipo: "rivalidade", descricao: "A diretoria já me ameaçou de expulsão duas vezes, e eu não vou dar o gostinho de ver isso acontecer." }
    ],
    segredo: "Fui eu quem organizou o protesto anônimo contra o novo código de vestimenta — e ainda não descobriram."
  },
  {
    name: "Zoe Bellamy",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Artistas / Pessoal do Teatro (Theater Kids)",
    characteristics: { presenca: 2, sagacidade: 1, estilo: 2, vigor: 0, atletismo: 0, empatia: 2 },
    talents: {
      presenca: { performance: 3, labia: 1 },
      sagacidade: { conhecimento: 1 },
      estilo: { postura: 1, seducaoSutil: 1 },
      empatia: { acolhimento: 1, intuicaoSocial: 1 }
    },
    background: {
      historico: "Zoe atua desde os 8 anos e sente o peso de ser 'a mais talentosa' o tempo todo.",
      sonho: "Conseguir um papel de verdade num filme antes de se formar.",
      medo: "Que todo mundo perceba que ela morre de medo de ser 'só mediana'.",
      aparencia: "Expressiva, muda de humor visivelmente rápido.",
      estiloVisual: "Roupas de brechó combinadas de um jeito único e pessoal."
    },
    vinculos: [
      { alvo: "Julian Voss", tipo: "amizade", descricao: "Eu e o Julian somos parceiros de cena inseparáveis desde o fundamental." },
      { alvo: "uma diretora de cinema local", tipo: "outro", descricao: "Uma diretora independente da cidade me chamou pra um teste, mas é no mesmo dia da peça da escola." }
    ],
    segredo: "Menti pros meus pais que decidi não fazer o teste de cinema porque tenho medo de decepcionar todo mundo se eu falhar."
  },
  {
    name: "Jonah Pierce",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Músicos da Banda de Garagem (Indie / Rockers)",
    characteristics: { presenca: 1, sagacidade: 1, estilo: 1, vigor: 2, atletismo: 0, empatia: 2 },
    talents: {
      presenca: { performance: 2 },
      sagacidade: { malandragem: 2 },
      estilo: { autocontrole: 1 },
      vigor: { folego: 1, tolerancia: 1 },
      empatia: { acolhimento: 1, intuicaoSocial: 1 }
    },
    background: {
      historico: "Jonah cresceu ouvindo o pai contar histórias de turnê que nunca aconteceram de verdade, e isso o assombra.",
      sonho: "Ver uma música sua tocando no rádio da cidade, nem que seja uma vez só.",
      medo: "Desistir da música puramente por medo, como o pai fez.",
      aparencia: "Quieto, sempre com fones no pescoço, olhar distante.",
      estiloVisual: "Camisa xadrez, tênis surrado, sempre com um caderno de letras no bolso."
    },
    vinculos: [
      { alvo: "Skye Monroe", tipo: "amizade", descricao: "A Skye escreve as letras e eu componho a música — a gente se entende sem precisar falar muito." },
      { alvo: "o pai dele, baterista aposentado", tipo: "outro", descricao: "Meu pai largou a carreira de músico pela família, e eu tenho medo de repetir a história dele ao contrário." }
    ],
    segredo: "Componho as músicas da banda inteira sozinho de madrugada e deixo o crédito ser dividido igual — ninguém sabe o quanto isso me esgota."
  },
  {
    name: "Brianna Castellano",
    img: "icons/svg/mystery-man.svg",
    triboName: "Os Festeiros / Galera das Fraternidades (Party Animals)",
    characteristics: { presenca: 2, sagacidade: 0, estilo: 1, vigor: 2, atletismo: 1, empatia: 1 },
    talents: {
      presenca: { labia: 1, performance: 1 },
      estilo: { seducaoSutil: 2 },
      vigor: { tolerancia: 3 },
      atletismo: { agilidade: 1 },
      empatia: { intuicaoSocial: 1 }
    },
    background: {
      historico: "Brianna cresceu na sombra da fama da irmã mais velha e decidiu que seria ainda mais icônica que ela.",
      sonho: "Ser lembrada como a lenda das festas da escola, superando a irmã.",
      medo: "Que alguém perceba que ela bebe escondido por insegurança, não por diversão.",
      aparencia: "Sorriso magnético, sempre arrumada para sair.",
      estiloVisual: "Vestidos statement, salto alto, brincos grandes."
    },
    vinculos: [
      { alvo: "Marcus Webb", tipo: "romance", descricao: "Eu e o Marcus ficamos toda festa e fingimos que é só brincadeira, mas acho que é mais que isso pra mim." },
      { alvo: "sua irmã mais velha", tipo: "outro", descricao: "Minha irmã mais velha se formou como 'a rainha das festas' e eu sinto que preciso superar a fama dela." }
    ],
    segredo: "Bebo escondido antes até de chegar nas festas porque tenho medo de ficar sem graça se não estiver 'no clima' desde cedo."
  }
];

export const PROFESSORES_PRONTOS = [
  {
    name: "Sr. Alan Whitfield",
    img: "icons/svg/mystery-man.svg",
    papel: "Professor de História — rígido e tradicional, mas justo; adora um debate acalorado em sala.",
    characteristics: { presenca: 2, sagacidade: 3, estilo: 2, vigor: 1, atletismo: 0, empatia: 1 },
    talents: {
      sagacidade: { conhecimento: 3 },
      presenca: { labia: 1, intimidacao: 1 },
      estilo: { postura: 2 },
      vigor: { resistencia: 1 },
      empatia: { mediacao: 1 }
    },
    status: { vitalidade: { value: 10, max: 10 }, conflitoInterno: { value: 3, max: 12 }, reputacao: { value: 4, max: 10 } }
  },
  {
    name: "Sra. Diane Mercer",
    img: "icons/svg/mystery-man.svg",
    papel: "Professora de Química — implacável com quem cola, mas apaixonada de verdade pela matéria.",
    characteristics: { presenca: 1, sagacidade: 4, estilo: 1, vigor: 1, atletismo: 0, empatia: 1 },
    talents: {
      sagacidade: { conhecimento: 3, investigacao: 1 },
      presenca: { labia: 1 },
      estilo: { autocontrole: 1 },
      vigor: { tolerancia: 1 },
      empatia: { deteccaoMentira: 1 }
    },
    status: { vitalidade: { value: 9, max: 9 }, conflitoInterno: { value: 4, max: 13 }, reputacao: { value: 3, max: 10 } }
  },
  {
    name: "Coach Rick Dobbins",
    img: "icons/svg/mystery-man.svg",
    papel: "Treinador do time de Baseball e professor de Educação Física — durão por fora, mentor por dentro.",
    characteristics: { presenca: 3, sagacidade: 1, estilo: 1, vigor: 3, atletismo: 2, empatia: 1 },
    talents: {
      vigor: { resistencia: 2, tolerancia: 1 },
      atletismo: { esportes: 2 },
      presenca: { intimidacao: 2, provocacao: 1 },
      empatia: { acolhimento: 1 }
    },
    status: { vitalidade: { value: 16, max: 16 }, conflitoInterno: { value: 2, max: 9 }, reputacao: { value: 5, max: 10 } }
  },
  {
    name: "Sra. Beatrice Lombardi",
    img: "icons/svg/mystery-man.svg",
    papel: "Professora de Artes — a adulta em quem os alunos mais alternativos realmente confiam.",
    characteristics: { presenca: 2, sagacidade: 2, estilo: 2, vigor: 0, atletismo: 0, empatia: 3 },
    talents: {
      empatia: { acolhimento: 2, intuicaoSocial: 1 },
      presenca: { performance: 2 },
      sagacidade: { conhecimento: 2 },
      estilo: { postura: 2 }
    },
    status: { vitalidade: { value: 8, max: 8 }, conflitoInterno: { value: 3, max: 14 }, reputacao: { value: 4, max: 10 } }
  },
  {
    name: "Sr. Marcus Yun",
    img: "icons/svg/mystery-man.svg",
    papel: "Professor de Matemática — solitário, prefere enigmas a conversas, mas justo e paciente nas notas.",
    characteristics: { presenca: 1, sagacidade: 4, estilo: 1, vigor: 1, atletismo: 0, empatia: 1 },
    talents: {
      sagacidade: { conhecimento: 3, percepcao: 1 },
      presenca: { labia: 1 },
      estilo: { postura: 1 },
      vigor: { resistencia: 1 },
      empatia: { mediacao: 1 }
    },
    status: { vitalidade: { value: 9, max: 9 }, conflitoInterno: { value: 5, max: 13 }, reputacao: { value: 2, max: 10 } }
  }
];
