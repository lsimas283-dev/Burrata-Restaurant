import './globals.css';
import { IMAGES } from '@/config/images';

const SITE_URL = process.env.SITE_URL || 'https://burrataemporio.com.br';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Burrata – Empório & Bistrô | Alta Gastronomia Italiana em Teresópolis',
  description: 'Massas artesanais, risotos, burratas e carnes nobres em um ambiente sofisticado e aconchegante. Empório & Bistrô italiano na Av. Oliveira Botelho, Alto, Teresópolis - RJ.',
  keywords: 'Burrata, Empório & Bistrô, restaurante italiano, Teresópolis, massas artesanais, risoto, burrata, alta gastronomia, bistrô, Rio de Janeiro',
  openGraph: {
    title: 'Burrata – Empório & Bistrô',
    description: 'Alta gastronomia italiana em Teresópolis. Massas artesanais, risotos, burratas e uma carta de vinhos cuidadosamente selecionada.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Burrata – Empório & Bistrô',
    images: [{ url: IMAGES.hero }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Burrata – Empório & Bistrô',
    description: 'Alta gastronomia italiana em Teresópolis.',
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#1E1B15',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Burrata – Empório & Bistrô',
  image: `${SITE_URL}${IMAGES.hero}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Oliveira Botelho, 456',
    addressLocality: 'Teresópolis',
    addressRegion: 'RJ',
    postalCode: '25960-004',
    addressCountry: 'BR',
  },
  telephone: '+55 21 97537-2420',
  servesCuisine: ['Italian', 'Empório', 'Bistrô'],
  priceRange: 'R$ 80–180',
  openingHours: 'Tu-Su 18:00-23:30',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', reviewCount: '1000' },
  url: SITE_URL,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-noir text-white antialiased">{children}</body>
    </html>
  );
}
