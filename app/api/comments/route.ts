import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Comment from "../models/Comment";
// export const revalidate = 0;
// export const dynamic = "force-dynamic";
export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const comment = await Comment.create(body);
    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    console.log(err);
    return new NextResponse("There was an error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const parent = request.nextUrl.searchParams.get("parent") as string;
  try {
    await db();
    const comments = await Comment.aggregate([
      {
        $match: {
          parent: parent,
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
      {
        $project: {
          parent: 1,
          userId: 1,
          comment: 1,
          parentCommentId: 1,
          createdAt: 1,
          updatedAt: 1,
          "user._id": 1,
          "user.name": 1,
          "user.profileImage": 1,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
    return NextResponse.json(comments);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedIComment = await Comment.findOneAndUpdate(
      { _id: body._id },
      body,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedIComment);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
//delete comment
export async function DELETE(request: NextRequest) {
  try {
    await db();
    const id = request.nextUrl.searchParams.get("id") as string;
    //delete all comment where parentCommentId = id
    await Comment.deleteMany({ parentCommentId: id });
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Comment deleted" });
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
