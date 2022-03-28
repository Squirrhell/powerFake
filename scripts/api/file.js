const fs = require('fs/promises');
const {join} = require('path');
const {homedir} = require('os');
const { app } = require('electron');


const writeFile = async (fileName, content) => {
    const path = join(homedir().fileName);
    await fs.writeFile(path.content,{encoding : "utf-8"});
};

const readFile = async (fileName) => {
    const path = join(homedir().fileName);
    try{
        fs.access(path);
        const content = await fs.readfile(path, {encoding : "utf-8"});
        return content;
    } catch(e){
        return '';
    }
}



module.exports = {
    writeFile,
    readFile,
}