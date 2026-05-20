import { CleanSaved, CleanUnsaved, State } from "./state.ts";

export class Editor {
	state: State = new CleanUnsaved();
	openFileName: string = "";
	textArea: HTMLTextAreaElement = document.getElementById(
		"text",
	) as HTMLTextAreaElement;

	handleInput() {
		this.state.handleAreaInput(this);
	}

	handleSaveAsClick() {
		const filename = Editor.getFilenameInput();

		localStorage.setItem(filename, this.textArea.value);
		this.state = new CleanSaved();
		this.openFileName = filename;
		this.setStateLabel(filename);
		this.showFiles("files-list");
	}

	handleSaveClick() {
		const filename = this.state.handleSaveClick() ?? this.openFileName;

		localStorage.setItem(filename, this.textArea.value);
		this.setStateLabel(filename);
		this.showFiles("files-list");

		this.state = new CleanSaved();
	}

	handleNewClick() {
		this.textArea.value = "";
		this.openFileName = "";
		this.setStateLabel("_");
		this.state = new CleanUnsaved();
	}

	setStateLabel(value: string) {
		const stateLabel = document.getElementById("state-label");
		if (stateLabel) {
			stateLabel.innerText = value;
		}
	}

	showFiles(parentId: string) {
		const files = this.listFiles();
		const parent = document.getElementById(parentId);

		while (parent && parent.hasChildNodes() && parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}

		for (const file of files) {
			const item = document.createElement("li");
			const link = document.createElement("a");
			link.innerHTML = file;
			item.appendChild(link);
			parent?.append(item);

			link.addEventListener("click", () => {
				const content = localStorage.getItem(file);
				this.openFileName = file;
				if (this.textArea != null) {
					this.textArea.value = content || "";
				}
				this.state = new CleanSaved();
				this.setStateLabel(file);
			});
		}
	}

	private listFiles(): string[] {
		const files: string[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			files.push(localStorage.key(i) || "");
		}
		return files;
	}

	public static getFilenameInput(): string {
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
