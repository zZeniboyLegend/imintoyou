/**
 * Controla o botão "Gastar Ponto de Hype" que aparece embaixo de toda
 * rolagem de Característica/Talento no chat (Capítulo 2.1 do livro:
 * "Mecânica do Dado de Hype").
 */

/**
 * Registra os listeners de renderização de mensagens de chat.
 * Suporta tanto o hook clássico "renderChatMessage" (jQuery) quanto o novo
 * "renderChatMessageHTML" do Foundry V13 (HTMLElement puro).
 */
export function registerChatListeners() {
  const handler = (message, html) => {
    const flags = message.flags?.imintoyou;
    if (!flags?.isRollable) return;

    const root = html instanceof jQuery ? html[0] : html;
    if (!root) return;

    // Evita duplicar o botão se o hook disparar mais de uma vez para a mesma mensagem
    if (root.querySelector(".imintoyou-hype-btn, .imintoyou-hype-usado")) return;

    const actor = game.actors.get(flags.actorId);
    if (!actor || !actor.isOwner) return;

    const content = root.querySelector(".message-content") || root;

    if (flags.hypeUsed) {
      const usado = document.createElement("div");
      usado.className = "imintoyou-hype-usado";
      usado.textContent = `🔥 Hype já usado nesta rolagem (+${flags.hypeRollTotal} — novo total: ${flags.novoTotal})`;
      content.appendChild(usado);
      return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "imintoyou-hype-wrapper";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "imintoyou-hype-btn";
    const dado = actor.system.dadoHypeD8 ? "1d8" : "1d6";
    btn.innerHTML = `🔥 Gastar 1 Ponto de Hype (+${dado})`;

    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      btn.disabled = true;
      await gastarHype(message, actor);
    });

    wrapper.appendChild(btn);
    content.appendChild(wrapper);
  };

  Hooks.on("renderChatMessage", handler);
  Hooks.on("renderChatMessageHTML", handler);
}

async function gastarHype(message, actor) {
  const hypeAtual = actor.system.hype?.value ?? 0;

  if (hypeAtual <= 0) {
    ui.notifications.warn(`${actor.name} não possui Pontos de Hype disponíveis.`);
    return;
  }

  const baseRoll = message.rolls?.[0];
  if (!baseRoll) return;

  const dadoHype = actor.system.dadoHypeD8 ? "1d8" : "1d6";
  const hypeRoll = await new Roll(dadoHype).roll();
  const novoTotal = baseRoll.total + hypeRoll.total;

  await actor.update({ "system.hype.value": hypeAtual - 1 });
  await message.update({
    "flags.imintoyou.hypeUsed": true,
    "flags.imintoyou.hypeRollTotal": hypeRoll.total,
    "flags.imintoyou.novoTotal": novoTotal
  });

  await hypeRoll.toMessage({
    speaker: message.speaker,
    flavor: `🔥 Dado de Hype! +${hypeRoll.total} — Novo total da jogada: <strong>${novoTotal}</strong> (${actor.name} ficou com ${hypeAtual - 1} Ponto(s) de Hype)`
  });
}
