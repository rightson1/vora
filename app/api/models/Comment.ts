import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    parent: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

export default models.Comment || model("Comment", CommentSchema);
