import Head from 'next/head';
import Layout from '../../components/layout';
import Post from '../../components/post';
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
    <Layout>
      <Post post={post} />
    </Layout>
  </>);
}
