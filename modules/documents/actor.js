/**
 * Ator customizado do sistema. A responsabilidade principal aqui é o cálculo
 * de "dados derivados": valores que o Mestre/jogador não digita diretamente,
 * mas que nascem da combinação Tribo + Características + Progressão de Nível.
 */
import { XP_POR_NIVEL } from "../data/progressao.js";
export class ImIntoYouActor extends Actor {

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();
    if (!["personagem", "npc"].includes(this.type)) return;

    const sys = this.system;

    if (this.type === "personagem") {
      const tribo = this.items.find((i) => i.type === "tribo");

      // Guarda uma referência "achatada" da tribo ativa para a ficha usar sem
      // precisar navegar pela coleção de items toda hora.
      sys.triboAtiva = tribo
        ? {
            id: tribo.id,
            name: tribo.name,
            img: tribo.img,
            rival: tribo.system.triboRival,
            bonusTalento: tribo.system.bonusTalento,
            habilidades: tribo.system.habilidades
          }
        : null;

      // Vitalidade Máxima = Base da Tribo + Vigor + bônus acumulado de nível
      // Conflito Interno Máximo = Base da Tribo + Sagacidade + bônus acumulado de nível
      if (tribo) {
        sys.status.vitalidade.max =
          (tribo.system.vitalidadeBase ?? 0) +
          (sys.characteristics.vigor?.value ?? 0) +
          (sys.bonusVitalidadeAcumulado ?? 0);
        sys.status.conflitoInterno.max =
          (tribo.system.conflitoInternoBase ?? 0) +
          (sys.characteristics.sagacidade?.value ?? 0) +
          (sys.bonusConflitoAcumulado ?? 0);
      }

      // Próximo limiar de XP (Capítulo 4.2) — null quando já está no Nível 10
      const nivelAtual = sys.nivel?.value ?? 1;
      sys.xpProximoNivel = nivelAtual < 10 ? XP_POR_NIVEL[nivelAtual + 1] : null;
    }

    // Reputação: o teto é sempre 10, independentemente da tribo (regra do livro, 3.1)
    sys.status.reputacao.max = 10;

    // Nunca deixa os valores atuais passarem do máximo (ex: jogador baixou o Vigor depois de ferido)
    sys.status.vitalidade.value = Math.min(sys.status.vitalidade.value, sys.status.vitalidade.max);
    sys.status.conflitoInterno.value = Math.min(sys.status.conflitoInterno.value, sys.status.conflitoInterno.max);
    sys.status.reputacao.value = Math.min(sys.status.reputacao.value, sys.status.reputacao.max);
  }
}
