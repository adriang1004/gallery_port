import Link from 'next/link';
import Layout from '@/components/Layout';
import Image from 'next/image';

export default function Home() {
  return (
    <Layout>
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to My Photography Portfolio</h1>
        <p className="text-xl mb-8">Explore my albums and read my thoughts on photography.</p>

        {/* Optional hero image */}
        <div className="mb-8">
          <Image
            src="/images/album-digital/IMG_9093 ed.jpg" // Add a hero.jpg or replace this
            alt="Hero shot"
            width={500}
            height={250}
            className="rounded-lg mx-auto"
          />
        </div>

      </div>
    </Layout>
  );
}
