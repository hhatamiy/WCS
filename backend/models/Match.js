// backend/models/Match.js
import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },

    stage: {
      type: String,
      required: true, // e.g., "Group A", "Round of 16"
    },

    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    result: {
      homeScore: { type: Number, default: null },
      awayScore: { type: Number, default: null },
      winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null }, // "Argentina", "Draw"
    },
  },
  { timestamps: true }
);

export default mongoose.model("Match", MatchSchema);
