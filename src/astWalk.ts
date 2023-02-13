/**
 * Convert AST string to Notion object
 * @see https://developers.notion.com/reference/block
 * @param {content | root} obj - The object to be converted, either 'content' or 'root' type
 * @returns {string} The Notion formatted string representation of the input object
 */
export const accessNotionObject = (obj: any) => {
  if (typeof obj.length === "number") {
    return obj
      .map((d: any) => {
        return accessNotionObject(d);
      })
      .filter((d: any) => {
        return d !== null;
      })
      .flat();
  }

  // console.log({ obj }, obj.items);
  if (obj.type === `text`) {
    return {
      type: `text`,
      text: { content: obj.value, link: null },
    };
  } else if (obj.type === `thematicBreak`) {
    return {
      type: `divider`,
      divider: {},
    };
  } else if (obj.type === `heading`) {
    // Notionにはheading 3までしか要素がないので、それ以上の場合は3に丸める
    const depth = obj.depth >= 3 ? 3 : obj.depth;

    return {
      type: `heading_${depth}`,
      [`heading_${depth}`]: {
        rich_text: [{ text: { content: obj.text, link: null } }],
      },
    };
  } else if (
    // * は空行のリスト扱いになる
    obj.type === `paragraph` &&
    (obj.raw.trim() === `-` || obj.raw.trim() === `*`)
  ) {
    return {
      type: `bulleted_list_item`,
      bulleted_list_item: {
        rich_text: [],
      },
    };
  } else if (obj.type === `list`) {
    return obj.items.map((d: any) => {
      // TODOリスト、番号付きリスト、並列リスト

      const text = d.text;
      if (text && (text.startsWith(`[ ]`) || text.startsWith(`[x]`))) {
        const done = text.startsWith(`[x]`);
        const formattedText = text.replace("[ ]", "").replace("[x]", "").trim();
        return {
          type: "to_do",
          to_do: {
            rich_text: [
              {
                type: "text",
                text: { content: formattedText, link: null },
              },
            ],
            checked: done,
            color: "default",
          },
        };
      } else {
        const listType = obj.ordered ? `numbered` : `bulleted`;
        return {
          type: `${listType}_list_item`,
          [`${listType}_list_item`]: {
            rich_text: !!d.text
              ? [{ text: { content: d.text, link: null } }]
              : [],
          },
        };
      }
    });
  } else if (obj.type === `space`) {
    return null;
  } else {
    console.log(`unknown`, obj.type, obj);
    return (obj as any).children.map((d: any) => {
      return accessNotionObject(d);
    });
  }
};

/**
 * Convert AST string to Notion object
 * @see https://developers.notion.com/reference/block
 * @param {content | root} obj - The object to be converted, either 'content' or 'root' type
 * @returns {string} The Notion formatted string representation of the input object
 */
export const accessText = (obj: any): string => {
  if (obj.type === `root`) {
    return `[${obj.children
      .map((d: any) => {
        return accessText(d);
      })
      .join(``)}]`;
  } else if (typeof obj.length === "number") {
    const data = obj
      .map((d: any) => {
        return accessText(d);
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
      return accessText(d);
    });
  }
};
