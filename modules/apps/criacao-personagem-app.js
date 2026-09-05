import { IMINTOYOU } from "../config.js";
import { BONUS_TALENTO_TRIBO } from "../data/tribos.js";

const ORDEM_CARACTERISTICAS = ["presenca", "sagacidade", "estilo", "vigor", "atletismo", "empatia"];

const TITULOS_PASSO = [
  "Conceito, Histórico e Objetivos",
  "Detalhes de Aparência e Estilo",
  "Distribuição de Características",
  "Distribuição de Talentos",
  "Escolha da Tribo Social",
  "Vínculos Iniciais e Segredo Confidencial"
];

function talentosVazios() {
  const talentos = {};
  for (const char of ORDEM_CARACTERISTICAS) {
    talentos[char] = {};
    for (const talent of IMINTOYOU.talents[char]) talentos[char][talent] = 0;
  }
  return talentos;
}

/**
 * Assistente de Criação de Personagem (Capítulo 4 do livro) — guia o
 * jogador pelos 6 passos e, no final, cria o Ator já com Características,
 * Talentos, Tribo (com o bônus escolhido aplicado) e Vínculos/Segredo.
 */
export class CriacaoPersonagemApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-criacao-personagem",
      classes: ["imintoyou", "imintoyou-confronto"],
      template: "systems/imintoyou/templates/apps/criacao-personagem.hbs",
      title: "Criação de Personagem — I'm Into You",
      width: 640,
      height: "auto",
      resizable: true
    });
  }

  constructor(options = {}) {
    super(options);
    this.passo = 1;
    this.dados = {
      nome: "",
      img: "icons/svg/mystery-man.svg",
      historico: "",
      sonho: "",
      medo: "",
      aparencia: "",
      estiloVisual: "",
      caracteristicas: Object.fromEntries(ORDEM_CARACTERISTICAS.map((c) => [c, 0])),
      talentos: talentosVazios(),
      triboId: null,
      bonusTalentoModo: "duo",
      vinculo1: { alvo: "", descricao: "", tipo: "amizade" },
      vinculo2: { alvo: "", descricao: "", tipo: "amizade" },
      segredo: ""
    };
  }

  /** @override */
  async getData(options) {
    const caracteristicas = this.dados.caracteristicas;
    const pontosGastos = ORDEM_CARACTERISTICAS.reduce((soma, c) => soma + (caracteristicas[c] ?? 0), 0);

    const budgetTalentoPorChar = {};
    const usadoTalentoPorChar = {};
    const budgetEstouradoPorChar = {};
    let algumTetoEstourado = false;
    for (const char of ORDEM_CARACTERISTICAS) {
      budgetTalentoPorChar[char] = caracteristicas[char] ?? 0;
      const usado = Object.values(this.dados.talentos[char] ?? {}).reduce((s, v) => s + (v ?? 0), 0);
      usadoTalentoPorChar[char] = usado;
      budgetEstouradoPorChar[char] = usado > budgetTalentoPorChar[char];
      for (const valor of Object.values(this.dados.talentos[char] ?? {})) {
        if ((valor ?? 0) > (caracteristicas[char] ?? 0)) algumTetoEstourado = true;
      }
    }
    const algumBudgetEstourado = ORDEM_CARACTERISTICAS.some((c) => usadoTalentoPorChar[c] > budgetTalentoPorChar[c]);

    const tribos = game.items.filter((i) => i.type === "tribo");
    const triboSelecionada = this.dados.triboId ? game.items.get(this.dados.triboId) : null;
    const bonusOpcoes = triboSelecionada ? BONUS_TALENTO_TRIBO[triboSelecionada.name] : null;

    let previaStatus = null;
    if (triboSelecionada) {
      previaStatus = {
        vitalidade: (triboSelecionada.system.vitalidadeBase ?? 0) + (caracteristicas.vigor ?? 0),
        conflitoInterno: (triboSelecionada.system.conflitoInternoBase ?? 0) + (caracteristicas.sagacidade ?? 0),
        reputacao: Math.min(10, (triboSelecionada.system.reputacaoBase ?? 0) + (caracteristicas.estilo ?? 0))
      };
    }

    let podeAvancar = true;
    if (this.passo === 1) podeAvancar = !!this.dados.nome;
    if (this.passo === 3) podeAvancar = pontosGastos === 7;
    if (this.passo === 4) podeAvancar = !algumBudgetEstourado && !algumTetoEstourado;
    if (this.passo === 5) podeAvancar = !!this.dados.triboId;

    return {
      passo: this.passo,
      totalPassos: 6,
      tituloPasso: TITULOS_PASSO[this.passo - 1],
      dados: this.dados,
      ordemCaracteristicas: ORDEM_CARACTERISTICAS,
      talentosPorCaracteristica: IMINTOYOU.talents,
      pontosGastos,
      pontosRestantes: 7 - pontosGastos,
      budgetTalentoPorChar,
      usadoTalentoPorChar,
      budgetEstouradoPorChar,
      algumTetoEstourado,
      algumBudgetEstourado,
      tribos,
      triboSelecionada,
      bonusOpcoes,
      previaStatus,
      podeAvancar
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find(".step-body input, .step-body select, .step-body textarea").on("change", (ev) => {
      const path = ev.currentTarget.dataset.path;
      if (!path) return;
      let valor = ev.currentTarget.value;
      if (ev.currentTarget.type === "number") valor = Number(valor) || 0;
      foundry.utils.setProperty(this.dados, path, valor);
      this.render(false);
    });

    html.find(".imintoyou-wizard-voltar").on("click", () => {
      this.passo = Math.max(1, this.passo - 1);
      this.render(false);
    });
    html.find(".imintoyou-wizard-proximo").on("click", () => {
      this.passo = Math.min(6, this.passo + 1);
      this.render(false);
    });
    html.find(".imintoyou-wizard-finalizar").on("click", () => this._onFinalizar());
  }

  async _onFinalizar() {
    const d = this.dados;
    if (!d.nome) {
      ui.notifications.warn("Dê um nome ao personagem antes de criar (Passo 1).");
      this.passo = 1;
      this.render(false);
      return;
    }

    const actor = await Actor.create({
      name: d.nome,
      type: "personagem",
      img: d.img || "icons/svg/mystery-man.svg",
      system: {
        characteristics: Object.fromEntries(ORDEM_CARACTERISTICAS.map((c) => [c, { value: d.caracteristicas[c] ?? 0 }])),
        talents: d.talentos,
        background: {
          historico: d.historico,
          sonho: d.sonho,
          medo: d.medo,
          aparencia: d.aparencia,
          estiloVisual: d.estiloVisual
        }
      }
    });

    if (d.triboId) {
      const triboItem = game.items.get(d.triboId);
      if (triboItem) {
        const triboData = triboItem.toObject();
        delete triboData._id;
        await actor.createEmbeddedDocuments("Item", [triboData]);

        const bonusOpcoes = BONUS_TALENTO_TRIBO[triboItem.name];
        if (bonusOpcoes) {
          const updateTalentos = {};
          const alvos = d.bonusTalentoModo === "mono" ? [bonusOpcoes[0]] : bonusOpcoes;
          const incremento = d.bonusTalentoModo === "mono" ? 2 : 1;
          for (const alvo of alvos) {
            const atual = actor.system.talents?.[alvo.char]?.[alvo.talent] ?? 0;
            const teto = actor.system.characteristics?.[alvo.char]?.value ?? 0;
            updateTalentos[`system.talents.${alvo.char}.${alvo.talent}`] = Math.min(teto, atual + incremento);
          }
          await actor.update(updateTalentos);
        }
      }
    }

    const itemsParaCriar = [];
    if (d.vinculo1.descricao || d.vinculo1.alvo) {
      itemsParaCriar.push({
        name: d.vinculo1.alvo ? `Vínculo com ${d.vinculo1.alvo}` : "Vínculo Inicial",
        type: "vinculo",
        system: { alvo: d.vinculo1.alvo, descricao: d.vinculo1.descricao, tipo: d.vinculo1.tipo, escalaAfeto: 0 }
      });
    }
    if (d.vinculo2.descricao || d.vinculo2.alvo) {
      itemsParaCriar.push({
        name: d.vinculo2.alvo ? `Vínculo com ${d.vinculo2.alvo}` : "Vínculo Inicial",
        type: "vinculo",
        system: { alvo: d.vinculo2.alvo, descricao: d.vinculo2.descricao, tipo: d.vinculo2.tipo, escalaAfeto: 0 }
      });
    }
    if (d.segredo) {
      itemsParaCriar.push({ name: "Segredo Confidencial", type: "segredo", system: { texto: d.segredo, revelado: false } });
    }
    if (itemsParaCriar.length) await actor.createEmbeddedDocuments("Item", itemsParaCriar);

    ui.notifications.info(`${actor.name} foi criado! Abrindo a ficha...`);
    actor.sheet.render(true);
    this.close();
  }
}
