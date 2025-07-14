import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Album({ album, images }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  // Client-side pagination state
  const IMAGES_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const startIdx = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIdx = startIdx + IMAGES_PER_PAGE;
  const paginatedImages = images.slice(startIdx, endIdx);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <Layout>
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">{album.title}</h1>
      <p className="mb-8 text-gray-600">{album.description}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedImages.map((image) => (
          <div
            key={image}
            className="relative w-full h-64 cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <Image
              src={`/images/${album.folder}/${image}`}
              alt={album.title}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-8">
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox}
        >
          <div className="relative w-11/12 md:w-2/3 lg:w-1/2 h-auto">
            <Image
              src={`/images/${album.folder}/${lightboxImage}`}
              alt="Large view"
              width={1200}
              height={800}
              className="rounded"
            />
          </div>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl font-bold"
          >
            &times;
          </button>
        </div>
      )}
    </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'src', 'content', 'albums.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const albums = JSON.parse(jsonData);

  const paths = albums.map((album) => ({
    params: { slug: album.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'src', 'content', 'albums.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const albums = JSON.parse(jsonData);

  const album = albums.find((a) => a.slug === params.slug);

  if (!album) {
    return { notFound: true };
  }

  const imagesDir = path.join(process.cwd(), 'public', 'images', album.folder);
  let images = [];
  try {
    images = fs.readdirSync(imagesDir).filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );
  } catch (err) {
    console.error(`Error reading images folder: ${imagesDir}`, err);
  }

  return {
    props: {
      album,
      images,
    },
  };
}
