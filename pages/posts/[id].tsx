import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Layout from '../../components/layout';
import Post from '../../components/post';
import { getAllPostIds, getPostData, IPost } from '../../lib/posts';

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params.id !== 'string') {
    return { notFound: true };
  }

  const post = await getPostData(params.id);
  return {
    props: {
      post,
    },
  };
};

export default function MainPost({ post }: { post: IPost }) {
  return (<>
    <Head>
      <title>{post.title}</title>
    </Head>
    <Layout>
      <Post post={post} />
    </Layout>
  </>);
}
