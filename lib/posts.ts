import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// Trim .md suffix
export function fileName2Id(fileName) {
  return fileName.replace(/\.md$/, '');
}

// List /posts
export function getAllFileNames() {
  return fs.readdirSync(postsDirectory);
}

// Parse gray-matter
export function matterByFileName(fileName) {
  const fullPath = path.join(postsDirectory, fileName);
  return matter.read(fullPath);
}

// Slugs/Ids
export function getAllPostIds() {
  return getAllFileNames().map(fileName2Id).map( (id) => (
    {
      params: {
        id,
      },
    }
  ));
}

export async function getPostData(id) {
  const { data, content } = matterByFileName(`${id}.md`);
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...(data as { date: string, title: string })
  };
}

// Date-sort gray-matter [meta]data
export async function getSortedPostsData() {
  const allPostsData = await Promise.all(
    getAllFileNames().map(fileName2Id).map(getPostData)
  );
  return allPostsData.sort( (a, b) => (a.date < b.date) ? 1 : -1 );
}

