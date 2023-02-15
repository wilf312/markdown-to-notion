import { expect, describe, test } from "vitest";
import { lexer } from "./markdownToNotion";

describe("空行のリスト", () => {
  describe.each<[string]>([[`* `], [`- `], [`*`], [`-`]])("list宣言", (x) => {
    test(`lexer(${x}) = [
      [
        {
          type: bulleted_list_item,
          bulleted_list_item: {
            rich_text: bulleted_list_item,
          },
        },
      ],
    ]`, () => {
      expect(lexer(x)).toStrictEqual([
        {
          type: `bulleted_list_item`,
          bulleted_list_item: {
            rich_text: [],
          },
        },
      ]);
    });
  });
});
