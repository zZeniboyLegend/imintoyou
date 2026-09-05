import { IMINTOYOU } from "./modules/config.js";
import { ImIntoYouCharacterSheet } from "./modules/sheets/character-sheet.js";
import { ImIntoYouNpcSheet } from "./modules/sheets/npc-sheet.js";
import { ImIntoYouItemSheet } from "./modules/sheets/item-sheet.js";
import { ImIntoYouActor } from "./modules/documents/actor.js";
import { ImIntoYouCombat } from "./modules/documents/combat.js";
import { importarTribos } from "./modules/tribos.js";
import { registerChatListeners } from "./modules/chat.js";
import { ConfrontoApp } from "./modules/apps/confronto-app.js";
import { CombateApp } from "./modules/apps/combate-app.js";
import { importarTabelasGeradoras, gerarNpcCompleto } from "./modules/tabelas.js";
import { CriacaoPersonagemApp } from "./modules/apps/criacao-personagem-app.js";
import { importarNpcsProntos } from "./modules/npcs-prontos.js";
import { importarCenarios } from "./modules/cenarios.js";
import { AulasApp } from "./modules/apps/aulas-app.js";
import { registrarSocketAulas } from "./modules/aulas.js";
import { BoletimApp } from "./modules/apps/boletim-app.js";
import { importarMuralFofocas } from "./modules/mural-fofocas.js";
import { MuralFofocasApp } from "./modules/apps/mural-fofocas-app.js";
import { ArmarioLauncherApp } from "./modules/apps/armario-launcher-app.js";
import { registrarSocketArmario } from "./modules/armario.js";
import { importarLivroAmizade } from "./modules/livro-amizade.js";
import { LivroAmizadeApp } from "./modules/apps/livro-amizade-app.js";

Hooks.once("init", async function () {
  console.log("I'm Into You | Inicializando o sistema");

  CONFIG.IMINTOYOU = IMINTOYOU;
  CONFIG.Actor.documentClass = ImIntoYouActor;
  CONFIG.Combat.documentClass = ImIntoYouCombat;

  // Fichas de Ator
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("imintoyou", ImIntoYouCharacterSheet, {
    types: ["personagem"],
    makeDefault: true,
    label: "IMINTOYOU.SheetPersonagem"
  });
  Actors.registerSheet("imintoyou", ImIntoYouNpcSheet, {
    types: ["npc"],
    makeDefault: true,
    label: "IMINTOYOU.SheetNpc"
  });

  // Fichas de Item (uma classe só, o template muda pelo tipo do item)
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("imintoyou", ImIntoYouItemSheet, {
    makeDefault: true,
    label: "IMINTOYOU.SheetItem"
  });

  Handlebars.registerHelper("imintoyouCapitalize", (str) => {
    if (typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  });

  Handlebars.registerHelper("imintoyouGte", (a, b) => a >= b);
  Handlebars.registerHelper("eq", (a, b) => a === b);
  Handlebars.registerHelper("add", (a, b) => (a ?? 0) + (b ?? 0));
  Handlebars.registerHelper("range", (inicio, fim) => {
    const arr = [];
    for (let i = inicio; i <= fim; i++) arr.push(i);
    return arr;
  });

  registerChatListeners();

  game.imintoyou = { ConfrontoApp, CombateApp, importarTabelasGeradoras, gerarNpcCompleto, CriacaoPersonagemApp, importarNpcsProntos, importarCenarios, AulasApp, BoletimApp, MuralFofocasApp, ArmarioLauncherApp, LivroAmizadeApp };
});

Hooks.once("ready", async function () {
  console.log("I'm Into You | Sistema pronto");
  registrarSocketAulas();
  registrarSocketArmario();
});

/**
 * Botão "Importar Tribos" no topo do diretório de Items — cria as 10 Tribos
 * do livro como Items do mundo, prontas para arrastar na ficha de um
 * personagem. Só o GM vê o botão.
 *
 * A partir do Foundry V13 (ApplicationV2), o cabeçalho do diretório de Items
 * não usa mais a classe ".action-buttons", e o "html" do hook pode vir como
 * HTMLElement puro em vez de objeto jQuery — por isso tratamos os dois casos.
 */
Hooks.on("renderItemDirectory", (app, html) => {
  if (!game.user.isGM) return;

  const root = html instanceof jQuery ? html[0] : html;
  const header = root.querySelector(".directory-header");
  if (!header) return;
  if (header.querySelector(".imintoyou-import-tribos")) return;

  // Usa o mesmo container flex onde já estão os botões "Create Item" / "Create Folder"
  const primeiroBotao = header.querySelector("button");
  const container = primeiroBotao ? primeiroBotao.parentElement : header;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "imintoyou-import-tribos";
  button.innerHTML = `<i class="fas fa-people-group"></i> Importar Tribos (I'm Into You)`;

  button.addEventListener("click", () => importarTribos());

  container.appendChild(button);
});

/**
 * Botões "Importar Tabelas Geradoras" e "Gerar NPC Completo" no topo do
 * diretório de Rollable Tables. Mesmo cuidado de compatibilidade com o
 * Foundry V13 (ApplicationV2) usado no diretório de Items.
 */
Hooks.on("renderRollTableDirectory", (app, html) => {
  if (!game.user.isGM) return;

  const root = html instanceof jQuery ? html[0] : html;
  const header = root.querySelector(".directory-header");
  if (!header) return;
  if (header.querySelector(".imintoyou-import-tabelas")) return;

  const primeiroBotao = header.querySelector("button");
  const container = primeiroBotao ? primeiroBotao.parentElement : header;

  const botaoImportar = document.createElement("button");
  botaoImportar.type = "button";
  botaoImportar.className = "imintoyou-import-tabelas";
  botaoImportar.innerHTML = `<i class="fas fa-book-open"></i> Importar Tabelas Geradoras (I'm Into You)`;
  botaoImportar.addEventListener("click", () => importarTabelasGeradoras());

  const botaoNpc = document.createElement("button");
  botaoNpc.type = "button";
  botaoNpc.className = "imintoyou-gerar-npc";
  botaoNpc.innerHTML = `<i class="fas fa-user-plus"></i> 🧑 Gerar NPC Completo`;
  botaoNpc.addEventListener("click", () => gerarNpcCompleto());

  container.appendChild(botaoImportar);
  container.appendChild(botaoNpc);
});

/**
 * Botão "Criar Personagem Guiado" no topo do diretório de Atores — abre o
 * Assistente de Criação de Personagem (Cap. 4 do livro). Disponível para
 * qualquer jogador, não só o Mestre, já que é o jogador quem cria seu PJ.
 */
Hooks.on("renderActorDirectory", (app, html) => {
  const root = html instanceof jQuery ? html[0] : html;
  const header = root.querySelector(".directory-header");
  if (!header) return;
  if (header.querySelector(".imintoyou-criar-personagem")) return;

  const primeiroBotao = header.querySelector("button");
  const container = primeiroBotao ? primeiroBotao.parentElement : header;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "imintoyou-criar-personagem";
  botao.innerHTML = `<i class="fas fa-hat-wizard"></i> 🧭 Criar Personagem Guiado (I'm Into You)`;
  botao.addEventListener("click", () => new CriacaoPersonagemApp().render(true));

  container.appendChild(botao);

  if (game.user.isGM && !header.querySelector(".imintoyou-importar-npcs")) {
    const botaoNpcs = document.createElement("button");
    botaoNpcs.type = "button";
    botaoNpcs.className = "imintoyou-importar-npcs";
    botaoNpcs.innerHTML = `<i class="fas fa-users"></i> 📇 Importar 22 NPCs Prontos (I'm Into You)`;
    botaoNpcs.addEventListener("click", () => importarNpcsProntos());
    container.appendChild(botaoNpcs);
  }

  if (game.user.isGM && !header.querySelector(".imintoyou-provas-aula")) {
    const botaoAulas = document.createElement("button");
    botaoAulas.type = "button";
    botaoAulas.className = "imintoyou-provas-aula";
    botaoAulas.innerHTML = `<i class="fas fa-graduation-cap"></i> 📝 Provas de Aula (I'm Into You)`;
    botaoAulas.addEventListener("click", () => new AulasApp().render(true));
    container.appendChild(botaoAulas);
  }

  if (!header.querySelector(".imintoyou-mural-fofocas")) {
    const botaoMural = document.createElement("button");
    botaoMural.type = "button";
    botaoMural.className = "imintoyou-mural-fofocas";
    botaoMural.innerHTML = `<i class="fas fa-note-sticky"></i> 📌 Mural de Fofocas (I'm Into You)`;
    botaoMural.addEventListener("click", () => new MuralFofocasApp().render(true));
    container.appendChild(botaoMural);
  }

  if (!header.querySelector(".imintoyou-livro-amizade")) {
    const botaoLivro = document.createElement("button");
    botaoLivro.type = "button";
    botaoLivro.className = "imintoyou-livro-amizade";
    botaoLivro.innerHTML = `<i class="fas fa-images"></i> 📷 Livro da Amizade (I'm Into You)`;
    botaoLivro.addEventListener("click", () => new LivroAmizadeApp().render(true));
    container.appendChild(botaoLivro);
  }

  if (game.user.isGM && !header.querySelector(".imintoyou-armario")) {
    const botaoArmario = document.createElement("button");
    botaoArmario.type = "button";
    botaoArmario.className = "imintoyou-armario";
    botaoArmario.innerHTML = `<i class="fas fa-lock"></i> 🔒 Armário com Cadeado (I'm Into You)`;
    botaoArmario.addEventListener("click", () => new ArmarioLauncherApp().render(true));
    container.appendChild(botaoArmario);
  }
});

/**
 * Botão "Importar Cenários" no topo do diretório de Journal Entries — cria
 * o Journal com os 20 Locais Ícone dos Anos 2000 expandidos (Cap. 6.2).
 */
Hooks.on("renderJournalDirectory", (app, html) => {
  if (!game.user.isGM) return;

  const root = html instanceof jQuery ? html[0] : html;
  const header = root.querySelector(".directory-header");
  if (!header) return;
  if (header.querySelector(".imintoyou-importar-cenarios")) return;

  const primeiroBotao = header.querySelector("button");
  const container = primeiroBotao ? primeiroBotao.parentElement : header;

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "imintoyou-importar-cenarios";
  botao.innerHTML = `<i class="fas fa-map-location-dot"></i> 🗺️ Importar Cenários (I'm Into You)`;
  botao.addEventListener("click", () => importarCenarios());

  container.appendChild(botao);

  const botaoMural = document.createElement("button");
  botaoMural.type = "button";
  botaoMural.className = "imintoyou-importar-mural";
  botaoMural.innerHTML = `<i class="fas fa-note-sticky"></i> 📌 Importar Mural de Fofocas (I'm Into You)`;
  botaoMural.addEventListener("click", () => importarMuralFofocas());
  container.appendChild(botaoMural);

  const botaoLivro = document.createElement("button");
  botaoLivro.type = "button";
  botaoLivro.className = "imintoyou-importar-livro";
  botaoLivro.innerHTML = `<i class="fas fa-images"></i> 📷 Importar Livro da Amizade (I'm Into You)`;
  botaoLivro.addEventListener("click", () => importarLivroAmizade());
  container.appendChild(botaoLivro);
});
