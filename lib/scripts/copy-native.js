const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const targetDir = path.resolve(__dirname, '../../node_modules/imengyu-ui-lib');
const targetIos = path.resolve(targetDir, './ios');
const targetAndroid = path.resolve(targetDir, './android');

console.log('Delete: ' + targetIos);
fsExtra.remove(targetIos).then(() => {
  fs.mkdirSync(targetIos);
  fsExtra.copy(path.resolve(__dirname, '../ios'), targetIos);
});

console.log('Delete: ' + targetAndroid);
fsExtra.remove(targetAndroid).then(() => {
  fs.mkdirSync(targetAndroid);
  fsExtra.copy(path.resolve(__dirname, '../android'), targetAndroid);
});
