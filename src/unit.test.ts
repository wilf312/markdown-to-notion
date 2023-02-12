import { expect, describe, it } from "vitest";
import { runNotion } from "./markdownToNotion";

describe(`単体のmarkdownテスト`, () => {
  describe(`heading`, () => {
    it(`見出し1-3`, () => {
      expect(runNotion(`# text1`)).toStrictEqual([
        {
          type: `heading_1`,
          [`heading_1`]: { rich_text: [`text1`] },
        },
      ]);

      expect(runNotion(`## text2`)).toStrictEqual([
        {
          type: `heading_2`,
          [`heading_2`]: { rich_text: [`text2`] },
        },
      ]);

      expect(runNotion(`### text3`)).toStrictEqual([
        {
          type: `heading_3`,
          [`heading_3`]: { rich_text: [`text3`] },
        },
      ]);

      expect(runNotion(`#### text4`)).toStrictEqual([
        {
          type: `heading_3`,
          [`heading_3`]: { rich_text: [`text4`] },
        },
      ]);
    });

    it(`見出し4以上の時はheading_3に変換する`, () => {
      expect(runNotion(`#### text4`)).toStrictEqual([
        {
          type: `heading_3`,
          [`heading_3`]: { rich_text: [`text4`] },
        },
      ]);
    });
  });
  describe(`list`, () => {
    it(`番号なしリスト`, () => {
      expect(
        runNotion(`* text1
* text2`)
      ).toStrictEqual([
        [
          {
            type: `bulleted_list_item`,
            [`bulleted_list_item`]: {
              rich_text: [`text1`],
            },
          },
          {
            type: `bulleted_list_item`,
            [`bulleted_list_item`]: {
              rich_text: [`text2`],
            },
          },
        ],
      ]);
    });

    it(`番号つきリスト`, () => {
      expect(
        runNotion(`1. text1
1. text2`)
      ).toStrictEqual([
        [
          {
            type: `numbered_list_item`,
            [`numbered_list_item`]: {
              rich_text: [`text1`],
            },
          },
          {
            type: `numbered_list_item`,
            [`numbered_list_item`]: {
              rich_text: [`text2`],
            },
          },
        ],
      ]);
    });

    describe(`todoリスト`, () => {
      it(`todoリスト checked`, () => {
        expect(runNotion(`* [x] text2`)).toStrictEqual([
          [
            {
              type: `to_do`,
              to_do: {
                rich_text: [
                  {
                    type: "text",
                    text: { content: `text2`, link: null },
                  },
                ],
                checked: true,
                color: "default",
              },
            },
          ],
        ]);
      });
      it(`todoリスト unchecked`, () => {
        expect(runNotion(`* [ ] text1`)).toStrictEqual([
          [
            {
              type: `to_do`,
              to_do: {
                rich_text: [
                  {
                    type: "text",
                    text: { content: `text1`, link: null },
                  },
                ],
                checked: false,
                color: "default",
              },
            },
          ],
        ]);
      });
    });
  });
});

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
