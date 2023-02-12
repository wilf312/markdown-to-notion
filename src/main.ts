import { runNotion } from "./markdownToNotion";

export const generateNotionObject = (text: string) => {
  return runNotion(text);
};

// const res = generateNotionObject(`
// # heading h1
// ## heading h2
// ### heading h3
// #### heading h4
// ##### heading h5
// ###### heading h6

// * list 1
// * list 2
// * list 3
// * list 4

// 1. ol1
// 1. ol2
// 1. ol3
// 1. ol4
// 1. ol5

// * [ ] todo1
// * [x] todo2
//   `);

// console.log(res);
