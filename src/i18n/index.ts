import { getRelativeLocaleUrl } from 'astro:i18n';
import { en } from './en';
import { sq } from './sq';

export type Locale = 'en' | 'sq';
export type Page = keyof typeof en.nav;
export const pages: Page[] = ['home', 'products', 'operations', 'projects', 'about', 'contact', 'quote'];
export const navPages: Page[] = ['home', 'products', 'operations', 'projects', 'about', 'contact'];
export const translations = { en, sq };
export const localeTag = (locale: Locale) => locale === 'sq' ? 'sq-AL' : 'en-GB';
export const number = (value: number, locale: Locale) => new Intl.NumberFormat(localeTag(locale)).format(value);
export const href = (locale: Locale, page: Page = 'home') => getRelativeLocaleUrl(locale, page === 'home' ? '' : page);