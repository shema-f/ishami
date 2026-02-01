import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const AIInteractionSchema = new Schema({
  userId: { type: Types.ObjectId, ref: 'User' },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  sentiment: { type: String },
  isPro: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Index for user history
AIInteractionSchema.index({ userId: 1, createdAt: -1 });
// Index for Cache (Layer 2) - we search by prompt
AIInteractionSchema.index({ prompt: 1 });

export const AIInteraction = model('AIInteraction', AIInteractionSchema);
