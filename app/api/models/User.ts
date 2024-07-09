import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },

    bio: {
      type: String,
      required: false,
    },
    fakeName: {
      type: String,
      required: false,
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
    profession: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.User || model("User", UserSchema);
