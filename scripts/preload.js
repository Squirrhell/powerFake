const {contextBridge} = require("electron");
const {writeFile, readFile, openNewDirectory} = require("./api/file.js");




console.log("Hello from preload");

contextBridge.exposeInMainWorld("api", {
    writeFile,
    readFile,
});

