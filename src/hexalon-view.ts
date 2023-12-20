import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_HEXALON = "hexalon-view";

export class HexalonView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_HEXALON;
    }

    getDisplayText() {
        return "Hexalon";
    }

    async onOpen() {
        console.log("Opened View");
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("h4", { text: "Hexalon" });
    }

    async onClose() {
        // Nothing to clean up.
    }
}
