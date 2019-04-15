const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const projectName = process.argv[2];
const boilerplateDir = path.resolve(__dirname, 'boilerplate');
const koaBoilerplate = path.join(boilerplateDir, 'koa');

function genKoaProject(){
    let files = [];
    return fs.copy(koaBoilerplate, projectName, {
        filter(src, dest){
            files.push(dest);
            return true;
        }
    }).then(() => {
        files = [...new Set(files)];
        console.log('')
        files.forEach(file => {
            if(file.endsWith('package.json')){
                const json = fs.readJSONSync(file);
                json.name = projectName;
                fs.writeJSONSync(file, json, {
                    spaces: 2
                });
            }
            console.log(`   ${chalk.green('create')} : ${file}`);
        })
        console.log(`
    install dependencies:
    $ cd ${projectName} && npm install
   
    run the app:
    $ DEBUG=${projectName}:* npm start
    `)
    })
}

if(!projectName){
    console.error('未指定项目名!!!');
    process.exit(-1);
}

genKoaProject();


