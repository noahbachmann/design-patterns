// state.ts
var CleanSaved = class {
  handleAreaInput(editor2) {
    editor2.setStateLabel(`${editor2.openFile} *`);
    return new DirtySaved();
  }
  handleSaveClick(openFile) {
    return openFile;
  }
};
var CleanUnsaved = class {
  handleAreaInput(editor2) {
    editor2.setStateLabel("*");
    return new DirtyUnsaved();
  }
  handleSaveClick() {
    let filename;
    do {
      filename = prompt("Enter a File Name", "");
    } while (filename?.trim() == "");
    if (!filename?.endsWith(".txt")) {
      filename = filename + ".txt";
    }
    return filename;
  }
};
var DirtySaved = class {
  handleAreaInput() {
    return this;
  }
  handleSaveClick(openFile) {
    return openFile;
  }
};
var DirtyUnsaved = class {
  handleAreaInput() {
    return this;
  }
  handleSaveClick() {
    let filename;
    do {
      filename = prompt("Enter a File Name", "");
    } while (filename?.trim() == "");
    if (!filename?.endsWith(".txt")) {
      filename = filename + ".txt";
    }
    return filename;
  }
};

// editor.ts
var Editor = class {
  state = new CleanUnsaved();
  openFile = "";
  textArea = document.getElementById("text");
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
  setStateLabel(value) {
    const stateLabel = document.getElementById("state-label");
    if (stateLabel) {
      stateLabel.innerText = value;
    }
  }
  showFiles(parentId) {
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
  listFiles() {
    const files = [];
    for (let i = 0; i < localStorage.length; i++) {
      files.push(localStorage.key(i) || "");
    }
    return files;
  }
};

// texteditor.ts
var editor = new Editor();
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
