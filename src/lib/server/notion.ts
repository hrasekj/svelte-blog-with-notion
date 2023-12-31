import { NOTION_ACCESS_TOKEN, NOTION_BLOG_DATABASE_ID } from '$env/static/private';
import type { BlogPost, PostPage, Tag } from '$types/schema';
import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

const databaseId = NOTION_BLOG_DATABASE_ID;
const client = new Client({ auth: NOTION_ACCESS_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: client });

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  const response = await client.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: {
        equals: true
      }
    },
    sorts: [
      {
        property: 'CreatedAt',
        direction: 'descending'
      }
    ]
  });

  return response.results.reduce<BlogPost[]>((acc, page) => {
    if (isPageObjectResponse(page)) {
      return acc.concat(pageToPostTransformer(page));
    }

    // eslint-disable-next-line no-console
    console.error('Not PageObjectResponse');
    return acc;
  }, []);
}

export async function getSingleBlogPost(slug: string): Promise<PostPage> {
  // list of blog posts
  const response = await client.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Slug',
      formula: {
        string: { equals: slug }
      }
      // TODO add option for tags in the future
    },
    sorts: [
      {
        property: 'CreatedAt',
        direction: 'descending'
      }
    ]
  });

  if (response.results.length === 0) {
    throw new Error('No results available');
  }

  // grab page from notion
  const page = response.results[0];

  if (!isPageObjectResponse(page)) {
    throw new Error('Page is not complete');
  }

  const typeHackPage = page as PageObjectResponse;

  const mdBlocks = await n2m.pageToMarkdown(typeHackPage.id);
  const mdObject = n2m.toMarkdownString(mdBlocks);

  const post = pageToPostTransformer(typeHackPage);

  return {
    post,
    markdown: Object.values(mdObject).join('\n')
  };
}

function isPageObjectResponse(
  page: PartialPageObjectResponse | PageObjectResponse | PartialDatabaseObjectResponse
): page is PageObjectResponse {
  return (
    // eslint-disable-next-line no-prototype-builtins
    page.object === 'page' && page.hasOwnProperty('id') && Object.keys(page).length > 2
  );
}

function pageToPostTransformer(page: PageObjectResponse): BlogPost {
  return {
    id: page.id,
    cover: getCoverImage(page),
    title: getTitle(page),
    tags: getMultiSelect(page, 'Tags'),
    description: getRichText(page, 'Description'),
    date: getCreatedTime(page, 'CreatedAt'),
    slug: getFormula(page, 'Slug')
  };
}

function getCoverImage(page: PageObjectResponse): string | undefined {
  let cover: string | undefined;

  /* eslint-disable indent */
  switch (page.cover?.type) {
    case 'file':
      cover = page.cover?.file.url ?? '';
      break;
    case 'external':
      cover = page.cover?.external.url ?? '';
      break;
  }
  /* eslint-disable */

  return cover;
}

function getTitle(page: PageObjectResponse): string {
  const prop = page.properties.Name;
  if (prop.type === 'title' && prop.title.length > 0) {
    return prop.title.reduce((acc, text) => {
      if (text.type === 'text') {
        return acc + text.plain_text;
      }
      return acc;
    }, '');
  }
  return '';
}

function getMultiSelect(page: PageObjectResponse, key: string): Tag[] {
  const prop = page.properties[key];
  if (prop.type === 'multi_select') {
    return prop.multi_select;
  }
  return [];
}

function getRichText(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop.type === 'rich_text' && prop.rich_text.length > 0) {
    return prop.rich_text[0].plain_text;
  }
  return '';
}

function getCreatedTime(page: PageObjectResponse, key: string): Date {
  const prop = page.properties[key];
  if (prop.type === 'created_time') {
    return new Date(prop.created_time);
  }
  return new Date(page.created_time);
}

function getFormula(page: PageObjectResponse, key: string): string {
  const prop = page.properties[key];
  if (prop.type === 'formula' && prop.formula.type === 'string') {
    return prop.formula.string ?? '';
  }
  return '';
}
