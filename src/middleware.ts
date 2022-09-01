import { NextRequest, NextResponse } from 'next/server';

type Params = {
  slug?: string;
};

// URLPattern is not fully implemented yet so this is a temporary workaround
// https://github.com/vercel/next.js/issues/38131
// @ts-expect-error
const PATTERNS = [[new URLPattern({ pathname: '/:slug' }), ({ pathname }) => pathname.groups]];

const params = (url: string): Params => {
  const input = url.split('?')[0];
  let result = {};

  PATTERNS.forEach(([pattern, handler]) => {
    const patternResult = pattern.exec(input);
    if (patternResult !== null && 'pathname' in patternResult) result = handler(patternResult);
  });

  return result;
};

export async function middleware(req: NextRequest) {
  const { slug } = params(req.url);

  if (slug) {
    const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);

    if (slugFetch.status === 404) return NextResponse.redirect(req.nextUrl.origin);

    const data = await slugFetch.json();

    if (data?.url) return NextResponse.redirect(new URL(data.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:slug*',
};
