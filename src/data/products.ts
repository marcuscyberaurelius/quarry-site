import type { Locale } from '../i18n';
export type ProductCategory = 'sand' | 'stone' | 'base' | 'specialist';
export interface Product {
  id: string;
  category: ProductCategory;
  fraction: [number, number] | null;
  density: [number, number];
  standard: string;
  name: Record<Locale, string>;
  use: Record<Locale, string>;
}
export const demoProducts: Product[] = [
  {
    id: 'washed-sand',
    category: 'sand',
    fraction: [0, 4],
    density: [1.5, 1.7],
    standard: 'EN 12620',
    name: { en: 'Washed sand', sq: 'Rërë e larë' },
    use: { en: 'Concrete, mortar & screeds', sq: 'Beton, llaç dhe shtresa niveluese' },
  },
  {
    id: 'crushed-sand',
    category: 'sand',
    fraction: [0, 4],
    density: [1.6, 1.8],
    standard: 'EN 13043',
    name: { en: 'Crushed sand', sq: 'Rërë e thyer' },
    use: { en: 'Asphalt mixes & engineered fills', sq: 'Përzierje asfaltike dhe mbushje teknike' },
  },
  {
    id: 'stone-4-8',
    category: 'stone',
    fraction: [4, 8],
    density: [1.4, 1.6],
    standard: 'EN 12620 / EN 13043',
    name: { en: 'Crushed stone 4–8', sq: 'Gur i thyer 4–8' },
    use: {
      en: 'Concrete & asphalt surface courses',
      sq: 'Beton dhe shtresa sipërfaqësore asfalti',
    },
  },
  {
    id: 'stone-8-16',
    category: 'stone',
    fraction: [8, 16],
    density: [1.4, 1.6],
    standard: 'EN 12620',
    name: { en: 'Crushed stone 8–16', sq: 'Gur i thyer 8–16' },
    use: { en: 'Structural concrete & drainage', sq: 'Beton strukturor dhe drenazhim' },
  },
  {
    id: 'stone-16-31',
    category: 'stone',
    fraction: [16, 31.5],
    density: [1.4, 1.6],
    standard: 'EN 12620',
    name: { en: 'Crushed stone 16–31.5', sq: 'Gur i thyer 16–31,5' },
    use: { en: 'Mass concrete & drainage layers', sq: 'Beton masiv dhe shtresa drenazhuese' },
  },
  {
    id: 'base-31',
    category: 'base',
    fraction: [0, 31.5],
    density: [1.8, 2],
    standard: 'EN 13242',
    name: { en: 'Road base 0–31.5', sq: 'Material rrugor 0–31,5' },
    use: { en: 'Compacted road foundations', sq: 'Shtresa bazë të ngjeshura për rrugë' },
  },
  {
    id: 'base-63',
    category: 'base',
    fraction: [0, 63],
    density: [1.8, 2.1],
    standard: 'EN 13242',
    name: { en: 'Road base 0–63', sq: 'Material rrugor 0–63' },
    use: { en: 'Sub-base & heavy-duty access roads', sq: 'Nënbazë dhe rrugë për mjete të rënda' },
  },
  {
    id: 'ballast',
    category: 'specialist',
    fraction: [31.5, 63],
    density: [1.4, 1.6],
    standard: 'EN 13450',
    name: { en: 'Railway ballast', sq: 'Çakëll hekurudhor' },
    use: {
      en: 'Railway track support, subject to approval',
      sq: 'Mbështetje e trasesë hekurudhore, sipas miratimit',
    },
  },
  {
    id: 'armourstone',
    category: 'specialist',
    fraction: [300, 1000],
    density: [1.5, 1.8],
    standard: 'EN 13383',
    name: { en: 'Riprap & armourstone', sq: 'Gurë për mbrojtje bregdetare' },
    use: { en: 'Coastal protection & riverbanks', sq: 'Mbrojtje bregdetare dhe brigje lumenjsh' },
  },
  {
    id: 'decorative',
    category: 'specialist',
    fraction: null,
    density: [1.4, 1.7],
    standard: '',
    name: { en: 'Decorative limestone', sq: 'Gur gëlqeror dekorativ' },
    use: { en: 'Landscaping, paths & public spaces', sq: 'Peizazh, shtigje dhe hapësira publike' },
  },
];
