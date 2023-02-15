import { marked } from "marked";

import { format as browserFormat } from "prettier/standalone";
import prettier from "prettier";
import babelParser from "prettier/parser-babel";
import { accessNotionObject, accessText } from "./astWalk";

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

export const parse = (markdownText: string) => {
  // markdownをASTに変換
  const ast = markdown2AST(markdownText);

  // ASTをNotionオブジェクトに変換する
  const res = accessText(ast);

  // テキストをPrettierをフォーマット
  return prettierFormat(res);
};

export const lexer = (markdownText: string) => {
  // markdownをASTに変換
  const ast = markdown2AST(markdownText);

  // ASTをNotionオブジェクトに変換する
  const res = accessNotionObject(ast);

  // console.log("res", JSON.stringify(res));

  return res;
};
