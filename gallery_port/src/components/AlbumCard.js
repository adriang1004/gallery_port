import Link from 'next/link';
import Image from 'next/image';

export default function AlbumCard({ slug, title, description, folder, coverImage }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      {coverImage && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={`/images/${folder}/${coverImage}`}
            alt={title}
            fill
            className="object-cover rounded"
          />
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link href={`/albums/${slug}`} className="text-blue-600 hover:underline">
        View Album
      </Link>
    </div>
  );
}
