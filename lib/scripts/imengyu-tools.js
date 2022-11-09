/* eslint-disable no-eval */
const mri = require('mri');
const fs = require('fs');
const { exit } = require('process');
const argv = process.argv.slice(2);

const args = mri(argv, {});



switch (args._[0]) {
  case 'iconfont':
    const sourceJs = args._[1];
    if (!fs.existsSync(sourceJs)) {
      console.log('Source Js not exists ' + sourceJs);
      exit(-1);
    }

    const js = fs.readFileSync(sourceJs).toString();
    if (!global.window) {
      global.window = {};
    }

    const startPos = js.indexOf('<svg>');
    const endPos = js.lastIndexOf('</svg>');

    if (startPos < 0 || endPos < 0) {
      console.log('Not found <svg> in this file');
      exit(-1);
    }

    const svg = js.substring(startPos, endPos);

    const { XMLParser } = require('fast-xml-parser');
    const options = {
      ignoreAttributes: false,
      attributeNamePrefix: '',
      stopNodes: ['svg.symbol'],
    };

    const parser = new XMLParser(options);
    const jsonObj = parser.parse(svg);
    const symbolObj = jsonObj.svg.symbol;

    const finalObject = {};

    for (const key in symbolObj) {
      const item = symbolObj[key];
      finalObject[item.id] = `<svg viewBox="${item.viewBox}" xmlns="http://www.w3.org/2000/svg">${item['#text']}</svg>`;
    }

    fs.writeFileSync(sourceJs + '.output.js', JSON.stringify(finalObject));
    console.log('Success output to ' + sourceJs + '.output.js');
    break;
  default:
    console.log('Unknow option ' + args._[0]);
    exit(-1);
    break;
}
