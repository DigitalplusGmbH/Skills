import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site — search engines don't index URL fragments (#leads etc.)
  // as distinct pages, so the root is the only real entry.
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
