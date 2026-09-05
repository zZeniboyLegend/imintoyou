/**
 * Tabelas Geradoras do Capítulo 6 do livro — o "Kit de Emergência do
 * Mestre". Cada entrada aqui vira uma RollTable nativa do Foundry
 * (aparece na aba padrão de Tabelas, com o botão "Draw" de sempre).
 *
 * "grupo" define em qual subpasta a tabela entra ao ser importada:
 * "npc" -> subpasta "Gerador de NPCs de Corredor"
 * null  -> direto na pasta raiz "I'm Into You"
 */
export const TABELAS_PADRAO = [
  {
    name: "6.1 — Nome e Sobrenome",
    grupo: "npc",
    formula: "1d20",
    resultados: [
      [1, 1, "Chad Miller"], [2, 2, "Tyler Brody"], [3, 3, "Seth Cohen"], [4, 4, "Travis Barker"],
      [5, 5, "Logan Echolls"], [6, 6, "Austin Reed"], [7, 7, "Justin Taylor"], [8, 8, "Brandon Walsh"],
      [9, 9, "Sean Cameron"], [10, 10, "Dean Forester"], [11, 11, "Britney Collins"], [12, 12, "Chloe Vance"],
      [13, 13, "Summer Roberts"], [14, 14, "Haley James"], [15, 15, "Peyton Sawyer"], [16, 16, "Brooke Davis"],
      [17, 17, "Ashley Spinelli"], [18, 18, "Paris Geller"], [19, 19, "Lana Lang"], [20, 20, "Veronica Mars"]
    ]
  },
  {
    name: "6.1 — Tribo Social",
    grupo: "npc",
    formula: "1d20",
    resultados: [
      [1, 2, "Os Atletas (Jocks)"],
      [3, 4, "As Garotas Populares / Patricinhas (Preps)"],
      [5, 6, "Os Nerds / Geeks"],
      [7, 8, "Os Alternativos / Emos / Góticos"],
      [9, 10, "Os Rebeldes / Bad Boys & Girls"],
      [11, 12, "Os Artistas / Pessoal do Teatro (Theater Kids)"],
      [13, 14, "O Conselho Estudantil / Os Certinhos (Overachievers)"],
      [15, 16, "Os Músicos da Banda de Garagem (Indie / Rockers)"],
      [17, 18, "Os Festeiros / Galera das Fraternidades (Party Animals)"],
      [19, 20, "Os Acomodados / De Boa (Slackers / Casuals)"]
    ]
  },
  {
    name: "6.1 — Segredo do NPC",
    grupo: "npc",
    formula: "1d20",
    resultados: [
      [1, 1, "Bateu o carro do pai no fim de semana e está escondendo a amassada na garagem."],
      [2, 2, "Escreve uma coluna anônima de fofocas na internet e morre de medo de ser descoberto."],
      [3, 3, "Está reprovando em duas matérias e pode perder a bolsa no final do mês."],
      [4, 4, "Tem uma paixão secreta por alguém da Tribo Rival e envia bilhetes anônimos."],
      [5, 5, "Roubou o gabarito da prova de História e está vendendo cópias no banheiro."],
      [6, 6, "Foi expulso da escola anterior por causa de um trote que deu errado."],
      [7, 7, "Trabalha à noite em uma lanchonete 24h para ajudar a pagar as contas de casa."],
      [8, 8, "Falsificou a assinatura dos pais na autorização para a viagem do colégio."],
      [9, 9, "Viu o diretor da escola conversando de forma suspeita com um rival na semana passada."],
      [10, 10, "Mentiu para todos sobre ser rico; sua família vive de aparências em um bairro modesto."],
      [11, 11, "É a voz misteriosa por trás de uma rádio pirata universitária da cidade."],
      [12, 12, "Guarda fotos constrangedoras do capitão do time e pensa em usá-las como chantagem."],
      [13, 13, "Deixou cair a chave do almoxarifado na festa e não sabe onde ela foi parar."],
      [14, 14, "Está saindo em segredo com o par do seu melhor amigo."],
      [15, 15, "Pretende fugir de casa no fim de semana para ir a um festival de rock no outro estado."],
      [16, 16, "Tem o CD de uma banda extremamente popular que ainda não foi lançado oficialmente."],
      [17, 17, "Foi quem colocou a bomba de tinta no armário do garoto quieto no mês passado."],
      [18, 18, "Está fingindo uma lesão no joelho para não ter que jogar no campeonato."],
      [19, 19, "Descobriu uma passagem secreta no auditório que dá acesso ao telhado da escola."],
      [20, 20, "Possui uma lista detalhada com os podres de quase todos os calouros da escola."]
    ]
  },
  {
    name: "6.1 — Cacoete e Vício Visual",
    grupo: "npc",
    formula: "1d20",
    resultados: [
      [1, 1, "Masca chiclete de forma barulhenta sem parar."],
      [2, 2, "Checa o flip phone a cada trinta segundos, mesmo sem nenhuma mensagem."],
      [3, 3, "Ajusta os óculos constantemente empurrando pelo meio do indicador."],
      [4, 4, "Tem o fone de ouvido de um MP3 player sempre pendurado em uma das orelhas."],
      [5, 5, "Batuca um ritmo acelerado com as canetas na mesa ou no armário."],
      [6, 6, "Mantém a jaqueta universitária amarrotada presa na cintura."],
      [7, 7, "Mexe no cabelo ou ajusta a franja toda vez que fica nervoso ou vai falar."],
      [8, 8, "Carrega um copo gigante de café térmico para todo canto no pátio."],
      [9, 9, "Anda olhando para o chão, com as mãos fundas nos bolsos do moletom."],
      [10, 10, "Fala rápido demais, gesticulando bastante com as mãos cobertas por luvas sem dedos."],
      [11, 11, "Usa um boné virado para trás e nunca tira, nem dentro da sala de aula."],
      [12, 12, "Sempre tem uma caneta riscando e desenhando símbolos nas próprias mãos."],
      [13, 13, "Morde os lábios ou a ponta da caneta enquanto escuta os outros falarem."],
      [14, 14, "Exala um perfume doce ou cheiro forte de chiclete de morango."],
      [15, 15, "Dá risadinhas sarcásticas antes de responder a qualquer pergunta séria."],
      [16, 16, "Anda sempre de fones gigantes no pescoço, isolando o som ao redor."],
      [17, 17, "Cruza os braços e mantém uma postura defensiva quando abordado."],
      [18, 18, "Esbarra nas coisas ou derruba cadernos por andar distraído lendo."],
      [19, 19, "Usa correntes na calça jeans que fazem barulho a cada passo."],
      [20, 20, "Sustenta um olhar fixo e penetrante que deixa qualquer um desconfortável."]
    ]
  },
  {
    name: "6.1 — Motivação Imediata na Cena",
    grupo: "npc",
    formula: "1d20",
    resultados: [
      [1, 1, "Encontrar uma desculpa rápida para cabular a próxima aula de Educação Física."],
      [2, 2, "Descobrir onde vai ser a grande festa de sábado e conseguir um convite VIP."],
      [3, 3, "Recuperar um caderno com anotações pessoais que esqueceu no refeitório."],
      [4, 4, "Convencer alguém a trocar de lugar no trabalho em grupo de Biologia."],
      [5, 5, "Vender convites para a apresentação da banda ou peça de teatro de sexta."],
      [6, 6, "Saber se o boato que ouviu sobre a Garota Popular é verdade ou mentira."],
      [7, 7, "Pedir um carro emprestado ou uma carona até a lanchonete da cidade."],
      [8, 8, "Evitar ao máximo encontrar seu ex-namorado no corredor principal."],
      [9, 9, "Encontrar um lugar silencioso para estudar antes da prova do próximo bloco."],
      [10, 10, "Pegar dinheiro emprestado para comprar um refrigerante ou salgado na máquina."],
      [11, 11, "Convencer um PJ a entrar no seu clube/comitê escolar para bater a meta."],
      [12, 12, "Descobrir quem deixou um bilhete anônimo no seu armário essa manhã."],
      [13, 13, "Esconder uma garrafa ou item proibido no armário de outra pessoa antes da inspeção."],
      [14, 14, "Fazer as pazes com um amigo com quem brigou na festa de ontem."],
      [15, 15, "Desabafar sobre os problemas em casa com qualquer um disposto a ouvir."],
      [16, 16, "Desafiar alguém para uma aposta fútil e ver quem se dá mal no refeitório."],
      [17, 17, "Conseguir o número de MSN ou telefone do crush através de um PJ."],
      [18, 18, "Impressionar a liderança da sua Tribo Social demonstrando atitude."],
      [19, 19, "Descobrir quem riscou seu carro com chave no estacionamento dos alunos."],
      [20, 20, "Passar despercebido e terminar o dia sem atrair a atenção dos inspetores."]
    ]
  },
  {
    name: "6.2 — Locais Ícone dos Anos 2000",
    grupo: null,
    formula: "1d20",
    resultados: [
      [1, 1, "<strong>Diner / Lanchonete Retrô</strong><br>Estofados de vinil vermelho rasgados, cabines de madeira, jukebox tocando pop-rock, cheiro de hambúrguer e leite condensado, garçonete com avental servindo refil de café em jarras de vidro."],
      [2, 2, "<strong>Pista de Skate Abandonada</strong><br>Pista de concreto cheia de grafites coloridos, latas de refrigerante amassadas, som portátil tocando punk-rock no volume máximo, jovens treinando manobras sob a luz dos postes piscando."],
      [3, 3, "<strong>Porão de Festa de Casa</strong><br>Teto baixo com lâmpadas pisca-pisca soltas, sofás velhos afundados, cheiro de bebida derramada, luzes coloridas de estroboscópio e copos vermelhos de plástico espalhados pelo chão de carpete."],
      [4, 4, "<strong>Loja de Conveniência 24h</strong><br>Luzes fluorescentes zumbindo, cheiro de cachorro-quente de máquina, corredores estreitos com salgadinhos, balcão de acrílico com revistas de fofoca e um atendente entediado assistindo TV de tubo."],
      [5, 5, "<strong>Quarto de Adolescente</strong><br>Paredes cobertas de pôsteres de bandas e filmes colados com fita, computador de tubo piscando o aplicativo de mensagens, luzes de néon roxo, CDs arranhados fora das caixas e roupas jogadas no canto."],
      [6, 6, "<strong>Fliperama / Arcade Zone</strong><br>Ruído ensurdecedor de moedas caindo e efeitos sonoros sintéticos de jogos de luta, carpetes com estampas geométricas neon, máquinas de dança lotadas e luzes negras refletindo nas camisetas."],
      [7, 7, "<strong>Estacionamento da Escola</strong><br>Carros antigos e esportivos com som automotivo alto no porta-malas, jovens encostados nos capôs conversando, fumaça de cigarro escondida atrás do ônibus e o sol da tarde refletindo no asfalto abafado."],
      [8, 8, "<strong>Biblioteca do Campus</strong><br>Fileiras intermináveis de prateleiras de madeira alta, computadores bege pesados para busca de livros, cheiro de papel velho, cantos isolados entre os corredores usados para conversas secretas."],
      [9, 9, "<strong>Arquibancada do Ginásio</strong><br>Estruturas de madeira gigantescas ecoando passos, cheiro de piso encerado, faixas do time da escola penduradas nas vigas do teto e luzes de refletores potentes focadas no centro da quadra."],
      [10, 10, "<strong>Locadora de Filmes / Games</strong><br>Fileiras organizadas de caixas de VHS e DVDs, capas de filmes de terror dos anos 2000 em destaque, TV de tubo no balcão passando o trailer de um lançamento e cheiro de pipoca de micro-ondas."],
      [11, 11, "<strong>Piscina Pública / Clube Local</strong><br>Água azul refletindo o sol forte, espreguiçadeiras de plástico branco, rádio FM tocando os sucessos do verão, cheiro forte de protetor solar de coco e jovens de óculos escuros na borda."],
      [12, 12, "<strong>Loja de Discos / CDs Usados</strong><br>Caixas de madeira repletas de CDs e discos de vinil para garimpar, fones pesados pendurados para escutar faixas no balcão, iluminação amarelada e paredes repletas de autógrafos."],
      [13, 13, "<strong>Cafeteria Universitária</strong><br>Mesas de metal ao ar livre sob a sombra de árvores grandes, copos de papelão com nomes escritos de caneta, jovens com notebooks pesados e o som de violão acústico de fundo."],
      [14, 14, "<strong>Telhado do Bloco Escolar</strong><br>Vento forte, vista panorâmica de toda a cidade e do campo de futebol, cascalho solto no chão, pichações discretas com iniciais de casais e o lugar perfeito para conversas a sós sem inspetores."],
      [15, 15, "<strong>Píer / Beira do Lago</strong><br>Madeira antiga rangendo com a água, fogueira improvisada na areia/cascalho, latas de bebida fria em isopores e o som das ondas suaves ao entardecer sob um céu alaranjado."],
      [16, 16, "<strong>Shopping Center (Praça de Alimentação)</strong><br>Mesas de fórmica brilhantes sob uma claraboia de vidro gigante, o som distante das lojas de departamento, jovens circulando em grupos e o cheiro forte de canela e fast-food."],
      [17, 17, "<strong>Vestiário dos Atletas</strong><br>Fileiras de armários de metal cinza com trincos barulhentos, bancos de madeira cumpridos, cheiro de desodorante spray e piso de azulejo frio ainda úmido dos chuveiros."],
      [18, 18, "<strong>Auditório do Colégio</strong><br>Camadas de poltronas de veludo vermelho encarando um palco de madeira largo, cortinas pesadas e escuras nas laterais, eco profundo e cheiro de mofo suave no ar estático."],
      [19, 19, "<strong>Parque de Diversões Local</strong><br>Roda-gigante iluminada contra o céu noturno, barracas de jogos com bichos de pelúcia gigantes, cheiro de algodão-doce e maçã do amor, ao som de gritos na montanha-russa de ferro."],
      [20, 20, "<strong>Posto de Gasolina na Rota de Saída</strong><br>Um oásis isolado sob holofotes brancos potentes no meio da noite, bombas de combustível antigas, poças de óleo no chão e um telefone público pendurado ao lado da conveniência."]
    ]
  },
  {
    name: "6.3 — Boatos e Fofocas de Corredor",
    grupo: null,
    formula: "1d20",
    resultados: [
      [1, 1, '<strong>"O capitão do time pagou alguém da biblioteca para fazer a redação final dele."</strong><br>Se investigado e confirmado, o Atleta perde -2 de Reputação; desmentir publicamente concede +1 de Reputação.'],
      [2, 2, '<strong>"Duas garotas da Tribo Popular saíram no tapa no banheiro por causa do mesmo garoto."</strong><br>Eleva o estresse no banheiro; qualquer teste social naquele local sofre -1 de penalidade devido ao tumulto.'],
      [3, 3, '<strong>"O professor de História vai fazer uma chamada oral surpresa no próximo bloco."</strong><br>Os PJs que ouvirem o boato podem passar num teste de Sagacidade (DF 10) para estudar a tempo e ganhar +2 na prova.'],
      [4, 4, '<strong>"Alguém deixou uma foto comprometedora dentro do livro de Biologia da biblioteca."</strong><br>Quem encontrar a foto ganha um Ganchinho de Chantagem contra o NPC afetado.'],
      [5, 5, '<strong>"A festa de sábado na casa do lago foi cancelada porque a polícia descobriu."</strong><br>Gera pânico entre os Festeiros; desmentir o boato exige um teste de Presença + Lábia (DF 15) para reestabelecer a festa.'],
      [6, 6, '<strong>"A garota nova da sala de Artes é na verdade herdeira de uma família milionária."</strong><br>Aumenta o interesse na novata; testes de Sedução Sutil ou Lábia contra ela recebem Vantagem na semana.'],
      [7, 7, '<strong>"O vocalista da banda de garagem vai terminar com a namorada no meio do show."</strong><br>O show de sexta vira um evento de alta tensão; o Conflito Interno dos envolvidos sobe em +2.'],
      [8, 8, '<strong>"O diretor da escola foi visto discutindo feio com o pai de um aluno no estacionamento."</strong><br>Revela uma vulnerabilidade na administração; abre oportunidade para o Conselho Estudantil negociar favores.'],
      [9, 9, '<strong>"A lista dos calouros mais atraentes da escola foi impressa e pregada no mural principal."</strong><br>Os citados na lista ganham +1 de Reputação temporária, mas sofrem a inveja das Tribos Rivais.'],
      [10, 10, '<strong>"Alguém hackeou o rádio da escola e vai tocar uma gravação secreta no intervalo."</strong><br>Cria contagem regressiva; os PJs têm até o sinal tocar para encontrar o responsável e impedir ou garantir a transmissão.'],
      [11, 11, '<strong>"O astro do time de basquete está jogando lesionado e escondeu o laudo do treinador."</strong><br>Se a informação for usada contra ele em jogo, o Atleta sofre Desvantagem em testes de Autocontrole.'],
      [12, 12, '<strong>"Duas pessoas de Tribos rivais foram vistas aos beijos atrás do ginásio às 22h."</strong><br>Gera especulação; expor o casal reduz a relação deles na Escala de Afeto em -1, mas gera caos social.'],
      [13, 13, '<strong>"A prova final de Química vazou no grupo de bate-papo da internet de madrugada."</strong><br>PJs podem tentar conseguir o arquivo (arriscando a Reputação) para garantir sucesso automático na prova.'],
      [14, 14, '<strong>"O baixista da banda está vendendo convites falsos para o festival da cidade."</strong><br>Se revelado pela Tribo dos Nerds ou Jornalismo, o vendedor perde -3 de Reputação e ganha um rival.'],
      [15, 15, '<strong>"Uma das Patricinhas foi pega furtando maquiagem na loja do centro e usou o nome da amiga."</strong><br>Cria um conflito velado; a vítima da mentira ganha autorização para iniciar um Confronto Social grátis.'],
      [16, 16, '<strong>"O garoto quieto da última fileira guarda um diário com notas secretas sobre todos da sala."</strong><br>Quem roubar o diário ganha +2 em testes de Investigação contra qualquer colega de classe.'],
      [17, 17, '<strong>"O comitê do baile vai cortar a verba da decoração para pagar um DJ famoso da capital."</strong><br>Revoltada, a Tribo dos Artistas ganha um motivo para protestar, paralisando as atividades do grêmio.'],
      [18, 18, '<strong>"Um veterano foi expulso do campus por tentar vender bebidas para os calouros no vestiário."</strong><br>Aumenta a vigilância dos inspetores; testes de Furtividade Social no campus sofrem -2 de penalidade.'],
      [19, 19, '<strong>"Dizem que se você mandar uma mensagem para o número secreto, ele descobre o segredo de qualquer um."</strong><br>Ativa uma lenda urbana tecnológica; usar o número consome 1 Ponto de Hype, mas entrega uma pista real.'],
      [20, 20, '<strong>"Dois PJs foram vistos discutindo aos gritos no estacionamento e a amizade deles acabou."</strong><br>Mesmo se for mentira, o boato coloca a relação dos dois à prova, adicionando +1 de Conflito Interno em ambos.']
    ]
  },
  {
    name: "6.4 — Eventos de Festa (House Party)",
    grupo: null,
    formula: "1d20",
    resultados: [
      [1, 1, "<strong>A Polícia Chegou!</strong><br>Sirenes piscam do lado de fora. Todos devem fazer um teste de Atletismo + Agilidade (DF 15) para pular a cerca ou Estilo + Furtividade Social (DF 15) para se esconder no porão."],
      [2, 2, "<strong>Alguém Caiu na Piscina com Roupas</strong><br>Risadas e gritos ao redor da água. O atingido perde a pose e precisa passar num teste de Estilo + Postura (DF 15) para não perder -1 de Reputação."],
      [3, 3, "<strong>Desafio do Barril de Cerveja / Aposta</strong><br>Uma multidão se junta ao redor para ver quem aguenta mais tempo plantando bananeira no barril. Exige teste de Vigor + Tolerância (DF 15) para virar o herói da noite e ganhar 1 Ponto de Hype."],
      [4, 4, "<strong>Apagão Geral na Casa</strong><br>A energia cai de repente e o som para. O pânico e as risadas dominam o escuro. Testes de Sedução Sutil ou aproximação amorosa ganham Vantagem durante as luzes apagadas."],
      [5, 5, "<strong>O Ex-Namorado Ciumento Chegou</strong><br>Um NPC influente da Tribo dos Atletas ou Rebeldes entra na festa procurando o PJ que está conversando com seu ex. Inicia um Confronto Social ou uma briga iminente."],
      [6, 6, "<strong>A Playlist Mudou para Pop-Punk Acelerado</strong><br>O Tom da Cena muda para Pop-Punk. Todos ganham +2 em testes de Provocação e Tolerância."],
      [7, 7, "<strong>Guerra de Copos no Quintal</strong><br>A brincadeira sai do controle e vira uma guerra de copos e projéteis no gramado. Exige Atletismo + Agilidade (DF 10) para desviar e não sujar a roupa."],
      [8, 8, "<strong>Invasão da Tribo Rival</strong><br>Um grupo da Tribo Rival entra na festa sem ser convidado e toma a mesa principal. A tensão sobe; testes de Empatia no local sofrem Desvantagem."],
      [9, 9, "<strong>A Dança na Mesa da Sala</strong><br>Alguém sobe na mesa de centro para dançar e chama atenção de todos. Passar num teste de Presença + Performance (DF 15) concede +1 de Reputação imediato."],
      [10, 10, "<strong>Confissão no Quarto de Hóspedes</strong><br>Um PJ encontra um amigo chorando ou desabafando sozinho em um dos quartos trancados da casa. Oportunidade perfeita para usar o bônus de Acolhimento."],
      [11, 11, "<strong>O Objeto Valioso Quebrou</strong><br>O vaso caro ou a TV dos donos da casa é destruída. Quem estiver perto precisa passar num teste de Lábia (DF 15) para não ser culpado pelo prejuízo."],
      [12, 12, '<strong>Roda de "Verdade ou Desafio"</strong><br>Um grupo em círculo chama os PJs para jogar. Recusar aumenta o Conflito Interno em +1; aceitar força revelar um Segredo ou cumprir um desafio perigoso.'],
      [13, 13, "<strong>A Bateria do Rádio Acabou</strong><br>O som morre e a festa ameaça esfriar. Um teste de Sagacidade + Conhecimento/Malandragem (DF 15) conserta o som e salva a noite, garantindo gratidão da galera."],
      [14, 14, "<strong>O Beijo Roubado na Sacada</strong><br>A luz da lua no quintal cria o momento perfeito. Testes de aproximação amorosa têm sua Dificuldade reduzida em 5 pontos."],
      [15, 15, "<strong>Bebida Errada no Copo</strong><br>Alguém misturou ingredientes duvidosos no ponche. Faça um teste de Vigor + Tolerância (DF 15); falhar causa a penalidade de Ressaca imediatamente."],
      [16, 16, "<strong>Um Espectador Indesejado</strong><br>O professor ou inspetor de alunos passou de carro bem na frente da casa e tirou uma foto da aglomeração na calçada."],
      [17, 17, "<strong>A Briga no Estacionamento</strong><br>Duas pessoas começam a se empurrar perto dos carros. A multidão corre para ver e gritar. PJs podem usar Mediação para separar ou Provocação para incentivar."],
      [18, 18, "<strong>Projeção de Filme de Terror no Telhado</strong><br>Um grupo mais calmo montou um projetor no quintal ou telhado para ver filmes. É o Tom de Cena ideal para aproximações intimistas e conversas sinceras."],
      [19, 19, "<strong>O Carro do Pai Chegou para Buscar</strong><br>Os pais rígidos de um dos PJs ou NPCs surgem na porta buzinando, criando um vexame público. Exige Estilo + Postura (DF 15) para sair com dignidade."],
      [20, 20, "<strong>O Momento Lendário da Noite</strong><br>Todos os fatores se alinham: a música perfeita toca, todos estão felizes e a iluminação está incrível. Todos os PJs na festa recuperam 1 Ponto de Hype!"]
    ]
  }
];
