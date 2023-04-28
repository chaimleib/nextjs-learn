import Date from '../components/date';

export default function Post({ post }) {
  return (
    <article>

      <header>
        <h1 className="text-2xl font-semibold">{post.title}</h1>
        <PostMeta post={post} />
      </header>

      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

    </article>
  );
}

export function PostMeta({ post: { date }}) {
  return (
    <section className="truncate-hover-scroll text-slate-500 text-sm space-x-2">
      <Date dateString={date} />
    </section>
  );
}
