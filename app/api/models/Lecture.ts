import { Schema, model, models } from "mongoose";

const LectureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: [
        {
          rating: Number,
          ratingId: String,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Lecture || model("Lecture", LectureSchema);
