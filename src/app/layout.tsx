import { ClientLayout } from './ClientLayout';
import { Inter, Roboto_Mono, Poppins } from 'next/font/google';
import './globals.css';
// import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Fitrace',
  description: 'Web3 lifestyle application on Starknet',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${roboto_mono.variable}`}
    >
      <head />
      <body>
        <div className="flex pt-2 flex-col min-h-screen bg-white dark:bg-gray-900">
          <ClientLayout>{children}</ClientLayout>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
