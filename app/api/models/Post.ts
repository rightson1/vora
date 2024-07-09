import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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
    views: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    coverImage: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      enum: ["published", "unpublished"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Post || model("Post", PostSchema);
