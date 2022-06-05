import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) => {
  const url = req.nextUrl.clone();
  const slug = url.searchParams.get("slug");

  if (!slug || typeof slug !== "string") {
    return NextResponse.next();
  }

  const shortLinkResponse = await fetch(`${url.origin}/api/get-url/${slug}`);

  if (shortLinkResponse.status !== 200) {
    return NextResponse.redirect(
      `${url.origin}?slug=${slug}&status=${shortLinkResponse.status}`
    );
  }

  const shortLink = await shortLinkResponse.json();

  return NextResponse.redirect(shortLink.url);
};
