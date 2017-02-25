const loader = require('monaco-loader')

document.addEventListener('DOMContentLoaded', () => {
  loader().then((monaco) => {
    let containerEl = document.getElementById("container");
    let monacoOptions = {
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true
    };
    let editor = monaco.editor.create(containerEl, monacoOptions);
  })
})