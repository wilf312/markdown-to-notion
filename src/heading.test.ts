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
});
