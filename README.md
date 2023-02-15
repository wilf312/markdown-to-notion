# markdown-to-notion


## マイグレーション / Migration
0.0.5 -> 0.1.0

runNotion -> lexer
runText -> parse

## 概要 / Description

このライブラリは notion API を叩くときに必要なページオブジェクトを markdown から生成するためのツールです。

This library is a tool for generating the necessary page objects when hitting the Notion API, from Markdown. In other words, using this library makes it easy to convert Markdown format data into Notion pages when calling the Notion API.

## このライブラリの使い方 / how to use

```
import { lexer, parse } from "markdown-to-notion";

const markdownText = `
# heading1
## heading2

* [ ] task1
* [x] task2
`

const notionObject = lexer(markdownText); // for Notion API
const notionObjectText = parse(markdownText); // for Text


notion.pages.create({
  parent: { database_id: YOUR_DATABASE_ID },
  properties: YOUR_PROPERTY,
  children: lexer(`
# Today task
* [ ] task1
* [ ] task2

## Happenings
*

`),
})

```

