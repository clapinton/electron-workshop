1. `npm init` to create package.json. Electron app is just a node app;
2. `npm install --save electron`

3. Add `electron .` as a `start` script to package.json
That'll run the `main` script from package.json, which will create the renderes. We then need to add a script to package.json to run another js file,
which will be the window itself.

`app` API endpoint has all the methods and events you'll beed to interact with the app itself, like creating and opening a new browser window;

