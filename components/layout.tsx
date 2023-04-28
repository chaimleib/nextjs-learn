import Head from 'next/head';
import Image from 'next/image';

import Link from 'next/link';

const name = 'Chaim Halbert';
export const siteTitle = 'Next.js Sample Website';

export default function({ children, home }) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Learn how to build a personal website using Next.js"
      />
      <meta
        property="og:image"
        content={`https://og-image.vercel.app/${encodeURI(
          siteTitle,
        )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
      />
      <meta name="og:title" content={siteTitle} />
      <meta name="twiter:card" content="summary_large_image" />
    </Head>
    <div className="m-8">
      <header className="flex flex-col items-center">
        {home ? <>
          <Image
            priority
            src="/images/profile.jpg"
            className="rounded-full"
            height={144}
            width={144}
            alt=""
          />
          <h1 className="text-2xl font-semibold">{name}</h1>
        </> : <>
          <Link href="/">
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={144}
              width={144}
              alt=""
            />
          </Link>
          <h2 className="text-lg font-semibold">
            <Link href="/" className="text-inherit">
              {name}
            </Link>
          </h2>
        </>}
      </header>
      <main>{children}</main>
      {!home && (
        <div className="my-12">
          <Link href="/">Go back home</Link>
        </div>
      )}
    </div>
  </>;
}
