// backend/models/Brackets.js
import mongoose from "mongoose";

/* schema is unused in this file
const GroupPredictionSchema = new mongoose.Schema({
  groupLetter: { type: String, required: true },
  first: { type: String, required: true },
  second: { type: String, required: true }
}, { _id: false });
*/

const MatchPredictionSchema = new mongoose.Schema({
  match: { type: Number, required: true },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }
}, { _id: false });

const BracketSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    year: {
      type: Number,
      required: true,
      default: 2026,
    },

    name: { // Name of bracket
      type: String,
      required: true,
      trim: true,
    },

    predictions: {
      groups: {
        type: Map,
        of: [{type: mongoose.Schema.Types.ObjectId, ref: "Team"}], // ordered array: [firstPlace, secondPlace]
        default: {},
      },

      knockout: {
        roundOf32: { type: [MatchPredictionSchema], default: [] },
        roundOf16: { type: [MatchPredictionSchema], default: [] },
        quarterFinals: { type: [MatchPredictionSchema], default: [] },
        semiFinals: { type: [MatchPredictionSchema], default: [] },
        final: {
          winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
        },
        tiebreakerScore: { type: Number, default: 0 },
      },
    },

    scores: {
      groupScore: { type: Number, default: 0 },
      knockoutScore: { type: Number, default: 0 },
      totalScore: { type: Number, default: 0 },
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bracket", BracketSchema);
