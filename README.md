1. `npm init` to create package.json. Electron app is just a node app;
2. `npm install --save electron`

3. Add `electron .` as a `start` script to package.json
That'll run the `main` script from package.json, which will create the renderes. We then need to add a script to package.json to run another js file,
which will be the window itself.

`app` API endpoint has all the methods and events you'll beed to interact with the app itself, like creating and opening a new browser window;

4. `npm start`


### Loading from an URL

```js
mainWindow = new BrowserWindow();
mainWindow.loadURL('http://www.google.com');
```
Notice that you need a protocol ("http").
The issue with this is that the URL will have access to your computer through node's `fs` object. We don't want that.
Therefore, always load from an internal file:

### Loading from a file
Each OS has a different folder structure. In order to know where you are, you have to use `__dirname`, part of the `path` module.

```js
const path = require('path');
const index = path.join(__dirname, 'index.html');
```

The `join` operator takes care of the difference in "/" and "\" on different OSs.
Lastly, don't forget the protocol: `file:///`.

The issue 


## Architecture
The main file **index.js** is usually very slim, generally used only to oepn the renderers.
Heavy lifting is done by the renderer code itself




## Monaco
1. `npm install --save monaco-loader`