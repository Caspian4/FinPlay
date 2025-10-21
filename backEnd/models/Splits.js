// models/Split.js
import mongoose from "mongoose";

const splitSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // creator
    title: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // participants
    settlements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Settlement" }], // reference to settlements
    mode: { type: String, enum: ["equal", "custom"], default: "equal" },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Split", splitSchema);
