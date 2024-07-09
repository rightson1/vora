import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    eventDate: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["approved", "pending", "rejected", "unpublished", "past"],
    },
    venue: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Event || model("Event", EventSchema);
