/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['./src/index.ts'],
  plugin: ['typedoc-plugin-markdown'],
  githubPages: false,
  readme: 'none',
  cleanOutputDir: true,
};
