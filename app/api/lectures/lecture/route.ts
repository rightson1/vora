import { NextRequest, NextResponse } from "next/server";
import db from "../../models/db";
import Lecture from "../../models/Lecture";
import { Types } from "mongoose";
export async function GET(request: NextRequest) {
  await db();
  const _id = request.nextUrl.searchParams.get("_id");
  const lectures = await Lecture.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(_id as string),
      },
    },
    {
      $project: {
        name: 1,
        description: 1,
        createdAt: 1,
        ratings: "$rating.rating", // Extract the ratings array
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$ratings" }, // Calculate the average rating
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        createdAt: 1,
        averageRating: 1, // Include the averageRating field
      },
    },
  ]);
  return NextResponse.json(lectures[0]);
}
