import mongoose from "mongoose";

const settlementSchema = new mongoose.Schema({
  splitId: { type: mongoose.Schema.Types.ObjectId, ref: "Split", required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  settled: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Settlement", settlementSchema);
