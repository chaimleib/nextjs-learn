import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// Trim .md suffix
export function fileName2Id(fileName: string): string {
  return fileName.replace(/\.md$/, '');
}

// List /posts
export function getAllFileNames(): Array<string> {
  return fs.readdirSync(postsDirectory);
}

// Parse gray-matter
export function matterByFileName(fileName: string) {
  const fullPath = path.join(postsDirectory, fileName);
  return matter.read(fullPath);
}

// Slugs/Ids
export function getAllPostIds() {
  return getAllFileNames().map(fileName2Id).map( (id: string) => (
    {
      params: {
        id,
      },
    }
  ));
}

export async function getPostData(id: string): Promise<IPost> {
  const { data, content } = matterByFileName(`${id}.md`);
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(data as { date: string, title: string }),
  };
}

// Date-sort gray-matter [meta]data
export async function getSortedPostsData(): Promise<Array<IPost>> {
  const allPostsData = await Promise.all(
    getAllFileNames().map(fileName2Id).map(getPostData)
  );
  return allPostsData.sort( (
    a: IPost,
    b: IPost,
  ) => (a.date < b.date) ? 1 : -1 );
}

export interface IPost {
  contentHtml: string,
  date: string,
  id: string,
  title: string,
}
