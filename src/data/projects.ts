import type { Locale } from '../i18n';
export type ProjectCategory = 'roads' | 'construction' | 'coastal' | 'infrastructure';
export interface Project {
  id: string;
  category: ProjectCategory;
  location: string;
  year: number;
  tonnes: number;
  image: 'roadwork' | 'quarry' | 'trucks' | 'plant' | 'gravel';
  title: Record<Locale, string>;
  material: Record<Locale, string>;
}
export const demoProjects: Project[] = [
  {
    id: 'kruje',
    category: 'roads',
    location: 'Krujë',
    year: 2025,
    tonnes: 28000,
    image: 'roadwork',
    title: { en: 'A stronger connection to Krujë', sq: 'Një lidhje më e fortë me Krujën' },
    material: { en: 'Road base & asphalt aggregates', sq: 'Material rrugor dhe agregate asfalti' },
  },
  {
    id: 'tirana',
    category: 'construction',
    location: 'Tiranë',
    year: 2025,
    tonnes: 18500,
    image: 'gravel',
    title: { en: 'Foundations for a new neighbourhood', sq: 'Themele për një lagje të re' },
    material: { en: 'Washed sand & concrete aggregates', sq: 'Rërë e larë dhe agregate betoni' },
  },
  {
    id: 'durres',
    category: 'coastal',
    location: 'Durrës',
    year: 2024,
    tonnes: 12000,
    image: 'quarry',
    title: { en: 'Protection along the Adriatic', sq: 'Mbrojtje përgjatë Adriatikut' },
    material: {
      en: 'Armourstone & graded filter stone',
      sq: 'Gurë mbrojtës dhe gurë filtrues të klasifikuar',
    },
  },
  {
    id: 'elbasan',
    category: 'infrastructure',
    location: 'Elbasan',
    year: 2024,
    tonnes: 9600,
    image: 'trucks',
    title: {
      en: 'Supporting essential water networks',
      sq: 'Mbështetje për rrjetet e ujësjellësit',
    },
    material: {
      en: 'Bedding sand & drainage stone',
      sq: 'Rërë për shtrat tubacionesh dhe gur drenazhues',
    },
  },
  {
    id: 'lezhe',
    category: 'roads',
    location: 'Lezhë',
    year: 2026,
    tonnes: 22000,
    image: 'roadwork',
    title: { en: 'Better access for local industry', sq: 'Hyrje më e mirë për industrinë vendore' },
    material: { en: 'Road base 0–63 & crushed stone', sq: 'Material rrugor 0–63 dhe gur i thyer' },
  },
  {
    id: 'fier',
    category: 'construction',
    location: 'Fier',
    year: 2026,
    tonnes: 14000,
    image: 'plant',
    title: {
      en: 'Room for the next generation of business',
      sq: 'Hapësirë për brezin e ri të bizneseve',
    },
    material: {
      en: 'Concrete aggregates & engineered fill',
      sq: 'Agregate betoni dhe mbushje teknike',
    },
  },
];
