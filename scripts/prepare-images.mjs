import sharp from 'sharp';
import { mkdir, rename, access } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const destination = new URL('src/assets/images/', root);
await mkdir(destination, { recursive: true });
await mkdir(new URL('src/assets/stock/', root), { recursive: true });
for (const name of ['machine1.png', 'machine2.png', 'machine3.jpg']) {
  const original = new URL(`images/${name}`, root);
  const target = new URL(name, destination);
  try {
    await access(original);
    await rename(original, target);
  } catch {
    await access(target);
  }
  const image = sharp(await import('node:fs/promises').then((fs) => fs.readFile(target)));
  const metadata = await image.metadata();
  if (name.endsWith('.png')) {
    await image
      .extract({ left: 0, top: 0, width: metadata.width, height: metadata.height - 25 })
      .toFile(
        new URL(name.replace('.png', '-clean.png'), destination).pathname.replace(/^\/(\w:)/, '$1'),
      );
  }
  console.log(`${name}: ${metadata.width}x${metadata.height}, ${metadata.format}`);
}
