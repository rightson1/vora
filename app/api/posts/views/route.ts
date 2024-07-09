import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Post from "../../models/Post";

export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    console.log(body);
    const { id: _id, userId } = body;
    const post = await Post.findOne({ _id });
    await Post.updateOne({ _id }, { $addToSet: { views: userId } });
    return NextResponse.json(post);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
