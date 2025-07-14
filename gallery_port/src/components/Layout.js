import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-darkbg text-gray-100">
      <header className="p-4 bg-darkaccent">
        <nav className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/albums">Albums</Link>
          <Link href="/blog">Blog</Link>
        </nav>
      </header>
      <main className="flex-grow w-full px-4 py-8">{children}</main>
      <footer className="p-4 bg-darkaccent text-center">
        &copy; {new Date().getFullYear()} Adrian
      </footer>
    </div>
  );
}
