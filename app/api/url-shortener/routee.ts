import { NextResponse } from "next/server";

// Simple in-memory store (replace with DB later)
const urlStore = new Map<string, string>();

function generateCode(length = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function GET() {
  return NextResponse.json({ status: "API alive" });
}

export async function POST() {
  return NextResponse.json({ status: "POST working" });
}

// CREATE SHORT URL
// export async function POST(req: Request) {
//   const { url } = await req.json();

//   if (!url || !url.startsWith("http")) {
//     return NextResponse.json(
//       { error: "Invalid URL" },
//       { status: 400 }
//     );
//   }

//   const code = generateCode();
//   urlStore.set(code, url);

//   return NextResponse.json({
//     shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`,
//   });
// }

// // REDIRECT
// export async function GET(req: Request) {
//   const { pathname } = new URL(req.url);
//   const code = pathname.split("/").pop() || "";

//   const originalUrl = urlStore.get(code);

//   if (!originalUrl) {
//     return NextResponse.json(
//       { error: "URL not found" },
//       { status: 404 }
//     );
//   }

//   return NextResponse.redirect(originalUrl);
// }
