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
  const post = getPostData(params.id);
  return {
    props: {
      post,
    },
  };
}

export default function Post({ post }) {
  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-center">{post.title}</h1>

      <section className="truncate-hover-scroll text-slate-500 text-sm text-center space-x-2">
          {[
            { key: 'id', contents: post.id },
            { key: 'date', contents: post.date },
          ].map( ({ key, contents }, i) => (<>
            { i>0 ? <span>•</span> : null }
            <div className="inline-block" key={key}>{contents}</div>
          </>))}
      </section>

      <content>
        {post.content}
      </content>

    </Layout>
  );
}
