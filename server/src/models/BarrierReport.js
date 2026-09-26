import mongoose from 'mongoose';

const barrierReportSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    voiceSupport: {
      type: String,
      enum: ['supported', 'not_detected', 'unknown'],
      default: 'supported',
    },
    keyboardSupport: {
      type: String,
      enum: ['supported', 'not_detected', 'unknown'],
      default: 'supported',
    },
    screenReaderSupport: {
      type: String,
      enum: ['supported', 'not_detected', 'unknown'],
      default: 'supported',
    },
    formComplexity: {
      type: String,
      enum: ['low', 'medium', 'high', 'unknown'],
      default: 'medium',
    },
    externalDependencies: [String],
    detectedBarriers: [
      {
        type: { type: String }, // e.g. 'unlabeled_file_upload', 'custom_select', 'time_limit'
        description: String,
        severity: { type: String, enum: ['low', 'medium', 'high'] },
      },
    ],
    suggestedWorkarounds: [
      {
        barrierType: String,
        workaround: String,
      },
    ],
    confidence: {
      type: Number,
      default: 0.85,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

barrierReportSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const BarrierReport = mongoose.model('BarrierReport', barrierReportSchema);
