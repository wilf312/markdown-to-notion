import { expect, it } from "vitest";
import { runNotion } from "./markdownToNotion";

it(`空行は無視される h1とh2のみ返される`, () => {
  expect(
    runNotion(`# text1

## text2
  `)
  ).toStrictEqual([
    {
      type: `heading_1`,
      [`heading_1`]: { rich_text: [`text1`] },
    },
    {
      type: `heading_2`,
      [`heading_2`]: { rich_text: [`text2`] },
    },
  ]);
});

it(`e2e`, () => {
  expect(
    runNotion(`
# やりたいこと
* [ ] 
# Done
## ChatGPT1日1問
## Happenings
* 
## 感謝
* 
  `)
  ).toStrictEqual([
    { type: "heading_1", heading_1: { rich_text: ["やりたいこと"] } },
    {
      type: "to_do",
      to_do: {
        rich_text: [{ type: "text", text: { content: "", link: null } }],
        checked: false,
        color: "default",
      },
    },
    { type: "heading_1", heading_1: { rich_text: ["Done"] } },
    { type: "heading_2", heading_2: { rich_text: ["ChatGPT1日1問"] } },
    { type: "heading_2", heading_2: { rich_text: ["Happenings"] } },
    { type: "bulleted_list_item", bulleted_list_item: { rich_text: `` } },
    { type: "heading_2", heading_2: { rich_text: ["感謝"] } },
    { type: "bulleted_list_item", bulleted_list_item: { rich_text: `` } },
  ]);
});
