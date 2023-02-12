import { generateNotionObject } from "./dist/markdown-to-notion.js";

console.log(
  generateNotionObject(`
# 1
## 2
### 3

`)
);

// console.log(
//   generateNotionObject(`
// # 1
// ## 2
// ### 3

// `)
// );
