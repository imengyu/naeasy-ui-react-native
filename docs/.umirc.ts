import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'NaEasy UI Docs',
  mode: 'site',
  base: '/pages/naeasy-ui-rn-web-docs/',
  locales: [['zh-CN', '中文']],
  resolve: {
    passivePreview: true ,
  },
  // more config: https://d.umijs.org/config
});
