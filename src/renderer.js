//console.log here gets logged on the window

const { ipcRenderer } = require('electron')
const loader = require('monaco-loader')
const fs = require('fs') //node's file system

document.addEventListener('DOMContentLoaded', () => {
  loader().then((monaco) => {
    let containerEl = document.getElementById("container");
    let monacoOptions = {
      language: 'markdown',
      theme: 'vs-dark',
      automaticLayout: true
    };
    let editor = monaco.editor.create(containerEl, monacoOptions);

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