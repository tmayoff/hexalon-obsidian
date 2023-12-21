import { ItemView, WorkspaceLeaf } from "obsidian";

import ViewComponent from "./HexalonView.svelte";

export const VIEW_TYPE_HEXALON = "hexalon";

export class HexalonView extends ItemView {
    hexalon: ViewComponent | undefined;

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
        this.hexalon = new ViewComponent({
            target: this.contentEl,

        });
    }

    async onClose() {
        this.hexalon?.$destroy();
    }
}
