import { Schema, model, models } from "mongoose";

const PrivateCommentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    parentCommentId: {
      type: Schema.Types.Mixed,
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

export default models.PrivateComment ||
  model("PrivateComment", PrivateCommentSchema);
