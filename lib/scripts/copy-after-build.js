const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const targetDir = path.resolve(__dirname, '../dist');

function copyDir(name) {
  const srcDirFinal = srcDir + name;
  const targetDirFinal = targetDir + name;

  console.log(srcDirFinal + ' > ' + targetDirFinal);
  console.log('Delete: ' + targetDirFinal);
  fsExtra.remove(targetDirFinal).then(() => {
    fs.mkdirSync(targetDirFinal);
    fsExtra.copy(srcDirFinal, targetDirFinal);
  });
}

copyDir('/data');
copyDir('/images');
