import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css'; // 글로벌 CSS 스타일 (Tailwind CSS)

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
