import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = (await getCollection('articles', (e) => e.data.status === 'verified'))
    .sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());

  return rss({
    title: 'ファクトレンズ',
    description: 'ニュースを、ちゃんと理解する。出典で確かめるニュース解説メディア。',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.excerpt,
      pubDate: a.data.publishDate,
      categories: [a.data.category],
      link: `/articles/${a.id}/`,
    })),
    customData: `<language>ja</language>`,
  });
}
