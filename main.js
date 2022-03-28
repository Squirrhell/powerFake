const {BrowserWindow, app, dialog, Menu} = require('electron');
const path = require('path');
const zl = require("zip-lib");

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800, 
        minWidth: 600,
        height: 500,
        minHeight: 500,
        show: false,
        icon: "./public/favicon.ico",
        webPreferences : {
           preload : path.join(__dirname, "scripts/preload.js"),
        }
    });
    if(process.env.NODE_ENV !== "production"){
        mainWindow.loadURL("http://localhost:3000");
    }
    else {
        mainWindow.loadFile("./dist/index.html");
    }
    mainWindow.maximize();
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });

    const isDev = process.env.NODE_ENV != "production";
    const isMac = process.platform == "darwin";

    const menu = Menu.buidFromTemplate([
        {
            label : "Fichier",
            submenu : [
                {
                    label : "Ouvrir dossier zip",
                    accelerator : "CmdOrCtrl+O",
                    click : () => {
                        const pathToTargetZip = () => {
                            dialog.showOpenDialog([browserWindow,], defaultPath)
                        }
                        zl.extract(pathToTargetZip, app.getPath("temp")).then(function () {
                            console.log("done");
                        }, function (err) {
                            console.log(err);
                        });
                    }
                },
                {
                    label : "Sauvegarder",
                    accelerator : "CmdOrCtrl+S",
                    click : () => {
                        BrowserWindow.getFocusedWindow().webContents.send("save-file",{});
                    }
                },
            ]
        },
        ...(isMac ? [{role : "appMenu"}] : []),
        {
            label : "Fichiers",
            submenu : [
                {role : "close"},
                {label : "Ouvrir", accelerator : "Ctrl+O"}
            ],
        },
        ...(isDev ? [
            {
                label : "Development",
                submenu : [
                    {role : "toggleDevTools"},
                    {role : "reload"},
                ],
            },
        ]: []),
        {
            label : "A Propos",
            submenu : [
                {
                    label : "Aide",
                    accelerator : "Ctrl+H"
                },
                {
                    label : "Version"
                },
                {
                    type : "separator"
                }
            ],
        },
    ]);
    Menu.setApplicationMenu(menu);
};

app.on("window-all-closed", () => {
    //if(process.plateform != "drawin"){
    if(!isMac){
        app.quit();
    }
});

app.on("activate", () => {
    if(BrowserWindow.getAllWindows().length == 0){
       // createWindow();
    }
});

const launch = async () => {
    await app.whenReady();
    createWindow();
};


launch();