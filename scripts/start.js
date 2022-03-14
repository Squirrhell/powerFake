const {spawn} = require("child_process");

const vite = spawn("npm.cmd", ['run', 'dev']);
let electron;
vite.stdout.on("data", (data) => {
    const str = data.toString();
    if(str.includes("ready in")){
        electron = spawn("npm.cmd", ["run", "electron:start"]);
       // electron.stdout.pipe(process.stdout);
     //   electron.stderr.pipe(process.stderr);
        console.log("in include");
    }
})

vite.stdout.pipe(process.stdout);
vite.stderr.pipe(process.stderr);