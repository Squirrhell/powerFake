const hljs = require('highlight.js');

const reg_section = /\n---\n/gm;

const reg_script = /\`\`\`(\w*)\n(((?!\`\`\`)(.|\n))*)\`\`\`/gm;

const reg_code = /\[Code\]\(([^#\)]*)(#(\d*)-(\d*))?\)/gm;

//const reg_balise = /<[^>]*>((\w|\n)*)<\/[^>]*>/gm;


const ex = 'dkljf\n[Code](./asset/dir/path.js)\nkkdj\n```js\n<text-area>fgfgfdg</text-area>\n```\n```bash\nfdg\n<p>kjlkj</p>\n`\nvar foo = function (bar) {\n  return bar++;\n};```\n\n[Code](./assets/monfichier.js#5-20)\nconsole.log(foo(5));\nqdkljdlkfj\n---\ndeuxieme section';


function runRegex(schema, file){
    let result;
    let results = [];
    while((result = schema.exec(file)) !== null){;
        results.push(result);
    }
    return results;
};

const traitement = (file) => {
    //mettre au début et à la fin du fichier respectivement '<section>' et '</section>'
    file = '<section>'+file+'</section>';
    file = file.replace(reg_section, '</section><section>')
    
    const script = runRegex(reg_script, file);
    for(let element of script){
        //console.log(element);
        console.log('Language : '+element[1]);
        console.log('Content : '+element[2]);
        if(element[1] != 'bash'){
            //let el = hljs.highlight(element[2], {language: element[1]}).value;
        }
    }

    console.log('_____');
    const code = runRegex(reg_code, file);
    for(let element of code){
        console.log("File: "+element[1])
        if(element[3] !== undefined){
            console.log("From line "+element[3]+" to "+element[4]);
        } else {
            console.log('All');
        }
    }

    console.log('_____');
    console.log(file);

    return file;
}


//traitement(ex);
//

module.exports = {
    traitement,
}