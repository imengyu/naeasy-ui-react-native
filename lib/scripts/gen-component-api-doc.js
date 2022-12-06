const mri = require('mri');
const argv = process.argv.slice(2);
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

### Props

|名称|说明|类型|必填|默认值|
|--|--|--|--|--|${sProps}`
        : '') +
      (sMethods !== ''
        ? `

### Methods

|名称|说明|参数|返回|Docblock|
|--|--|--|--|--|${sMethods}
  `
        : ''),
  );
});
