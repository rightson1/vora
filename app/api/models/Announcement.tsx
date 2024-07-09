import { Schema, model, models } from "mongoose";

const AnnouncementSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
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
    coverImage: {
      type: String,
      required: false,
    },
    views: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Announcement || model("Announcement", AnnouncementSchema);
