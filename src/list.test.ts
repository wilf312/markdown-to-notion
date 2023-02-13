import { expect, describe, test } from "vitest";
import { runNotion } from "./markdownToNotion";

describe("空行のリスト", () => {
  describe.each<[string]>([[`* `], [`- `], [`*`], [`-`]])("list宣言", (x) => {
    test(`runNotion(${x}) = [
      [
        {
          type: bulleted_list_item,
          bulleted_list_item: {
            rich_text: bulleted_list_item,
          },
        },
      ],
    ]`, () => {
      expect(runNotion(x)).toStrictEqual([
        [
          {
            type: `bulleted_list_item`,
            bulleted_list_item: {
              rich_text: ``,
            },
          },
        ],
      ]);
    });
  });
});
