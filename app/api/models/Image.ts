import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    communityId: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Image || model("Image", ImageSchema);
