import type { MetadataRoute } from 'next';

const siteUrl = 'https://www.digitalplus-platzhalter.ch';

export default function sitemap(): MetadataRoute.Sitemap {
  // Single-page site — search engines don't index URL fragments (#leads etc.)
  // as distinct pages, so the root is the only real entry.
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
