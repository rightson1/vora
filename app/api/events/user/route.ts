import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Event from "../../models/Event";
import Community from "../../models/Community";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  await db();
  try {
    const userId = request.nextUrl.searchParams.get("userId") as string;
    const mongoId = new mongoose.Types.ObjectId(userId);
    const events = await Event.aggregate([
      {
        $match: {
          userId: mongoId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ]);
    return NextResponse.json(events);
  } catch (err) {
    console.log(err);
    return NextResponse.error();
  }
}
