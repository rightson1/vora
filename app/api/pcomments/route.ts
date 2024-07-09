import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Comment from "../models/PrivateComment";
import Lecture from "../models/Lecture";

export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const { name, parent, comment, parentCommentId, rating } = body;
    const newComment = await Comment.create({
      name,
      parent,
      comment,
      parentCommentId,
    });

    if (rating) {
      const ratingExists = await Lecture.findOne({
        "rating.ratingId": rating.ratingId,
        _id: parent,
      });

      if (ratingExists) {
        await Lecture.findOneAndUpdate(
          {
            _id: ratingExists._id,
            "rating.ratingId": rating.ratingId,
          },
          {
            $set: {
              "rating.$.rating": rating.rating,
            },
          }
        );
      } else {
        await Lecture.findOneAndUpdate(
          {
            _id: parent,
          },
          {
            $push: {
              rating: rating,
            },
          }
        );
      }
    }
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
    const comments = await Comment.find({ parent: parent }).sort({
      createdAt: 1,
    });
    return NextResponse.json(comments);
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
//delete comment
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  try {
    await db();
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Comment deleted" });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify(err), { status: 500 });
  }
}
