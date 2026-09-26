import mongoose from 'mongoose';

const accessibilityProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    voiceEnabled: {
      type: Boolean,
      default: false,
    },
    keyboardFirst: {
      type: Boolean,
      default: false,
    },
    screenReaderOptimized: {
      type: Boolean,
      default: false,
    },
    highContrast: {
      type: Boolean,
      default: false,
    },
    reducedMotion: {
      type: Boolean,
      default: false,
    },
    fontScale: {
      type: Number,
      default: 1.0,
      min: 0.8,
      max: 2.0,
    },
    voiceSpeed: {
      type: Number,
      default: 1.0,
      min: 0.5,
      max: 2.0,
    },
    preferredLanguage: {
      type: String,
      default: 'en',
    },
  },
  {
    timestamps: true,
  }
);

accessibilityProfileSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const AccessibilityProfile = mongoose.model('AccessibilityProfile', accessibilityProfileSchema);
