import { Editor } from "./editor.ts";

const editor = new Editor();

document.addEventListener("DOMContentLoaded", () => {
	editor.showFiles("files-list");

	editor.textArea.addEventListener("input", () => {
		editor.handleInput();
	});

	const saveAsButton = document.getElementById("save-as-button");
	saveAsButton?.addEventListener("click", () => {
		editor.handleSaveAsClick();
	});

	const saveButton = document.getElementById("save-button");
	saveButton?.addEventListener("click", () => {
		editor.handleSaveClick();
	});

	const newButton = document.getElementById("new-button");
	newButton?.addEventListener("click", () => {
		editor.handleNewClick();
	});

	document.addEventListener("contextmenu", (event) => {
		alert("Wanna steal my source code, huh!?");
		event.preventDefault();
		return false;
	});
});
