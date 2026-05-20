import { Editor } from "./editor.ts";

export interface State {
	handleAreaInput(editor: Editor): State;
	handleSaveClick(openFile?: string): string;
}

export class CleanSaved implements State {
	handleAreaInput(editor: Editor): State {
		editor.setStateLabel(`${editor.openFile} *`);
		return new DirtySaved();
	}

	handleSaveClick(openFile: string): string {
		return openFile;
	}
}

export class CleanUnsaved implements State {
	handleAreaInput(editor: Editor): State {
		editor.setStateLabel("*");
		return new DirtyUnsaved();
	}

	handleSaveClick(): string {
		let filename;
		do {
			filename = prompt("Enter a File Name", "");
		} while (filename?.trim() == "");

		if (!filename?.endsWith(".txt")) {
			filename = filename + ".txt";
		}
		return filename;
	}
}

export class DirtySaved implements State {
	handleAreaInput(): State {
		return this;
	}

	handleSaveClick(openFile: string): string {
		return openFile;
	}
}

export class DirtyUnsaved implements State {
	handleAreaInput(): State {
		return this;
	}

	handleSaveClick(): string {
		let filename;
		do {
			filename = prompt("Enter a File Name", "");
		} while (filename?.trim() == "");

		if (!filename?.endsWith(".txt")) {
			filename = filename + ".txt";
		}
		return filename;
	}
}
