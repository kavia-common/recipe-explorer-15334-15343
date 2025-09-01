import { NextResponse } from "next/server";

/**
 * PUBLIC_INTERFACE
 * Generates a simple sitemap for the main routes.
 */
export async function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = ["", "/profile", "/signin"].map(
    (p) => `<url><loc>${site}${p}</loc></url>`
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    "\n"
  )}\n</urlset>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
