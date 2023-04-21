import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/layout';

export default function() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <h1 className="text-xl font-medium mb-2">First Post</h1>
      <Image src="/images/profile.jpg" height={144} width={144} alt="profile" />
    </Layout>
  );
}
