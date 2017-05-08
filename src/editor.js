// This will be a class with the following API:
// • new(container, data): creates a new instance of the editor and attaches itself to the container. Returns instance;
// • openFile(): shows dialog and changes editor value and filePath to that of selected file. Returns true or error;
// • saveFile(): saves file to this.filePath. Returns true or err;
// • saveNewFile(): shows dialog to set new filePath. Calls save(). Returns err;
// • this.filePath: stores path of file;
// • this.editorEl: the monaco editor element itself;

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

    loader().then( monaco => {
      this.editorEl = monaco.editor.create(containerEl, monacoOptions);
    });

    this.filePath = filePath;
  }

  saveFile() {
    let error;
    let editorValue = this.editorEl.getValue();
    fs.writeFile(this.filePath, editorValue, err => {
      if (err) error = err;
    })

    //If save is successful (no error) return true. If not, return the error
    return error ? error : true;
  }

  openFile() {
    const filePath = dialog.showOpenDialog({
      filters: [{name: 'markdown', extensions: ['md']}],
      properties: ['openFile']
    })[0];
    let error;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        error = err;
      } else {
        this.editorEl.setValue(data);
        this.filePath = filePath;
        console.log("file opened");
      }
    });

    //If open is successful (no error) return true. If not, return the error
    return error ? error : true;
  }  
}

  module.exports = MonacoEditor;