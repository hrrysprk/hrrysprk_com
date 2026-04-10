import { json } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);

export async function GET() {
  try {
    const imageDir = path.join(process.cwd(), 'static', 'images');
    const entries = await readdir(imageDir, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
      .sort((a, b) => a.localeCompare(b));

    return json({ files });
  } catch {
    return json({ files: [] });
  }
}
