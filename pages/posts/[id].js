import { Fragment } from 'react';
import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostData(params.id);
  return {
    props: {
      post,
    },
  };
}

export default function MainPost({ post }) {
  return (<>
    <Head>
      <title>{post.title}</title>
    </Head>
    <Post post={post} />
  </>);
}

export function Post({ post }) {
  return (
    <Layout>
      <article>
        <PostHeader post={post} />
        <content dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
}

function PostHeader({ post: { title, id, date }}) {
  return (
    <header>

      <h1 className="text-2xl font-semibold text-center">{title}</h1>

      <section
        className="truncate-hover-scroll text-slate-500 text-sm text-center space-x-2"
      >
        <Date dateString={date} />
      </section>

    </header>
  );
}
