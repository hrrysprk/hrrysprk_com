import { readFile } from 'node:fs/promises';
import path from 'node:path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const resumePath = path.join(process.cwd(), 'info-docs', 'all_eyes_on_me_BI_v5.pdf');

  try {
    const bytes = await readFile(resumePath);
    return new Response(bytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Disposition': 'inline; filename="Harpreet_Singh_Resume_BI.pdf"'
      }
    });
  } catch {
    return new Response('Resume not found', { status: 404 });
  }
};
