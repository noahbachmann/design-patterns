import { CleanSaved, CleanUnsaved, State } from "./state.ts";

export class Editor {
	state: State = new CleanUnsaved();
	openFile: string = "";
	textArea: HTMLTextAreaElement = document.getElementById(
		"text",
	) as HTMLTextAreaElement;

	handleInput() {
		this.state = this.state.handleAreaInput(this);
	}

	handleSaveAsClick() {
		let filename = prompt("Enter a File Name", "");
		if (filename?.trim() != "") {
			if (!filename?.endsWith(".txt")) {
				filename = filename + ".txt";
			}
			localStorage.setItem(filename, this.textArea.value);
			this.state = new CleanUnsaved();
			this.openFile = filename;
			this.setStateLabel(filename);
			this.showFiles("files-list");
		}
	}

	handleSaveClick() {
		const filename = this.state.handleSaveClick(this.openFile);

		localStorage.setItem(filename, this.textArea.value);
		this.setStateLabel(filename);
		this.showFiles("files-list");

		this.state = new CleanSaved();
	}

	handleNewClick() {
		this.textArea.value = "";
		this.openFile = "";
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
				this.openFile = file;
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
}
