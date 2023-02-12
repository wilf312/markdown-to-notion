// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      // 複数のエントリーポイントのディクショナリや配列にもできます
      entry: resolve(__dirname, "src/main.ts"),
      name: "MarkdownToNotion",
      // 適切な拡張子が追加されます
      fileName: "markdown-to-notion",
    },
    rollupOptions: {
      // // ライブラリにバンドルされるべきではない依存関係を
      // // 外部化するようにします
      // external: ['vue'],
      // output: {
      //   // 外部化された依存関係のために UMD のビルドで使用する
      //   // グローバル変数を提供します
      //   globals: {
      //     vue: 'Vue',
      //   },
      // },
    },
  },
});
