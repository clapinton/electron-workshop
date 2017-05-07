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

document.addEventListener('DOMContentLoaded', () => {
  let containerEl = document.getElementById("container");
  let currentEditor = new MonacoEditor(containerEl, "./test.md", "blableblibloblu");

  document.addEventListener('keydown', e => {
    // e.metaKey is a flag for CMD. e.ctrlKey is the same flag for CTRL

    // Open File
    if (e.metaKey && e.keyCode === 79) {
      e.preventDefault();
      // currentEditor = openFile(monaco);
    }

    // Save File
    if (e.metaKey && e.keyCode === 83) {
      e.preventDefault();
      console.log("saving");
      // checkFilePath();
      currentEditor.saveFile();
      console.log("saved");
    }

  });

  ipcRenderer.on('navigate', (e, url) => {
    //Command received from index.js

    //Removing the protocol, since Chrome doesn't want it
    url = decodeURI(url.slice(7));

    fs.readFile(url, 'utf8', (error, result) => {
      if (!error) {
        console.log(`No errors. Opening file ${url}`);
        currentEditor.setModel(monaco.editor.createModel(result, 'markdown'));
      } else {
        console.log(`Hit an error:`);
        console.log(error);
      }
    })
  })

})