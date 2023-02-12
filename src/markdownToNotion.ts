import { marked } from "marked";

import { format as browserFormat } from "prettier/standalone";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";

const prettierFormat = (text: string) => {
  try {
    console.log(`globalThis.window !== null`, globalThis.window !== null);
    const p = globalThis.window !== null ? browserFormat : prettier.format;
    return p(text, {
      plugins: [babelParser],
    });
  } catch (error) {
    console.error(error);
    return ``;
  }
};

const markdown2AST = (markdown: string) => {
  return marked.lexer(markdown, {
    // extensions: [gfmTable],
    // mdastExtensions: [gfmTableFromMarkdown],
  });
};

/**
 * Convert AST string to Notion object
 * @see https://developers.notion.com/reference/block
 * @param {content | root} obj - The object to be converted, either 'content' or 'root' type
 * @returns {string} The Notion formatted string representation of the input object
 */
const access = (obj: any): string => {
  if (obj.type === `root`) {
    return `[${obj.children
      .map((d: any) => {
        return access(d);
      })
      .join(``)}]`;
  } else if (typeof obj.length === "number") {
    const data = obj
      .map((d: any) => {
        return access(d);
      })
      .join(``);
    return `const data = [${data}]`;
  }

  if (obj.type === `text`) {
    return `{ type: "text", text: { content: "${obj.value}", link: null } }`;
  } else if (obj.type === `thematicBreak`) {
    return `{ type: "divider", divider: {}, },`;
  } else if (obj.type === `heading`) {
    // Notionにはheading 3までしか要素がないので、それ以上の場合は3に丸める
    const depth = obj.depth >= 3 ? 3 : obj.depth;
    return `{ type: "heading_${depth}", heading_${depth}: { rich_text: [ "${obj.text}" ], }, },`;
  } else if (obj.type === `list`) {
    return obj.items
      .map((d: any) => {
        // TODOリスト、番号付きリスト、並列リスト
        // const node = d?.children[0] as any;

        // if (!node) {
        //   return `{ type: "text", text: { content: "", link: null } }`;
        // }

        // if (node?.type === `thematicBreak`) {
        //   return `{ type: "divider", divider: {}, },`;
        // } else if (node.type === "html") {
        //   return `{ type: "text", text: { content: "", link: null } }`;
        // }

        const text = d.text;
        if (text && (text.startsWith(`[ ] `) || text.startsWith(`[x] `))) {
          const done = text.startsWith(`[x] `);
          const formattedText = text.replace("[ ]", "").replace("[x]", "");
          return `{ type: "to_do", to_do: { rich_text: [ { type: "text", text: { content: "${formattedText}", link: null, }, }, ], checked: ${done.toString()}, color: "default", }, },`;
        } else {
          const listType = obj.ordered ? `numbered` : `bulleted`;
          return `
        { type: "${listType}_list_item", ${listType}_list_item: { rich_text: [
          "${d.text}"
        ], }, },
        `;
        }
      })
      .join(``);
  } else if (obj.type === `space`) {
    return ``;
  } else {
    console.log(`unknown`, obj.type);
    return (obj as any).children.map((d: any) => {
      return access(d);
    });
  }
};

export const run = (markdownText: string) => {
  // markdownをASTに変換
  const ast = markdown2AST(markdownText);

  // ASTをNotionオブジェクトに変換する
  const res = access(ast);

  // テキストをPrettierをフォーマット
  return prettierFormat(res);
};
