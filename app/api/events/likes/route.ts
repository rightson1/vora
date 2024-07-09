import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Event from "../../models/Event";

export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const { id: _id, userId } = body;
    const event = await Event.findOne({ _id });
    if (event.likes.includes(userId)) {
      await Event.updateOne({ _id }, { $pull: { likes: userId } });
    } else {
      await Event.updateOne({ _id }, { $addToSet: { likes: userId } });
    }
    return NextResponse.json(event);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
