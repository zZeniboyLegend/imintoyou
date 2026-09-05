import { dispararArmario } from "../armario.js";

/** Janela do Mestre pra escolher o jogador, a combinação e o conteúdo do Armário. */
export class ArmarioLauncherApp extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "imintoyou-armario-launcher",
      classes: ["imintoyou", "imintoyou-armario-launcher"],
      template: "systems/imintoyou/templates/apps/armario-launcher.hbs",
      title: "Armário com Cadeado — I'm Into You",
      width: 400,
      height: "auto",
      resizable: false
    });
  }

  /** @override */
  async getData(options) {
    return {
      personagens: game.actors.filter((a) => a.type === "personagem")
    };
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".imintoyou-btn-disparar-armario").on("click", () => {
      const form = html[0].querySelector("form");
      const actorId = form.querySelector("select[name='actorId']").value;
      const c1 = form.querySelector("input[name='c1']").value;
      const c2 = form.querySelector("input[name='c2']").value;
      const c3 = form.querySelector("input[name='c3']").value;
      const conteudo = form.querySelector("textarea[name='conteudo']").value || "Um bilhete dobrado, sem assinatura.";

      const combinacaoManual = [c1, c2, c3].every((v) => v !== "");
      const combinacao = combinacaoManual
        ? [Number(c1) % 10, Number(c2) % 10, Number(c3) % 10]
        : undefined; // undefined = ArmarioApp sorteia uma combinação aleatória

      dispararArmario({ actorId, combinacao, conteudo });
      this.close();
    });
  }
}
