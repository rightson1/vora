import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Comment from "../../models/Comment";
export async function GET(request: NextRequest) {
  const parent = request.nextUrl.searchParams.get("parent") as string;
  try {
    await db();
    const comments = await Comment.find({
      parent,
    }).countDocuments();

    return NextResponse.json(comments);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
