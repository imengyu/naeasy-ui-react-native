import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'NaEasy UI Docs',
  mode: 'site',
  locales: [['zh-CN', '中文']],
  resolve: {
    passivePreview: true ,
  },
  // more config: https://d.umijs.org/config
});
