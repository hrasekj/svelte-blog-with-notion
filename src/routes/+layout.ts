import { PUBLIC_SITE_DESCRIPTION, PUBLIC_SITE_KEYWORDS, PUBLIC_SITE_NAME } from '$env/static/public';

/** @type {import('./$types').LayoutServerLoad} */
export function load() {
  return {
    seo: {
      title: PUBLIC_SITE_NAME,
      description: PUBLIC_SITE_DESCRIPTION,
      keywords: PUBLIC_SITE_KEYWORDS,

      openGraph: {
        type: 'website',
        locale: 'en_GB',
        siteName: PUBLIC_SITE_NAME,
        images: [
          {
            url: 'https://img.travel.rakuten.co.jp/m17n/com/campaign/ranking/ninja/img/key.jpg',
            width: 2000,
            height: 1333
          }
        ]
      }
    }
  };
}
