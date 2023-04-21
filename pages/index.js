import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className="text-lg leading-6">
        <p>Hi! I'm going through the <a href="https://nextjs.org/learn">Next.js tutorial</a>!</p>
        <ul>
          <li><Link href="/posts/first-post">First post</Link></li>
        </ul>
      </section>
    </Layout>
  );
}
