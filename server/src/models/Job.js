import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    workMode: {
      type: String,
      enum: ['remote', 'hybrid', 'onsite'],
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    preferredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    salaryRange: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'INR' },
    },
    applicationUrl: String,
    source: {
      type: String,
      default: 'AccessHire Direct',
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const Job = mongoose.model('Job', jobSchema);
