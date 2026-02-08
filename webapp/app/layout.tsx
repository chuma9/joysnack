import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'joysnack — uplifting moments, one snack at a time',
  description: 'A wholesome feed of AI-generated uplifting content designed to brighten your day',
};

export const viewport: Viewport = {
  themeColor: '#fdfcfa',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
