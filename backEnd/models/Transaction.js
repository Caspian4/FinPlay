import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, 
  },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  roundUp: { type: Number,default: 0 },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
