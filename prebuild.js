const fs = require('fs');
const package = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

console.log('src/app/core/services/version-info.ts');
fs.writeFileSync(
  'src/common/dto/arcane-archive/version-info.ts',
`export const versionInfo = {
  version: "${package.version}"
};
`);

console.log('prebuild finished');