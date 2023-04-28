import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

// Trim .md suffix
export function fileName2Id(fileName) {
  return fileName.replace(/\.md$/, '');
}

// List /posts
export function allFileNames() {
  return fs.readdirSync(postsDirectory);
}

// Parse gray-matter
export function matterByFileName(fileName) {
  const fullPath = path.join(postsDirectory, fileName);
  return matter.read(fullPath);
}

export function getSortedPostsData() {
  const allPostsData = allFileNames().map((fileName) => {
    const file = matterByFileName(fileName);
    return {
      id: fileName2Id(fileName),
      ...file.data,
    };
  });

  return allPostsData.sort( (a, b) => (a.date < b.date) ? 1 : -1 );
}

export function getAllPostIds() {
  return allFileNames().map( (fileName) => (
    {
      params: {
        id: fileName2Id(fileName),
      },
    }
  ));
}

export function getPostData(id) {
  const file = matterByFileName(`${id}.md`);
  return {
    id,
    ...file.data,
  };
}
