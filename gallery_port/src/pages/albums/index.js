import fs from 'fs';
import path from 'path';
import AlbumCard from '@/components/AlbumCard';
import Layout from '@/components/Layout';

export default function Albums({ albums }) {
  return (
    <Layout> 
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Albums</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {albums.map((album) => (
          <AlbumCard key={album.slug} {...album} />
        ))}
      </div>
    </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'albums.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const albums = JSON.parse(jsonData);

  return {
    props: {
      albums,
    },
  };
}
