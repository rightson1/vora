import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Community from "../../models/Community";

export async function PUT(request: NextRequest) {
  try {
    const { userId, role, status, communityId } = await request.json();

    //find if the user is already a member of the community
    const user = await Community.findOne({
      _id: communityId,
      "members.userId": userId,
    });

    if (!user) {
      return new NextResponse("User does not exists", {
        status: 400,
      });
    }
    const updatedCommunity = await Community.findOneAndUpdate(
      {
        _id: communityId,
        "members.userId": userId,
      },
      {
        $set: {
          "members.$.role": role,
          "members.$.status": status,
        },
      },
      { new: true }
    );
    console.log(updatedCommunity);
    return NextResponse.json(updatedCommunity);
  } catch (e) {
    console.log(e);
    return new NextResponse("There was an error updating the community", {
      status: 500,
    });
  }
}
export async function POST(request: NextRequest) {
  try {
    const { userId, role, status, communityId } = await request.json();
    const member = {
      userId,
      role,
      status,
    };
    const user = await Community.findOne({
      _id: communityId,
      "members.userId": userId,
    });

    if (user) {
      return new NextResponse("User does exists", {
        status: 400,
      });
    }
    const updatedCommunity = await Community.findOneAndUpdate(
      {
        _id: communityId,
      },
      {
        $push: {
          members: member,
        },
      },
      { new: true }
    );
    return NextResponse.json(updatedCommunity);
  } catch (e) {
    return new NextResponse("There was an error updating the community", {
      status: 500,
    });
  }
}
