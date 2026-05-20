import { Editor } from "./editor.ts";

export interface State {
	handleAreaInput(editor: Editor): void;
	handleSaveClick(): string | null;
}

export class CleanSaved implements State {
	handleAreaInput(editor: Editor) {
		editor.setStateLabel(`${editor.openFileName} *`);
		editor.state = new DirtySaved();
	}

	handleSaveClick(): null {
		return null;
	}
}

export class CleanUnsaved implements State {
	handleAreaInput(editor: Editor) {
		editor.setStateLabel("*");
		editor.state = new DirtyUnsaved();
	}

	handleSaveClick(): string {
		return Editor.getFilenameInput();
	}
}

export class DirtySaved implements State {
	handleAreaInput() {}

	handleSaveClick(): null {
		return null;
	}
}

export class DirtyUnsaved implements State {
	handleAreaInput() {}

	handleSaveClick(): string {
		return Editor.getFilenameInput();
	}
}
