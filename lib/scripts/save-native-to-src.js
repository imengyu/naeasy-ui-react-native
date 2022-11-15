const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const srcDir = path.resolve(
  __dirname,
  '../../node_modules/@imengyu/naeasy-ui-react-native',
);
const srcIos = path.resolve(srcDir, './ios');
const srcAndroid = path.resolve(srcDir, './android');
const targetDir = __dirname;
const targetIos = path.resolve(targetDir, '../ios');
const targetAndroid = path.resolve(targetDir, '../android');

fsExtra.copy(srcIos, targetIos);
fsExtra.copy(srcAndroid, targetAndroid);
