export class ImIntoYouItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["imintoyou", "sheet", "item"],
      width: 480,
      height: "auto"
    });
  }

  /** @override */
  get template() {
    return `systems/imintoyou/templates/sheets/item-${this.item.type}-sheet.hbs`;
  }

  /** @override */
  async getData(options) {
    const context = await super.getData(options);
    context.system = context.item.system;
    return context;
  }
}
