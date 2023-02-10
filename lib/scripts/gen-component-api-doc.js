/* eslint-disable curly */
const mri = require('mri');
const argv = process.argv.slice(2);
const fs = require('fs');
const docgen = require('react-docgen-typescript');
const args = mri(argv, {});

const options = docgen.withCustomConfig('./tsconfig.json', {
  savePropValueAsString: true,
});
// Parse a file for docgen info
const docs = docgen.parse(args._[0], options);

docs.forEach(doc => {
  let sProps = '';
  for (const key in doc.props) {
    const prop = doc.props[key];
    sProps += `\n|${prop.name}|${prop.description}|\`${prop.type.name.replace(
      /\|/g,
      '&#124;',
    )}\`|${prop.required ? '✓' : '-'}|${
      prop.defaultValue ? `\`${prop.defaultValue?.value}\`` : '-'
    }|`;
  }

  let sMethods = '';
  for (const key in doc.methods) {
    const method = doc.methods[key];
    sMethods += `\n|${method.name}|${method.description}|${method.params}|${method.returns}|${method.docblock}|`;
  }

  console.log(
    `
### ${doc.displayName}
  
${doc.description}` +
      (sProps !== ''
        ? `

#### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|${sProps}`
        : '') +
      (sMethods !== ''
        ? `

#### Methods

|名称|说明|参数|返回|Docblock|
|--|--|--|--|--|${sMethods}
  `
        : ''),
  );
});

function isNumber(val) {
  if (typeof val === 'undefined') return false;
  const regPos = /^\d+(\.\d+)?$/; //非负浮点数
  const regNeg =
    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(val) || regNeg.test(val)) {
    return true;
  } else {
    return false;
  }
}

fs.readFile(
  args._[0] ||
    'D:/Code/GitHub/imengyu-ui-lib/lib/src/components/basic/Cell.tsx',
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const sourceString = ('' + data).replace(/\n|\r/g, '');

    const keys = [
      'getThemeVars({',
      'getThemeColorVars({',
      'resolveThemeProps(props, {',
      'DynamicVar(',
      'DynamicColorVar(',
      'getThemeVar(',
      'getThemeColorVar(',
    ];

    const results = {};

    for (let j = 0; j < keys.length; j++) {
      let str = '' + sourceString;
      let has = true;
      while (has) {
        let i = str.indexOf(keys[j]);
        has = i >= 0;
        if (i > 0) {
          const start = i + keys[j].length;
          const str2 = str.substring(start);
          let end = str2.indexOf(j < 3 ? '})' : ')');
          if (end <= 0) {
            i = 0;
            break;
          }

          if (j < 3) {
            const arr = str2.substring(0, end).split(',');
            for (const strs of arr) {
              const kstr = strs.split(':');
              const k0 = kstr[0].trim().replace(/'/g, '');
              const k1 = (kstr[1] || kstr[0]).trim();
              if (k0) {
                if (j === 2) results[k1.replace(/'/g, '')] = `props.${k0}`;
                else results[k0] = k1;
              }
            }
          } else {
            const leftQutoPos = str2.indexOf('(');
            if (leftQutoPos > 1 && leftQutoPos < end) {
              end++;
            }
            const kstr = str2.substring(0, end).split(',');
            results[kstr[0].trim().replace(/'/g, '')] = kstr[1].trim();
          }
          str = str2;
        }
      }
    }

    let sProps = '',
      count = 0;
    const resultsKeys = Object.keys(results).sort((a, b) => a.localeCompare(b));
    resultsKeys.forEach(key => {
      const prop = '' + results[key];
      let type = '-';
      if (prop.startsWith('Color.')) type = 'ColorInfoItem';
      else if (prop.startsWith('rpx(')) type = 'number';
      else if (prop.startsWith("'") && prop.endsWith("'")) type = 'string';
      else if (prop === 'true' || prop === 'false') type = 'boolean';
      else if (isNumber(prop)) type = 'number';

      sProps += `\n|${key}|${type}|\`${prop}\`|`;
      count++;
    });

    console.log(`
## 主题变量

|名称|类型|默认值|
|--|--|--|${sProps}

共 ${count} 个
`);
  },
);
