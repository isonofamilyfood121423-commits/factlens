import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 公開時は 'https://example.com' を自分のドメインに変更してください（サイトマップ・RSS・OGPに使われます）
export default defineConfig({
  site: 'https://example.com',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
