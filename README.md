# markdown-to-notion

このライブラリはnotion APIを叩くときに必要なページオブジェクトをmarkdownから生成するためのツールです。
This library is a tool for generating the necessary page objects when hitting the Notion API, from Markdown. In other words, using this library makes it easy to convert Markdown format data into Notion pages when calling the Notion API.

## このライブラリの使い方 / how to use

```
import { runNotion, runText } from "markdown-to-notion";

const markdownText = `
# heading1
## heading2

* [ ] task1
* [x] task2
`

const notionObject = runNotion(markdownText); // for Notion API
const notionObjectText = runText(markdownText); // for Text

```

