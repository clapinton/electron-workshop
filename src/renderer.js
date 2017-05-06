//console.log here gets logged on the window

const { ipcRenderer } = require('electron')
const { dialog } = require('electron').remote
const loader = require('monaco-loader')
const fs = require('fs') //node's file system
const MonacoEditor = require('./editor.js');

let filePath = "";

const createNewEditor = function(monaco, value) {
  let containerEl = document.getElementById("container");
  containerEl.innerHTML = ""; //get rid of previous editors
  let monacoOptions = {
    value: value,
    language: 'markdown',
    theme: 'vs-dark',
    automaticLayout: true
  }

  return monaco.editor.create(containerEl, monacoOptions);
}

const openFile = function(monaco) {
  filePath = dialog.showOpenDialog({properties: ['openFile']})[0];
  let editor;
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      editor = createNewEditor(monaco, data);
    }
  });

  return editor;
}

const checkFilePath = function() {
    if (filePath === "") filePath = dialog.showSaveDialog();
}

const saveFile = function(editor) {

  fs.writeFile(filePath, editor.getValue(), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Saved!");
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loader().then((monaco) => {
    let editor = createNewEditor(monaco, "");

    console.log("editor is", new MonacoEditor("<html></html>"));    

    document.addEventListener('keydown', e => {
      // e.metaKey is a flag for CMD. e.ctrlKey is the same flag for CTRL

      // Open File
      if (e.metaKey && e.keyCode === 79) {
        e.preventDefault();
        editor = openFile(monaco);
      }

      // Save File
      if (e.metaKey && e.keyCode === 83) {
        e.preventDefault();
        checkFilePath();
        saveFile(editor);
      }

    });

    ipcRenderer.on('navigate', (e, url) => {
      //Command received from index.js

      //Removing the protocol, since Chrome doesn't want it
      url = decodeURI(url.slice(7));

      fs.readFile(url, 'utf8', (error, result) => {
        if (!error) {
          console.log(`No errors. Opening file ${url}`);
          editor.setModel(monaco.editor.createModel(result, 'markdown'));
        } else {
          console.log(`Hit an error:`);
          console.log(error);
        }
      })
    })
  })
})