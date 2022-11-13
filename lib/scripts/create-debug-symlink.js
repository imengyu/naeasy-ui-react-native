const { exec } = require('child_process');
const path = require('path');

const source = path.resolve(__dirname, '../../src/lib-link');
const target = path.resolve(__dirname, '../src');

switch (process.platform) {
  case 'linux':
  case 'darwin':
    exec(`ln -s /d "${target}" "${source}"`);
    break;
  case 'win32': //windows 系统内核
    exec(`mklink /d "${source}" "${target}"`);
    break;
}
