//console.log here gets logged on the window

const { ipcRenderer } = require('electron')
const { dialog } = require('electron').remote
const loader = require('monaco-loader')
const fs = require('fs') //node's file system
const MonacoEditor = require('./editor.js');

document.addEventListener('DOMContentLoaded', () => {
  let containerEl = document.getElementById("container");
  // It's supposed to be lightweight, so this should be the only editor instance that will be created.
  // To support tabs, we could create multiple instances.
  let currentEditor = new MonacoEditor(containerEl, "./test.md", "blableblibloblu");

  document.addEventListener('keydown', e => {
    // e.metaKey is a flag for CMD. e.ctrlKey is the same flag for CTRL

    // Open File
    if (e.metaKey && e.keyCode === 79) {
      e.preventDefault();
      currentEditor.openFile();
    }

    // Save File
    if (e.metaKey && e.keyCode === 83) {
      e.preventDefault();
      currentEditor.saveFile();
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