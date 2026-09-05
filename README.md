# I'm Into You — Sistema para Foundry VTT

Sistema não-oficial para rodar o RPG de mesa "I'm Into You" (autor: Lucas 'zZeniboy', Selo Dicebreakers) dentro do Foundry VTT.

## Status atual: Etapa 19 (v1.0.1) — Imagem de capa do sistema

Adicionada a capa oficial do livro (`assets/capa/capa-sistema.webp`) como imagem do sistema no `system.json` (campos `background` e `media`), pra parar de aparecer o placeholder genérico de d20 na tela de seleção de mundo do Foundry.

## Status atual (anterior): Etapa 18 — Boletim, Mural de Fofocas, Armário com Cadeado e Livro da Amizade

**Boletim** — o diálogo de "Provas de Aula" (`AulasApp`) agora pede também **qual das 6 provas do ano** aquela prova representa; a nota vai pro sussurro do Mestre normalmente, mas também é gravada nas flags do Actor (`flags.imintoyou.boletim.<materia>.prova<N>`). Botão **"📊 Ver Boletim Completo"** no mesmo diálogo abre uma tela de envelope fechado — ao clicar em "Abrir Envelope", revela uma tabela por personagem com as 6 notas de cada matéria e um selo **✅ APROVADO** (ou "⚠️ Em risco") baseado em ter pelo menos 3 notas B ou acima em qualquer combinação de matéria/prova.

**Mural de Fofocas** — botão **"📌 Importar Mural de Fofocas"** (Mestre, diretório de Journals) cria um Journal com permissão de Dono para todos os jogadores. Botão **"📌 Mural de Fofocas"** (todos, diretório de Actors) abre o quadro: post-its arrastáveis, editáveis, com 5 cores à escolha, que qualquer jogador pode adicionar/mover/apagar — sincronizado entre todos os clientes via o próprio documento do Journal (sem precisar de socket customizado). O Mestre só acompanha, não edita via essa tela (mas tem acesso ao Journal como qualquer documento se precisar).

**Armário com Cadeado** — botão **"🔒 Armário com Cadeado"** (Mestre, diretório de Actors) abre um formulário pra escolher o jogador-alvo, opcionalmente definir a combinação de 3 dígitos (ou deixar em branco pra sortear) e o conteúdo revelado (item/bilhete). Dispara só pra tela daquele jogador via socket dedicado; ele gira os discos e testa até acertar — diferente das Provas de Aula, aqui o conteúdo é mostrado direto pro jogador ao abrir (não é segredo do Mestre).

**Livro da Amizade** — mesmo modelo de permissão do Mural de Fofocas (Journal com Dono pra todos). Botão **"📷 Importar Livro da Amizade"** (Mestre) cria o Journal; botão **"📷 Livro da Amizade"** (todos) abre o álbum — qualquer jogador escolhe uma imagem (via File Picker do próprio Foundry) e escreve uma legenda, formando um mural de polaroides com o mesmo visual usado no cabeçalho da ficha de personagem.

## Status atual (anterior): Etapa 17 — Provas de Aula (Inglês, Química, Matemática, Educação Física)

Mecânica nova (não existe no livro original): minigames interativos de aula, inspirados nos testes de sala de aula do jogo *Bully*. Botão **"📝 Provas de Aula (I'm Into You)"** no topo da aba **Actors** (só o Mestre vê) abre a janela de disparo (`AulasApp`).

**Como funciona:**
- O Mestre escolhe a matéria (Inglês, Química, Matemática ou Educação Física), o idioma das palavras (só pra Inglês — Português ou Inglês real, escolhido por sessão) e a duração em segundos (com o tempo padrão já preenchido, mas alterável a cada disparo). Educação Física não usa duração corrida — são sempre 5 estações de 1 tentativa cada.
- Ao clicar em "Iniciar Prova para Todos", um sinal via `game.socket` abre a Application do minigame automaticamente na tela de **todos os jogadores conectados que têm um personagem atribuído** (`game.user.character`) — ao mesmo tempo, cada um na própria tela, sem o Mestre precisar coordenar nada manualmente.
- Cada minigame lê o Talento relevante do personagem (Conhecimento para Inglês/Química/Matemática, Esportes para Educação Física) e converte em "cargas de vantagem" (1 a cada 2 pontos no Talento) — tempo extra, dicas ou vidas bônus, sem facilitar a lógica do desafio em si.
- **O resultado nunca aparece pro jogador.** Ao terminar, a tela só mostra "Prova entregue!" — a nota (F/D/C/B/A/A+) e um texto de sabor (5 variações por nota) vão só como chat **sussurrado para o Mestre**, que decide quando e como narrar a devolução da prova em sessão. Se o jogador fechar a janela sem terminar, o Mestre recebe um sussurro avisando "Não fez a prova" (sem mais nenhum detalhe). Um sino (som padrão do core do Foundry) toca automaticamente pro jogador ao abrir e ao terminar a prova.

**Os 4 minigames:**
- **Inglês** — sopa de letrinhas 5×5 com prazo: forma palavras clicando em letras adjacentes; pontuação por tamanho da palavra. Lista de palavras própria em `modules/data/palavras-pt.js` / `palavras-en.js` (lista curada inicial, ~440 palavras em PT e ~340 em EN — dá pra expandir depois).
- **Química** — bancada de reagentes: arrasta/clica 6 frascos numa ordem-receita que cresce a cada acerto; errar reinicia só aquela receita e desconta ponto da nota final.
- **Matemática** — linha de montagem de equações com dificuldade crescente a cada 3 acertos (soma/subtração → multiplicação → combinada) e sistema de vidas.
- **Educação Física** — circuito de ritmo (QTE): 5 estações com uma barra e uma zona-alvo em movimento, 1 tentativa por estação, clique no momento certo.

Arquitetura em `modules/apps/prova-base.js` (classe base compartilhada: timer, som, cálculo de nota, sussurro pro Mestre) + uma subclasse por matéria + `modules/aulas.js` (registro do socket e disparo) + `modules/apps/aulas-app.js` (janela do Mestre).

## Status atual (anterior): Etapa 16 — Ícones das 10 Tribos Sociais

Cada uma das 10 Tribos Sociais (Item tipo `tribo`) agora tem uma ilustração própria (badge estilo emblema retrô) em vez do ícone genérico padrão do Foundry, aplicada automaticamente por quem importar as Tribos pela primeira vez.

- Imagens em `assets/tribos/` (formato `.webp`, 512×512, ~100KB cada), uma para cada Tribo: `atletas.webp`, `garotas-populares.webp`, `nerds.webp`, `alternativos.webp`, `rebeldes.webp`, `artistas.webp`, `conselho-estudantil.webp`, `musicos.webp`, `festeiros.webp`, `acomodados.webp`.
- Vinculadas via campo `img` em cada entrada de `modules/data/tribos.js` (o mesmo array `TRIBOS_PADRAO` usado pelo botão "Importar Tribos"), então qualquer mundo novo que rodar o importador já recebe os ícones prontos — não precisa de nenhuma ação manual.
- **Atenção:** isso só afeta Tribos importadas a partir de agora. Se você já tem as 10 Tribos importadas num mundo existente, os Items antigos continuam com o ícone genérico até serem recriados (apague os 10 Items de Tribo e rode "Importar Tribos" de novo, ou troque a imagem manualmente em cada ficha).

## Status atual (anterior): Etapa 15 — Automação Técnica (Efeitos Ativos + Combat Tracker)

**Efeitos Ativos** — penalidades/bônus temporários que antes eram só um aviso no chat agora "colam" de verdade na ficha, usando o motor nativo de Active Effects do Foundry:
- Aparecem como **adesivos** logo abaixo do cabeçalho da ficha (Personagem e NPC), visíveis em qualquer aba — ícone, nome, e o texto de duração do livro (ex: "1 semana", "Até ser tratado no hospital"), com leve rotação alternada pra parecer colado à mão.
- Gerados automaticamente por: **Ferimentos Prolongados** (Dano Crítico no Combate Físico, Cap. 8.1 — 5 dos 6 ferimentos já mexem em Características/Talentos de verdade) e **Ressaca Violenta** (Manhã Seguinte, Cap. 3.5 — -2 em Vigor/Atletismo/Sagacidade).
- Adesivos de efeito **permanente** (como a Cicatriz Marcante) ganham uma cor diferente (rosa em vez de mostarda) pra se distinguir dos temporários.
- Clique no adesivo abre a ficha nativa de edição do efeito (pra ajustes finos); o **×** no canto remove na hora.

**Combat Tracker nativo** — o rastreador de combate padrão do Foundry (barra lateral, ordem de turno) agora entende as regras do sistema:
- Botão "Rolar Iniciativa" já usa a fórmula certa: **2d12 + Atletismo + Agilidade**.
- Empates são resolvidos automaticamente pela maior **Presença** (Cap. 8.1), sem precisar o Mestre decidir na mão.
- Isso é complementar à janela de Combate Físico (que resolve ataque x defesa 1 contra 1) — o Combat Tracker entra quando a cena tem 3 ou mais combatentes e é preciso uma ordem de turno de verdade.

## Status atual (anterior): Etapa 14 — Compêndio de Cenários (Journal Entries)

Expande os 20 Locais Ícone dos Anos 2000 (Cap. 6.2) — que hoje já existem como Rollable Table — numa versão rica em formato de Journal, pra consulta rápida na hora de narrar. Botão **"🗺️ Importar Cenários (I'm Into You)"** no topo da aba **Journal Entries** (só o Mestre vê).

- Cria **um único Journal** ("Locais Ícone dos Anos 2000 — I'm Into You") com **20 páginas**, uma por local — usa o índice nativo do Journal do Foundry pra navegar rapidinho entre elas.
- Cada página tem: a descrição atmosférica original, um **Tom de Cena sugerido** (conectando direto com a mecânica do Cap. 3.3 — qual playlist/vibe usar ali) e **2 Ganchos de Cena prontos**, todos amarrados nas mecânicas do sistema (Confronto, Vínculos, Segredos, Reputação, Tribos Rivais).
- Visual próprio nas páginas (papel + títulos no tema do sistema), coerente com o resto do material.

## Status atual (anterior): Etapa 13 — Compêndio de NPCs Prontos

Um "pack" de 22 NPCs completos, prontos pra usar em qualquer mesa, sem precisar criar nada na mão. Botão **"📇 Importar 22 NPCs Prontos (I'm Into You)"** no topo da aba **Actors** (só o Mestre vê).

- **17 Personagens** (com Tribo, Vínculos e Segredo já embutidos, background completo): inclui **Newth Halloway** e **Gwen Mallory**, os exemplos originais do próprio Capítulo 4 do livro, com as fichas exatamente como aparecem lá — mais 15 alunos novos cobrindo as 10 Tribos Sociais (algumas com 2 representantes, pra dar profundidade).
- **5 Professores** (tipo NPC, sem Tribo — cargo/área no campo "Papel"): História, Química, Educação Física (treinador), Artes e Matemática.
- Tudo organizado em pastas: `I'm Into You / NPCs Prontos — Alunos` e `.../ NPCs Prontos — Professores`.
- O importador garante sozinho que as Tribos Sociais já estejam no mundo antes (importa automaticamente se faltar), e nunca duplica quem já foi importado antes (verifica por nome).
- Cada aluno já vem com pelo menos 1 Vínculo apontando pra outro NPC do pacote — dá pra puxar o fio e já ter uma teia social pronta pra jogar.

## Status atual (anterior): Etapa 12 — Uso Estratégico de Reputação

Implementa o Capítulo 3.6 do livro — as 3 formas de usar a Reputação:

- **Impulso Social Imediato**: **Shift+clique** numa rolagem de Presença ou Estilo (na ficha de Personagem ou de NPC) abre um diálogo perguntando quantos pontos de Reputação queimar; o valor escolhido soma direto na rolagem e é descontado da Reputação na hora.
- **Chamado do Holofote**: botão **"🎬 Chamado do Holofote (-5 Reputação)"** na ficha — converte 5 pontos de Reputação e posta no chat um pedido de Gancho Narrativo de Destaque pro Mestre, com uma sugestão sorteada (dilema de liderança, convite exclusivo, intriga familiar, segredo de amigos, evento de grande visibilidade).
- **Presença Dominante**: bônus passivo automático dentro da janela de **Confronto** — quem mantém a Reputação em 5-9 ganha +2 passivo só na Defesa; quem mantém a Reputação no máximo (10) ganha +2 passivo em Ataque **e** Defesa. Aparece detalhado no log da rodada quando se aplica.

Com essa etapa, todas as frentes mecânicas do livro planejadas estão implementadas.

## Status atual (anterior): Etapa 11 — Assistente de Criação de Personagem Guiado

Implementa o Capítulo 4 do livro por inteiro. Botão **"🧭 Criar Personagem Guiado (I'm Into You)"** no topo da aba **Actors** (disponível para qualquer jogador, não só o Mestre). Abre uma janela com os 6 passos do livro, navegação Voltar/Próximo e validações que impedem avançar com dados incoerentes:

1. **Conceito, Histórico e Objetivos** — nome, background, sonho e medo.
2. **Aparência e Estilo** — descrição visual (e a imagem do token, opcional).
3. **Distribuição de Características** — 7 pontos entre as 6, máximo 5 cada; só avança com os 7 pontos exatos gastos.
4. **Distribuição de Talentos** — orçamento por Característica igual ao valor dela, respeitando o teto (Talento nunca maior que a Característica); avisa em vermelho se algo estourar.
5. **Tribo Social** — escolhe entre as Tribos já importadas no mundo, com prévia ao vivo de Vitalidade/Conflito Interno/Reputação calculados, e a escolha entre os dois modos de Bônus de Talento da tribo (+1/+1 ou +2 num só).
6. **Vínculos Iniciais e Segredo Confidencial** — dois Vínculos (com alvo, frase e tipo) e o Segredo.

Ao clicar em **"✅ Criar Personagem"**, o sistema cria o Ator já pronto: Características e Talentos preenchidos, a Tribo embutida (com o bônus escolhido já somado e respeitando o teto), os 2 Vínculos e o Segredo Confidencial como Items, e abre a ficha na hora.

## Status atual (anterior): Etapa 10 — Tabelas Geradoras (Rollable Tables)

Implementa o Capítulo 6 do livro usando as **Rollable Tables nativas do Foundry** (aba padrão na barra lateral), em vez de uma ferramenta própria — assim elas ficam disponíveis para rolar, arrastar pra cenas, e usar em macros como qualquer outra tabela do sistema.

- Na aba **Rollable Tables**, dois botões novos no topo (só o Mestre vê): **"Importar Tabelas Geradoras"** e **"🧑 Gerar NPC Completo"**.
- "Importar Tabelas Geradoras" cria de uma vez as 8 tabelas do livro, organizadas em pastas:
  - `I'm Into You / Gerador de NPCs de Corredor` — as 5 sub-tabelas do Cap. 6.1 (Nome e Sobrenome, Tribo Social, Segredo, Cacoete e Vício Visual, Motivação Imediata na Cena).
  - `I'm Into You` — Locais Ícone dos Anos 2000 (6.2), Boatos e Fofocas de Corredor (6.3), Eventos de Festa / House Party (6.4).
- Cada tabela já vem com um ícone temático e o texto completo do livro (incluindo o efeito mecânico das tabelas de Boatos e Eventos de Festa).
- **"🧑 Gerar NPC Completo"** rola as 5 sub-tabelas do Cap. 6.1 de uma vez só e posta um card único e formatado no chat — o "NPC de corredor" pronto em um clique.
- O card de resultado das tabelas no chat ganhou um visual próprio (papel + linha rosa lateral), coerente com o resto do sistema.

## Status atual (anterior): Etapa 9 — Combate Físico

Implementa o Capítulo 8 do livro. Janela própria (**🥊 Iniciar Combate Físico**, na ficha de Personagem e de NPC), com a mesma estrutura da janela de Confronto, mas rodando em cima da **Vitalidade**:

- **Ataque**: Briga/Soco Direto (Atletismo + Força Bruta ou Agilidade) ou Ataque com Objeto Improvisado (Atletismo + Esportes ou Força Bruta), com o bônus de dano automático do objeto (Pequeno +2, Médio +4/+2, Pesado +6/+3 — checando sozinho se o atacante tem Atletismo 2+).
- **Defesa**: Esquiva (Atletismo + Agilidade) ou Bloqueio/Absorção (Vigor + Resistência). Empate ou vitória do defensor = sem dano.
- **Dano**: maior valor entre Força Bruta/Agilidade do atacante + margem da rolagem + bônus do objeto, descontado direto da Vitalidade do defensor.
- **Sucesso Incrível** (12+12) no ataque acerta automaticamente; **Falha Desastrosa** (1+1) erra automaticamente, ignorando bônus.
- **Dano Crítico**: no Sucesso Incrível ou quando o dano ultrapassa metade da Vitalidade atual do alvo — rola 1d6 na Tabela de Ferimentos Prolongados e aplica os efeitos numéricos automatizáveis.
- **Nocaute e Morte**: Vitalidade zerada = nocauteado; um nocauteado que recebe mais dano, ou um golpe brutal o suficiente para passar de -3, encerra o personagem (mensagem dramática no chat).
- Botões de recuperação direto na janela: **🩹 Primeiros Socorros** (Sagacidade+Conhecimento/Investigação do atacante, DF 12, cura 3 de Vitalidade no defensor) e **😴 Noite de Sono** (cura 3 + Vigor automaticamente).

## Status atual (anterior): Etapa 8 — Manhã Seguinte

Implementa o Capítulo 3.5 do livro:

- Botão **"🌅 Rodar Manhã Seguinte"** na aba Principal da ficha do Personagem.
- Rola o **Teste de Claridade** (2d12 + Vigor + Tolerância) contra DF 15.
- **Sucesso**: posta no chat que a memória está intacta, sem complicações mecânicas.
- **Falha**: rola 1d12 na Tabela de Acontecimentos (Cap. 3.5) e posta o evento completo no chat — título, descrição e efeito. Quando o efeito é puramente numérico (Conflito Interno, Reputação, Pontos de Hype), o sistema já aplica direto na ficha; quando depende de uma escolha do Mestre (quem é o destinatário da mensagem, qual Vínculo muda, etc.), o texto fica só como orientação para resolução narrativa.

## Status atual (anterior): Etapa 7 — Progressão de Nível (XP, Especializações, Habilidades de Tribo)

Implementa o Capítulo 4.2 do livro (a "Jornada do Amadurecimento", Nível 1 a 10):

- Campo de **XP** na aba Principal. Quando há XP suficiente para o próximo nível, o botão **"⬆️ Subir de Nível"** fica ativo.
- Ao subir de nível, o sistema aplica automaticamente e posta um resumo no chat:
  - Bônus fixos de Vitalidade e Conflito Interno Máximos (incluindo os "+Vigor" que usam o Vigor atual do personagem, como nos Níveis 3, 6 e 9).
  - Pontos de Talento e/ou Característica livres, mostrados como um seletor + botão "Aplicar" direto na ficha (respeitando a Regra de Ouro: Talento nunca passa da Característica).
  - Nos Níveis 3 e 6: 1 Especialização de Talento disponível — botão cria o Item e já abre a ficha dele.
  - No Nível 5: o **Dado de Hype vira 1d8** automaticamente (o botão de Hype no chat já reflete isso).
  - Nos Níveis 9 e 10: avisos de Ações Exclusivas de Tribo e "Feito do Ano" (apenas textuais por enquanto).
- A aba **Tribo** agora só mostra o texto completo das Habilidades já destravadas pelo Nível atual — as que ainda não chegaram lá aparecem cinzas, com cadeado, e só o nome + "destrava no Nível X".

## Status atual (anterior): Etapa 6 de 6 — Visual Definitivo

Identidade visual própria, construída em cima da estética do livro (capa "Made with Gamma" — caderno espiral, marcadores, fita washi, cultura pop anos 2000):

- **Espiral de caderno** rodando na borda esquerda de toda janela do sistema (ficha de Personagem, ficha de NPC, fichas de Item e a janela de Confronto) — o elemento de assinatura que amarra tudo visualmente.
- Fundo em papel creme pautado (linhas de caderno), com linha de margem vermelha.
- Tipografia: **Permanent Marker** para nomes e títulos grandes, **Caveat** (letra manuscrita) para anotações e dicas, **Nunito** para o restante da interface (carregadas via Google Fonts — precisa de internet no navegador de quem for jogar).
- Foto do personagem em moldura de **polaroide** levemente torta.
- Chip da Tribo Social como **fita washi** colada.
- "Nível" como um **carimbo circular** vermelho, tipo nota de professor.
- Status (Vitalidade, Conflito Interno, Reputação, Hype) como **post-its** coloridos e levemente rotacionados.
- Características como **carimbos circulares**, com destaque rosa ao passar o mouse (indicando que são clicáveis pra rolar).
- Abas da ficha como **divisórias de fichário**.
- Vínculos como cartõezinhos com canto de fita washi.
- Botão de Confronto e botão de Resolver Rodada com padrão diagonal vermelho (clima de "alerta"/duelo).

## Status atual (anterior): Etapa 5 de 6 — Mecânica de Confronto

Novidades desta etapa:
- **Ficha de NPC** própria (mais enxuta que a de Personagem): Características, Talentos, Vitalidade/Conflito Interno/Reputação, e um campo "Papel na história".
- Botão **"⚔️ Iniciar Confronto"** tanto na ficha de Personagem quanto na de NPC, abrindo a janela de Confronto já com aquele ator pré-selecionado.
- A janela de Confronto implementa o Capítulo 3.4 completo:
  - As 4 Ações de Ataque (Ataque Direto, Pressão Lógica, Persuasão Emocional, Blefe) com suas Características/Talentos e fórmulas de dano corretas — incluindo o Blefe, que sempre testa contra Sagacidade + Percepção do alvo, e a Pressão Lógica, que ignora a redução de dano da Postura Inabalável.
  - As 3 Posturas de Defesa (Inabalável, Ironia/Deboche, Escudo de Vínculo) com seus efeitos condicionais.
  - Resolução de empate seguindo as regras do livro (Jogador vs. NPC favorece o Personagem Ativo; Jogador vs. Jogador usa a Soma Estrutural).
  - O bônus de +2 dano da Persuasão Emocional quando o alvo tem Vínculo Positivo com o atacante (procura automaticamente nos Vínculos do defensor).
  - Aplica o dano/cura direto na barra de Conflito Interno das fichas envolvidas, posta cada rodada no chat, e detecta o fim do Confronto (barra cheia = Surto), postando as consequências do Capítulo 3.4 automaticamente.
- Limitação: a janela é operada por uma pessoa só (pensada para o Mestre, que controla a ação do atacante E a postura do NPC defensor a cada rodada) — não há fluxo assíncrono de "cada jogador escolhe a sua parte e espera o outro".

## Status atual (anterior): Etapa 4 de 6 — Vínculos e Escala de Afeto

### O que já funciona (acumulado das 4 etapas):

**Base do sistema**
- O Foundry reconhece o sistema e permite criar um mundo com ele.
- Ficha de Personagem com Características, Talentos, Status (Vitalidade/Conflito Interno/Reputação) e Hype.
- Clicar em Característica/Talento rola 2d12 + valores no chat, com aviso de Sucesso Incrível (12+12) / Falha Desastrosa (1+1).

**Tribos Sociais**
- No diretório de Items (só o Mestre vê), há um botão "Importar Tribos (I'm Into You)" que cria as 10 tribos do livro de uma vez, já com descrição, rival, bônus e as 4 habilidades por nível (1/4/7/9).
- Arrastar uma Tribo para a ficha de um Personagem aplica automaticamente Vitalidade Máxima (Base + Vigor), Conflito Interno Máximo (Base + Sagacidade) e trava a Reputação Máxima em 10.
- Só pode haver 1 Tribo ativa por personagem (arrastar uma nova substitui a anterior).
- Limitação: o "Bônus de Talento" da tribo (ex: +1/+1 em dois talentos OU +2 em um só) ainda é aplicado manualmente — a escolha é do jogador, então isso entra no futuro Assistente de Criação de Personagem.

**Ponto de Hype**
- Toda rolagem de Característica/Talento sai no chat com um botão "🔥 Gastar 1 Ponto de Hype (+1d6)".
- Só o dono do personagem vê o botão ativo. Ao clicar: gasta 1 Ponto de Hype, rola 1d6, mostra o novo total em mensagem separada, e desativa o botão (não dá pra gastar duas vezes na mesma rolagem).
- Se o personagem não tiver Hype, o clique avisa e não deixa gastar.

**Vínculos e Escala de Afeto**
- Na aba "Vínculos & Segredo", dá pra criar Vínculos com um clique ("+ Novo Vínculo").
- Cada Vínculo tem: nome, personagem-alvo, descrição, Tipo (Amizade/Romance/Rivalidade) e Escala de Afeto (-3 a +3).
- Setas ◀ ▶ ajustam a Escala de Afeto na ficha (representando os Gatilhos de Virada do livro), sempre travado entre -3 e +3.
- Ao chegar em +3 ou -3, a ficha mostra automaticamente qual Bônus de Elite foi destravado (Melhor Amigo, Romance ou Rival) com o texto do bônus — a diferenciação entre Melhor Amigo e Romance no +3 usa o campo "Tipo".
- Editar (lápis) abre a ficha completa do Item; excluir (lixeira) remove com confirmação.
- Limitação: os Bônus de Elite aparecem como referência para o Mestre aplicar manualmente durante a cena — a aplicação automática nas rolagens entra na mecânica de Confronto (próxima etapa natural).

## Como instalar (modo manual, para testes)

1. Copie esta pasta inteira para: `[sua pasta de dados do Foundry]/Data/systems/imintoyou`
2. Abra o Foundry, crie um mundo novo e selecione "I'm Into You" como sistema.
3. Como Mestre, vá na aba Items → clique em "Importar Tribos (I'm Into You)".
4. Crie um Ator do tipo "Personagem", arraste uma Tribo para dentro da ficha, e crie um Vínculo na aba "Vínculos & Segredo".
