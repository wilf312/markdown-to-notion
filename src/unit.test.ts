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
      [`heading_1`]: {
        rich_text: [
          {
            text: {
              content: "text1",
              link: null,
            },
          },
        ],
      },
    },
    {
      type: `heading_2`,
      [`heading_2`]: {
        rich_text: [
          {
            text: {
              content: "text2",
              link: null,
            },
          },
        ],
      },
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
    {
      type: "heading_1",
      heading_1: {
        rich_text: [
          {
            text: {
              content: "やりたいこと",
              link: null,
            },
          },
        ],
      },
    },
    {
      type: "to_do",
      to_do: {
        rich_text: [{ type: "text", text: { content: "", link: null } }],
        checked: false,
        color: "default",
      },
    },
    {
      type: "heading_1",
      heading_1: {
        rich_text: [
          {
            text: {
              content: "Done",
              link: null,
            },
          },
        ],
      },
    },
    {
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            text: {
              content: "ChatGPT1日1問",
              link: null,
            },
          },
        ],
      },
    },
    {
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            text: {
              content: "Happenings",
              link: null,
            },
          },
        ],
      },
    },
    { type: "bulleted_list_item", bulleted_list_item: { rich_text: [] } },
    {
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            text: {
              content: "感謝",
              link: null,
            },
          },
        ],
      },
    },
    { type: "bulleted_list_item", bulleted_list_item: { rich_text: [] } },
  ]);
});
