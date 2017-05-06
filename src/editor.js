// This will be a class with the following API:
// • new(container, data): creates a new instance of the editor and attaches itself to the container. Returns instance;
// • Class.open(): shows dialog and creates new instance with value of selected file. Returns instance;
// • saveFile(): saves file to this.filePath. Returns err;
// • saveNewFile(): shows dialog to set new filePath. Calls save(). Returns err;
// • this.filePath: stores path of file;
// • this.editorEl: the monaco editor element itself;
// • this.errors: stores editor errors

const { dialog } = require('electron').remote;
const loader = require('monaco-loader');
const fs = require('fs');

class MonacoEditor {

  constructor(containerEl, filePath, value) {

    let monacoOptions = {
      value: value,
      language: 'markdown',
      theme: 'vs-dark',
      automaticLayout: true
    };

    this.errors = {};
    this.editorEl = monaco.editor.create(containerEl, monacoOptions)
    this.filePath = filePath;

  }

  saveFile() {
    let editorValue = editor.getValue();
    let hasError = false;
    fs.writeFile(this.filePath, editorValue, err => {
      if (err) {
        this.errors = err;
        hasError = true;
      }
    })

    return !hasError;
  }

}

module.exports = MonacoEditor;