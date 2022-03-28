const {contextBridge} = require("electron");
const {writeFile, readFile, openNewDirectory} = require("./api/file.js");
const {traitement} = require("./markdown.js")




console.log("Hello from preload");

contextBridge.exposeInMainWorld("api", {
    writeFile,
    readFile,
    traitement,
});

