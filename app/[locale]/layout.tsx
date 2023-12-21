import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import 'styles/globals.css';
import { LOCALE_PROPS } from '../constants/translation';
import { ReactNode } from 'react';
import { NextIntlClientProvider, createTranslator } from 'next-intl';

const inter = Inter({
  subsets: ['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: ['serif'],
});

async function getTranslations(locale: string) {
  try {
    return (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export function generateStaticParams() {
  return LOCALE_PROPS;
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: Props): Promise<Metadata> {
  const translations = await getTranslations(locale);
  const t = createTranslator({ locale, messages: translations });

  return {
    title: t('localeLayoutMeta.title'),
    description: t('localeLayoutMeta.description'),
    manifest: '/manifest.json',
    icons: {
      apple: '/favicon/icon.png',
      icon: '/favicon/icon.png',
      shortcut: '/favicon/icon.png',
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  console.log({ locale });

  let translations;

  try {
    translations = await getTranslations(locale);
  } catch (error) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={LOCALE_PROPS.find((prop) => prop.locale === locale)?.dir}
    >
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={translations}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
