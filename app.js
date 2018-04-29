const fs = require('fs');

console.log("Lendo arquivos...");
const style = fs.readFileSync('./build/css/style.css', 'utf8');
const html = fs.readFileSync('./build/html/modal.html', 'utf8');
const sourceJS = fs.readFileSync('./build/js/source.js', 'utf8');

console.log("Concatenando arquivos...");
// cria as variaveis 'style' e 'modalHtml' no arquivo build.js
const buildJS = `var style='<style>${style}</style>';var modalHtml='${html}';${sourceJS}`;

console.log("Criando build.js...");
fs.writeFileSync('./build/js/build.js', buildJS, 'utf8');

console.log("Done!");