import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 記事のスキーマ。AI下書きツールはこの形式のフロントマターを出力します。
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['国内', '国際', '経済', 'テクノロジー', '解説']),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    verifiedDate: z.coerce.date(),
    readMinutes: z.number().default(8),
    // 出典トランスペアレンシー用
    sourceScore: z.number().min(0).max(100).default(0),
    primarySourceRatio: z.number().min(0).max(100).default(0),
    sourceCount: z.number().default(0),
    opposingViews: z.number().default(0),
    sources: z
      .array(z.object({ label: z.string(), url: z.string().optional() }))
      .default([]),
    // 公開ガード: verified 以外はビルドから除外
    status: z.enum(['draft', 'verified']).default('draft'),
    accent: z.enum(['teal', 'violet', 'amber', 'green', 'blue', 'gold']).default('teal'),
    featured: z.boolean().default(false),
    // 任意：記事ごとの専用OGP画像（/public に置いたファイル名。未指定なら共通画像を使用）
    ogImage: z.string().optional(),
  }),
});

export const collections = { articles };
