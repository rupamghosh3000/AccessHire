import mongoose from 'mongoose';

const jobMatchSchema = new mongoose.Schema(
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
    matchedRequirements: [
      {
        skill: String,
        evidence: String,
      },
    ],
    potentialGaps: [
      {
        skill: String,
        recommendation: String,
      },
    ],
    uncertainRequirements: [
      {
        skill: String,
        reason: String,
      },
    ],
    explanation: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

jobMatchSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const JobMatch = mongoose.model('JobMatch', jobMatchSchema);
