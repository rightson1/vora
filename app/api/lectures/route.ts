import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Lecture from "../models/Lecture";

export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    console.log(body);
    const lecture = await Lecture.create(body);
    return NextResponse.json(lecture, { status: 201 });
  } catch (err) {
    // console.log(err);
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  await db();
  //
  const lectures = await Lecture.aggregate([
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
  return NextResponse.json(lectures);
}
export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedILecture = await Lecture.findOneAndUpdate(
      { _id: body._id },
      body,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedILecture);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
