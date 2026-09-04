import { Schema, model, type InferSchemaType } from "mongoose";

const followUpSchema = new Schema(
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

    dueDate: {
      type: Date,
      required: true,
      index: true,
    },

    note: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    completed: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

followUpSchema.index({
  user: 1,
  completed: 1,
  dueDate: 1,
});

export type FollowUp = InferSchemaType<typeof followUpSchema>;

export const FollowUpModel = model("FollowUp", followUpSchema);
