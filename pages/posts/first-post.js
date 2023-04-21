import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function() {
  return <>
    <Head>
      <title>First Post</title>
    </Head>
    <h1>First Post</h1>
    <Image src="/images/profile.jpg" height={144} width={144} alt="profile" />
    <h2>
      <Link href="/">Go back home</Link>
    </h2>
  </>;
}
