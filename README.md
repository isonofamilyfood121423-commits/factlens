# ファクトレンズ（Astro版）

時事ニュース解説メディアの静的サイトジェネレーター版です。記事は Markdown で追加でき、
ビルドは Netlify / Vercel / Cloudflare Pages のクラウド上で実行されるため、
ローカル開発環境がなくても運用できます。

## 構成

```
src/
  content/
    articles/        ← 記事のMarkdown（ここに追加していく）
  content.config.ts  ← 記事のフロントマター定義（出典メタデータ含む）
  layouts/Base.astro
  components/         ← Header / Footer / TransparencyPanel / ArticleCard
  pages/
    index.astro              ← トップページ
    articles/[slug].astro    ← 記事ページのテンプレート
    category/[cat].astro     ← カテゴリ一覧
    about.astro              ← 編集方針・広告開示（E-E-A-T）
  styles/global.css
```

## 記事の追加方法

`src/content/articles/` に `.md` ファイルを置くだけで記事になります。
フロントマターの例：

```yaml
---
title: "記事タイトル"
category: "経済"            # 国内 / 国際 / 経済 / テクノロジー / 解説
excerpt: "一覧やSNSに出る要約文"
publishDate: 2026-06-23
verifiedDate: 2026-06-23
readMinutes: 8
sourceScore: 90            # 出典トランスペアレンシー（0-100）
primarySourceRatio: 75     # 一次ソース比率（0-100）
sourceCount: 5
opposingViews: 2
status: verified           # ★ verified にしないと公開されない（draftはビルド除外）
accent: teal               # teal/violet/amber/green/blue/gold
featured: true             # トップのヒーローに出すなら true（1記事だけ）
sources:
  - label: "総務省 公式統計"
    url: "https://www.stat.go.jp/"
  - label: "（URLなしのソースも可）"
---

本文はMarkdownで書きます。

確認済みの事実は次のように囲みます：
<div class="fact">ここは裏取りした事実。</div>

編集部の見解はこう分けます：
<div class="opinion">ここは意見・解釈。</div>
```

`status: verified` が公開ガードです。AIで下書きを作った直後は `draft` のままにし、
一次ソースで検証してから `verified` に変えて公開してください。

## ローカルで動かす場合（任意）

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に静的ファイルが出力される
```

## クラウドへの公開（推奨・ローカル不要）

1. このフォルダを GitHub リポジトリにpush
2. Netlify か Vercel か Cloudflare Pages で連携
   - Build command: `npm run build`
   - Output directory: `dist`
3. 以後、Markdownを追加してpushするだけで自動デプロイ

`astro.config.mjs` の `site` を自分のドメインに書き換えてください。

## 収益化メモ

- `rel="sponsored nofollow"` をアフィリエイトリンクに付与済み
- 「PR」表示はステマ規制対応。広告枠と編集記事を明確に分離
- about ページに広告開示・編集方針あり（Googleの品質評価=E-E-A-T対策）

## 搭載機能

- **検索**：`/search/` ページでキーワード検索（`/search.json` を読み込むクライアント検索）
- **関連記事**：各記事ページ下部に同カテゴリの記事を自動表示
- **RSS**：`/rss.xml` を自動生成
- **サイトマップ**：`/sitemap-index.xml` を自動生成（`robots.txt` から参照）
- **OGP/Twitterカード**：全ページにメタタグ。共通画像は `public/ogp-default.png`
  記事ごとに専用画像を使う場合はフロントマターに `ogImage: "/ファイル名.png"` を追加

公開前に `astro.config.mjs` の `site` と `public/robots.txt` のドメインを自分のものへ変更してください。
