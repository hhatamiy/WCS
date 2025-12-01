// backend/models/Teams.js
import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    federation: { type: String, required: true },

    stats: {
      fifaRank: { type: Number, default: null },
      goalsPerGame: { type: Number, default: null },
      winProbability: { type: Number, default: null }, // From Kalshi/external API
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", TeamSchema);
