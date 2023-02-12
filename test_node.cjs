const { generateNotionObject } = require("./dist/markdown-to-notion.umd.cjs");
// ブラウザからの呼び出しができるか確認する

console.log(
  generateNotionObject(`
# 1
## 2
### 3

`)
);
