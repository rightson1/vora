import { NextRequest, NextResponse } from "next/server";
import db from "../models/db";
import Image from "../models/Image";

export async function POST(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const image = await Image.create(body);
    return NextResponse.json(image, { status: 201 });
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  await db();
  const id = request.nextUrl.searchParams.get("communityId") as string;
  const images = await Image.find({ communityId: id });
  return NextResponse.json(images);
}
export async function PUT(request: NextRequest) {
  try {
    await db();
    const body = await request.json();
    const updatedIImage = await Image.findOneAndUpdate(
      { _id: body._id },
      body,
      {
        new: true,
      }
    );
    return NextResponse.json(updatedIImage);
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
export async function DELETE(request: NextRequest) {
  try {
    await db();
    const id = request.nextUrl.searchParams.get("id") as string;
    await Image.findByIdAndDelete(id);
    return NextResponse.json({ message: "image deleted" });
  } catch (err) {
    return new NextResponse("There was an error", { status: 500 });
  }
}
