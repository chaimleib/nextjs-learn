import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // List /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Trim .md suffix
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);

    // Parse gray-matter
    const file = matter.read(fullPath);

    return {
      id,
      ...file.data,
    };
  });

  return allPostsData.sort( (a, b) => (a.date < b.date) ? 1 : -1 );
}
