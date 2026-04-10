import { json } from '@sveltejs/kit';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif']);

export async function GET() {
  try {
    const candidateDirs = [
      path.join(process.cwd(), 'static', 'imagea'),
      path.join(process.cwd(), 'static', 'images'),
      path.join(process.cwd(), 'build', 'images')
    ];
    for (const imageDir of candidateDirs) {
      try {
        const entries = await readdir(imageDir, { withFileTypes: true });
        const files = entries
          .filter((entry) => entry.isFile())
          .map((entry) => entry.name)
          .filter((name) => IMAGE_EXT.has(path.extname(name).toLowerCase()))
          .sort((a, b) => a.localeCompare(b));
        if (files.length > 0) {
          return json(
            { files, basePath: '/api/project-image', version: Date.now().toString() },
            { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
          );
        }
      } catch {
        // Try the next candidate directory.
      }
    }

    return json(
      { files: [], basePath: '/api/project-image', version: Date.now().toString() },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  } catch {
    return json(
      { files: [], basePath: '/api/project-image', version: Date.now().toString() },
      { headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' } }
    );
  }
}
