import { Schema, model, type InferSchemaType } from "mongoose";

const interviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },

    round: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["phone", "video", "onsite", "technical", "hr"],
      default: "video",
    },

    meetingLink: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 5000,
    },

    result: {
      type: String,
      enum: ["pending", "passed", "failed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

interviewSchema.index({
  user: 1,
  date: 1,
});

interviewSchema.index({
  application: 1,
  date: 1,
});

export type Interview = InferSchemaType<typeof interviewSchema>;

export const InterviewModel = model("Interview", interviewSchema);
