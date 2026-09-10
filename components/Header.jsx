import Link from 'next/link';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="header-logo">
          BGM
        </Link>

        <nav className="header-nav">
          <Link href="/company/about">COMPANY</Link>
          <Link href="/artist">ARTISTS</Link>
          <Link href="/news">NEWS</Link>
          <Link href="/company/contact">CONTACT</Link>
        </nav>
      </div>
    </header>
  );
}
