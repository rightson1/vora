import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import User from "../../models/User";
import Community from "../../models/Community";
export async function GET(request: NextRequest) {
  await db();
  const _id = request.nextUrl.searchParams.get("_id") as string;
  const user = await User.aggregate([
    { $match: { _id: new Types.ObjectId(_id) } },
    {
      $project: {
        _id: 1,
        name: 1,
        profileImage: 1,
        email: 1,
        links: 1,
        coverImage: 1,
      },
    },
  ]);
  return NextResponse.json(user[0]);
}
