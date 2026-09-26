import mongoose from 'mongoose';

const applicationPreviewSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    steps: [
      {
        stepNumber: Number,
        title: String,
        description: String,
        fields: [
          {
            name: String,
            label: String,
            type: String,
            required: Boolean,
            explanation: String,
            potentialBarrier: String,
          },
        ],
      },
    ],
    complexityScore: {
      type: Number,
      default: 3,
    },
    detectedBarriers: [
      {
        barrier: String,
        workaround: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

applicationPreviewSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const ApplicationPreview = mongoose.model('ApplicationPreview', applicationPreviewSchema);
