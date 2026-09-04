import { Schema, model, type InferSchemaType } from "mongoose";

const applicationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },

    jobUrl: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    salary: {
      type: Number,
      min: 0,
    },

    applicationDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "screening",
        "interview",
        "offer",
        "rejected",
        "withdrawn",
      ],
      default: "applied",
      index: true,
    },

    recruiterName: {
      type: String,
      trim: true,
      maxlength: 100,
    },

    recruiterEmail: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index({
  user: 1,
  applicationDate: -1,
});

applicationSchema.index({
  user: 1,
  status: 1,
});

export type Application = InferSchemaType<typeof applicationSchema>;

export const ApplicationModel = model("Application", applicationSchema);
