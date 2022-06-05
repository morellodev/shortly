import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();

  if (!url.pathname.startsWith("/api/get-url/")) {
    return new Response(null, { status: 404 });
  }

  const slug = url.pathname.split("/api/get-url/")[1];
  const shortLinkResponse = await fetch(`${url.origin}/api/get-url/${slug}`);

  if (!shortLinkResponse.ok) {
    return new Response(null, { status: 500 });
  }

  const shortLink = await shortLinkResponse.json();

  return NextResponse.redirect(shortLink.url);
}
