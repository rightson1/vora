import { Schema, model, models } from "mongoose";
const CommunityMemberSchema = new Schema({
  role: String,
  status: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const CommunitySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    members: {
      type: [CommunityMemberSchema],
      required: false,
      default: [],
    },
    links: {
      type: [
        {
          name: String,
          link: String,
        },
      ],
      required: false,
    },

    coverImage: {
      type: String,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    visibility: {
      type: String,
      required: false,
      default: "public",
      enum: ["public", "private"],
    },
  },
  {
    timestamps: true,
  }
);

export default models.Community || model("Community", CommunitySchema);
