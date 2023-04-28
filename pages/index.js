import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="text-lg leading-normal">
        <p>Hi! I'm going through the <a href="https://nextjs.org/learn">Next.js tutorial</a>!</p>
        <h2 className="my-4 text-xl font-semibold">Blog posts:</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li className="my-4 mx-4" key={id}>
              <h3 className="font-semibold">
                <Link href={`/posts/${id}`}>{title}</Link>
              </h3>
              {id}<br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
