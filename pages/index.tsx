import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { PostMeta } from '../components/post';
import { getSortedPostsData, IPost } from '../lib/posts';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({ allPostsData }: {
  allPostsData: Array<IPost>,
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="text-lg leading-normal">
        <p>Hi! I&apos;m going through the <a href="https://nextjs.org/learn">Next.js tutorial</a>!</p>
        <h2 className="my-4 text-xl font-semibold">Blog posts:</h2>
        <ul>
          {allPostsData.map( (post: IPost) => {
            const { id, title } = post;
            return (
              <li className="my-4 mx-4" key={id}>
                <h3 className="font-semibold">
                  <Link href={`/posts/${id}`}>{title}</Link>
                </h3>
                <PostMeta post={post} />
              </li>
            );
          } )}
        </ul>
      </section>
    </Layout>
  );
}
