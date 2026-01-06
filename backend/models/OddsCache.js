// backend/models/OddsCache.js
import mongoose from "mongoose";

const OddsCacheSchema = new mongoose.Schema(
  {
    cacheKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['group-winner', 'match-odds'],
      index: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    teams: {
      type: [String],
      required: true,
      index: true,
    },
    isKnockout: {
      type: Boolean,
      default: false,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expireAfterSeconds: 0 }, // TTL index for automatic expiration
    },
  },
  { timestamps: true }
);

// Compound index for faster lookups
OddsCacheSchema.index({ cacheKey: 1, expiresAt: 1 });
OddsCacheSchema.index({ type: 1, expiresAt: 1 });

// Pre-save hook to ensure expiresAt is set
OddsCacheSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    // Default to 7 days from now
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  next();
});

export default mongoose.model("OddsCache", OddsCacheSchema);

