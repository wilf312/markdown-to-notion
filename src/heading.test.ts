import { expect, describe, it } from "vitest";
import { runNotion } from "./markdownToNotion";

describe(`単体のmarkdownテスト`, () => {
  describe(`heading`, () => {
    describe.each<[{ depth: string; depthNum: number; text: string }]>([
      [{ depth: `#`, depthNum: 1, text: `text` }],
      [{ depth: `##`, depthNum: 2, text: `text` }],
      [{ depth: `###`, depthNum: 3, text: `text` }],
      [{ depth: `####`, depthNum: 3, text: `text` }],
    ])("list宣言", ({ depth, depthNum, text }) => {
      it(`runNotion(${depth} ${text}) = [
      ]`, () => {
        expect(runNotion(`${depth} ${text}`)).toStrictEqual([
          {
            type: `heading_${depthNum}`,
            [`heading_${depthNum}`]: {
              rich_text: [{ text: { content: text, link: null } }],
            },
          },
        ]);
      });
    });

    // it(`見出し1-3`, () => {
    //   expect(runNotion(`# text1`)).toStrictEqual([
    //     {
    //       type: `heading_1`,
    //       [`heading_1`]: { rich_text: [`text1`] },
    //     },

    //     {
    //       type: "heading_1",
    //       heading_1: {
    //         rich_text: [{ text: { content: "やりたいこと", link: null } }],
    //       },
    //     },
    //   ]);

    //   expect(runNotion(`## text2`)).toStrictEqual([
    //     {
    //       type: `heading_2`,
    //       [`heading_2`]: { rich_text: [`text2`] },
    //     },
    //   ]);

    //   expect(runNotion(`### text3`)).toStrictEqual([
    //     {
    //       type: `heading_3`,
    //       [`heading_3`]: { rich_text: [`text3`] },
    //     },
    //   ]);

    //   expect(runNotion(`#### text4`)).toStrictEqual([
    //     {
    //       type: `heading_3`,
    //       [`heading_3`]: { rich_text: [`text4`] },
    //     },
    //   ]);
    // });

    // it(`見出し4以上の時はheading_3に変換する`, () => {
    //   expect(runNotion(`#### text4`)).toStrictEqual([
    //     {
    //       type: `heading_3`,
    //       [`heading_3`]: { rich_text: [`text4`] },
    //     },
    //   ]);
    // });
  });
});
