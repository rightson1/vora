import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import axios from "axios";
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag") as string;
  const path = request.nextUrl.searchParams.get("path") as string;
  if (path) {
    const path = request.nextUrl.searchParams.get("path") || "/";
    revalidatePath(path);
    console.log("Revalidated path: " + path);
    return new NextResponse("Page Revalidated", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  revalidateTag(tag);
  return new NextResponse("Hello, Next.js!", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
