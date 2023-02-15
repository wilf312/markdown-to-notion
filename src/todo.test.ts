import { expect, describe, it } from "vitest";
import { lexer } from "./markdownToNotion";

describe("空行のリスト", () => {
  describe.each<[string]>([[`* [ ]`], [`- [ ]`]])("todo list宣言", (x) => {
    it(`lexer(${x}) = [
      [
        {
          type: to_do,
          to_do: {
            rich_text: to_do,
          },
        },
      ],
    ]`, () => {
      expect(lexer(x)).toStrictEqual([
        {
          type: `to_do`,
          to_do: {
            checked: false,
            color: "default",

            rich_text: [
              {
                text: {
                  content: "",
                  link: null,
                },
                type: "text",
              },
            ],
          },
        },
      ]);
    });
  });

  describe.each<[string]>([[`* [x]`], [`- [x]`]])("todo list宣言", (x) => {
    it(`lexer(${x}) = [
      [
        {
          type: to_do,
          to_do: {
            rich_text: to_do,
          },
        },
      ],
    ]`, () => {
      expect(lexer(x)).toStrictEqual([
        {
          type: `to_do`,
          to_do: {
            checked: true,
            color: "default",

            rich_text: [
              {
                text: {
                  content: "",
                  link: null,
                },
                type: "text",
              },
            ],
          },
        },
      ]);
    });
  });
});
