import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["buyer", "seller"],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
