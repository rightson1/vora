import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Announcement from "../../models/Announcement";

export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const { id: _id, userId } = body;
    const announcement = await Announcement.findOne({ _id });
    await Announcement.updateOne({ _id }, { $addToSet: { views: userId } });
    return NextResponse.json(announcement);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
