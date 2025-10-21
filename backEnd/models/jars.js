import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false } // Prevent creating separate _id for each contribution
);

const jarSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add a title for the jar"],
        },
        goalAmount: {
            type: Number,
            required: [true, "Please add a goal amount"],
        },
        currentAmount: {
            type: Number,
            default: 0,
        },
        category: {
            type: String,
            enum: ["saving", "investment", "achievement"],
            default: "saving",
        },
        image: {
            type: String, // base64 or URL
            default: null,
        },
        status: {
            type: String,
            enum: ["active", "completed"],
            default: "active",
        },
        contributions: [contributionSchema],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const Jar = mongoose.model("Jar", jarSchema);
export default Jar;
