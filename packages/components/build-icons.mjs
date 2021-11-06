import { default as svgr } from '@svgr/core';
import fs from 'fs';
import path from 'path';

const assetPath = './assets';
const iconOutPath = './src/icons';

const files = fs.readdirSync(assetPath).filter((file) => /\.svg$/.test(file));

function customTemplate({ template }, opts, { imports, interfaces, componentName, props, jsx }) {
  const plugins = ['jsx'];
  if (opts.typescript) {
    plugins.push('typescript');
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`${imports}

${interfaces}

export function ${componentName}(${props}): React.ReactElement {
  return ${jsx};
}
  `;
}

(async () => {
  for (const file of files) {
    const [name] = file.split('.');
    const props = name.split(', ');

    let componentName = props.map((prop) => prop.split('=').pop()).join('');

    const m = componentName.match(/(.*)(Default)$/);
    if (m) {
      componentName = m[1];
    }

    const componentFileName = `${componentName}.tsx`;

    // eslint-disable-next-line no-console
    console.log(`generating ${componentFileName} from "${file}"`);

    const svgCode = fs.readFileSync(path.join(assetPath, file), 'utf8');

    let replaceAttrValues;

    if (/Outline$/.test(componentName)) {
      replaceAttrValues = { '#303F9F': 'currentColor' };
    }

    svgr
      .default(
        svgCode,
        {
          template: customTemplate,
          svgo: false,
          typescript: true,
          replaceAttrValues,
          plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        },
        { componentName },
      )
      .then((jsCode) => {
        fs.writeFileSync(path.join(iconOutPath, componentFileName), jsCode);
      });
  }
})();
