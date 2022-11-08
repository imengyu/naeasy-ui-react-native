const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');

const targetDir = path.resolve(
  __dirname,
  './example/node_modules/imengyu-ui-lib',
);

fsExtra.remove(targetDir).then(() => {
  fs.mkdirSync(targetDir);
  fsExtra.copy(
    path.resolve(__dirname, 'dist'),
    path.resolve(targetDir, 'dist'),
  );
  fsExtra.copy(path.resolve(__dirname, 'src'), path.resolve(targetDir, 'src'));
  fsExtra.copy(
    path.resolve(__dirname, 'android'),
    path.resolve(targetDir, 'android'),
  );
  fsExtra.copy(path.resolve(__dirname, 'ios'), path.resolve(targetDir, 'ios'));
  fs.copyFileSync(
    path.resolve(__dirname, 'package.json'),
    path.resolve(targetDir, 'package.json'),
  );
});
