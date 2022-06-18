import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (req) => {
  const url = req.nextUrl.clone();
  const slug = url.pathname.substring(1);

  if (!slug || typeof slug !== "string") {
    return NextResponse.next();
  }

  const shortLinkResponse = await fetch(`${url.origin}/api/${slug}`);

  if (shortLinkResponse.status !== 200) {
    return NextResponse.next();
  }

  const shortLink = await shortLinkResponse.json();

  return NextResponse.redirect(shortLink.url);
};
