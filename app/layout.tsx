import { Providers } from './providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI助手',
  description: '您的智能对话伙伴',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
