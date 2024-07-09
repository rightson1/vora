import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import User from "../models/User";
import Community from "../models/Community";

export async function POST(request: NextRequest) {
  await db();
  const body = await request.json();
  const user = await User.find({
    uid: body.uid,
  }).countDocuments();
  if (user === 0) {
    const user = await User.create(body);
    const { _id: userId } = user;
    const member = {
      userId,
      role: "member",
      status: "active",
    };
    const updatedCommunity = await Community.findOneAndUpdate(
      {
        main: true,
      },
      {
        $addToSet: {
          members: member,
        },
      },
      { new: true }
    );
    return NextResponse.json(user);
  } else {
    return NextResponse.json({ message: "User already exists" });
  }
}
export async function GET(request: NextRequest) {
  await db();
  const uid = request.nextUrl.searchParams.get("uid") as string;
  const user = await User.findOne({ uid });
  return NextResponse.json(user);
}
export async function PUT(request: NextRequest) {
  await db();
  const { body } = await request.json();
  const user = await User.findOne({
    uid: body.uid,
  });

  if (!user) {
    return new NextResponse("User Not Found", {
      status: 404,
    });
  }
  try {
    const user = await User.findOneAndUpdate({ uid: body.uid }, body);

    return NextResponse.json(user);
  } catch (e) {
    return new NextResponse("Error", {
      status: 400,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const _id = request.nextUrl.searchParams.get("_id") as string;
  await db();
  console.log(_id);
  const user = await User.findOne({
    _id,
  });
  if (!user) {
    return new NextResponse("User Not Found", {
      status: 404,
    });
  }
  try {
    await Community.updateMany(
      { "members.userId": _id },
      { $pull: { members: { userId: _id } } }
    );
    await User.deleteOne({ _id });
    return new NextResponse("User Deleted", {
      status: 200,
    });
  } catch (e) {
    return new NextResponse("Error", {
      status: 400,
    });
  }
}
