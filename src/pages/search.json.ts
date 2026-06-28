import { getCollection } from 'astro:content';

export async function GET() {
  const articles = await getCollection('articles', (e) => e.data.status === 'verified');
  const index = articles.map((a) => ({
    title: a.data.title,
    excerpt: a.data.excerpt,
    category: a.data.category,
    url: `/articles/${a.id}/`,
    readMinutes: a.data.readMinutes,
    sourceCount: a.data.sourceCount,
    // 検索対象テキスト（タイトル＋要約＋カテゴリ）
    text: `${a.data.title} ${a.data.excerpt} ${a.data.category}`.toLowerCase(),
  }));
  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
