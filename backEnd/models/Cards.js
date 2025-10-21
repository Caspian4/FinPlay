import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        kind: {
            type: String,
            enum: ["expense", "income", "saving", "split", "roundup"],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: String,
        value: {
            type: Number,
            default: 0,
        },
        rarity: {
            type: String,
            enum: ["common", "rare", "epic", "legendary"],
            default: "common",
        },
        level: {
            type: Number,
            default: 1,
        },
        icon: String,
        progress: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;
