import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    status: {
      type: String,
      enum: ['saved', 'started', 'submitted', 'under_review', 'interview', 'offer', 'rejected', 'withdrawn'],
      default: 'started',
    },
    accessibilityMode: {
      type: String,
      default: 'standard',
    },
    applicationData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    submittedAt: Date,
  },
  {
    timestamps: true,
  }
);

applicationSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const Application = mongoose.model('Application', applicationSchema);
