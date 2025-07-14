import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export default function Home({ photos }) {
  return (
    <div>
      <h1>My Photography Portfolio</h1>
      <div className="gallery">
        {photos.map((photo) => (
          <div key={photo} className="photo">
            <Image
              src={`/images/${photo}`}
              alt={photo}
              width={800}
              height={600}
              layout="responsive"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}

export async function getStaticProps() {
  const imagesDir = path.join(process.cwd(), 'public/images');
  const photos = fs.readdirSync(imagesDir);

  return {
    props: {
      photos,
    },
  };
}
