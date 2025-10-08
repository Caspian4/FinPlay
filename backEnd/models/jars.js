import mongoose from "mongoose";

const jarSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date
    },
    category: {
        type: String,
        enum: ["saving", "investment", "achievement"],
        required: true
    },
    status: {
        type: String,
        enum: ["in-progress", "completed"],
        default: "in-progress"
    },
    contributions: [
        {
            amount: Number,
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

export default mongoose.model("Jar", jarSchema);
