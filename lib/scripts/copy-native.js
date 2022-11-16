const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const srcDir = __dirname;
const srcIos = path.resolve(srcDir, '../ios');
const srcPod = path.resolve(srcDir, '../RNNaEasyUILib.podspec');
const srcAndroid = path.resolve(srcDir, '../android');
const targetDir = path.resolve(
  __dirname,
  '../../node_modules/@imengyu/naeasy-ui-react-native',
);
const targetIos = path.resolve(targetDir, './ios');
const targetPod = path.resolve(targetDir, './RNNaEasyUILib.podspec');
const targetAndroid = path.resolve(targetDir, './android');

console.log(srcPod + ' > ' + targetPod);
fs.copyFileSync(srcPod, targetPod);

console.log('Delete: ' + targetIos);
fsExtra.remove(targetIos).then(() => {
  fs.mkdirSync(targetIos);
  fsExtra.copy(srcIos, targetIos);
});

console.log('Delete: ' + targetAndroid);
fsExtra.remove(targetAndroid).then(() => {
  fs.mkdirSync(targetAndroid);
  fsExtra.copy(srcAndroid, targetAndroid);
});
