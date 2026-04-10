import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

const MIME_BY_EXT: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif'
};

const CANDIDATE_DIRS = [
  path.join(process.cwd(), 'static', 'images'),
  path.join(process.cwd(), 'build', 'images'),
  path.join(process.cwd(), 'static', 'imagea')
];

export const GET: RequestHandler = async ({ params }) => {
  const safeName = path.basename(params.name);
  const ext = path.extname(safeName).toLowerCase();
  const mimeType = MIME_BY_EXT[ext];

  if (!mimeType) {
    return new Response('Unsupported image type', { status: 400 });
  }

  for (const dir of CANDIDATE_DIRS) {
    const filePath = path.join(dir, safeName);
    try {
      const bytes = await readFile(filePath);
      return new Response(bytes, {
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      });
    } catch {
      // Try next directory.
    }
  }

  return new Response('Image not found', { status: 404 });
};
