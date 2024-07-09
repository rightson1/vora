import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Community from "../models/Community";

export async function POST(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const community = await Community.create(body);
    return NextResponse.json(community);
  } catch (e) {
    console.log(e);
    return new NextResponse("There was an error creating the community", {
      status: 500,
    });
  }
}
export async function GET(request: NextRequest) {
  await db();
  try {
    const communities = await Community.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "members.userId",
          foreignField: "_id",
          as: "memberInfo",
        },
      },
      {
        $project: {
          //member names, status,tole, profileImage,_id
          title: 1,
          description: 1,
          profileImage: 1,
          coverImage: 1,
          visibility: 1,
          links: 1,
          createdAt: 1,
          _id: 1,
          users: {
            $map: {
              input: "$memberInfo",
              as: "member",
              in: {
                _id: "$$member._id",
                name: "$$member.name",
                profileImage: "$$member.profileImage",
                status: {
                  $arrayElemAt: [
                    "$members.status",
                    {
                      $indexOfArray: ["$members.userId", "$$member._id"],
                    },
                  ],
                },
                role: {
                  $arrayElemAt: [
                    "$members.role",
                    {
                      $indexOfArray: ["$members.userId", "$$member._id"],
                    },
                  ],
                },
              },
            },
          },
        },
      },
    ]);

    return NextResponse.json(communities);
  } catch (e) {
    console.log(e);
    return new NextResponse("There was an error fetching the communities", {
      status: 500,
    });
  }
}
export async function PUT(request: NextRequest) {
  await db();
  try {
    const body = await request.json();
    const updatedCommunity = await Community.findOneAndUpdate(
      {
        _id: body._id,
      },
      body,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedCommunity);
  } catch (e) {
    console.log(e);
    return new NextResponse("There was an error updating the community", {
      status: 500,
    });
  }
}
