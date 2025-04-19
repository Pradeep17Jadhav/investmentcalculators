import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");
  if (hostname !== "localhost:3000" || process.env.NODE_ENV !== "development") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/addBlog"],
};
