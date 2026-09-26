import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      default: '',
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    education: [
      {
        degree: String,
        field: String,
        institution: String,
        year: String,
      },
    ],
    experience: [
      {
        role: String,
        company: String,
        duration: String,
        highlights: [String],
      },
    ],
  },
  {
    timestamps: true,
  }
);

resumeSchema.methods.toJSON = function () {
  const obj = this.toObject();
  obj.id = obj._id;
  return obj;
};

export const Resume = mongoose.model('Resume', resumeSchema);
