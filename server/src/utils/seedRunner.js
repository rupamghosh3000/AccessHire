import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { Job } from '../models/Job.js';
import { User } from '../models/User.js';
import { AccessibilityProfile } from '../models/AccessibilityProfile.js';
import { Resume } from '../models/Resume.js';
import { BarrierReport } from '../models/BarrierReport.js';
import { ApplicationPreview } from '../models/ApplicationPreview.js';
import { SEED_JOBS, SEED_DEMO_USER, SEED_DEMO_RESUME, SEED_BARRIER_REPORTS } from './seedData.js';

export const runSeed = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.log('[Seed] Database not connected. Seed data will be loaded dynamically via in-memory service fallback.');
    return;
  }

  try {
    console.log('[Seed] Seeding Jobs...');
    for (const jobData of SEED_JOBS) {
      await Job.findByIdAndUpdate(jobData._id, jobData, { upsert: true, new: true });
    }

    console.log('[Seed] Seeding Demo User...');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(SEED_DEMO_USER.passwordPlain, salt);

    let user = await User.findById(SEED_DEMO_USER._id);
    if (!user) {
      user = await User.create({
        _id: SEED_DEMO_USER._id,
        name: SEED_DEMO_USER.name,
        email: SEED_DEMO_USER.email,
        passwordHash,
      });
    }

    let profile = await AccessibilityProfile.findOne({ userId: user._id });
    if (!profile) {
      profile = await AccessibilityProfile.create({
        userId: user._id,
        voiceEnabled: true,
        keyboardFirst: true,
        screenReaderOptimized: false,
        highContrast: false,
        reducedMotion: false,
        fontScale: 1.0,
        voiceSpeed: 1.0,
        preferredLanguage: 'en',
      });
      user.accessibilityProfileId = profile._id;
      await user.save();
    }

    let resume = await Resume.findOne({ userId: user._id });
    if (!resume) {
      await Resume.create({
        _id: SEED_DEMO_RESUME._id,
        userId: user._id,
        fileName: SEED_DEMO_RESUME.fileName,
        fileType: SEED_DEMO_RESUME.fileType,
        fileUrl: SEED_DEMO_RESUME.fileUrl,
        extractedText: SEED_DEMO_RESUME.extractedText,
        skills: SEED_DEMO_RESUME.skills,
        education: SEED_DEMO_RESUME.education,
        experience: SEED_DEMO_RESUME.experience,
      });
    }

    console.log('[Seed] Seeding Barrier Reports & Application Previews...');
    for (const jobId of Object.keys(SEED_BARRIER_REPORTS)) {
      const report = SEED_BARRIER_REPORTS[jobId];
      await BarrierReport.findOneAndUpdate(
        { jobId },
        { jobId, ...report },
        { upsert: true, new: true }
      );

      await ApplicationPreview.findOneAndUpdate(
        { jobId },
        {
          jobId,
          steps: [
            {
              stepNumber: 1,
              title: 'Personal Information',
              description: 'Provide basic contact details and preferred working arrangements.',
              fields: [
                { name: 'fullName', label: 'Full Name', type: 'text', required: true, explanation: 'Your official full name for employment records.' },
                { name: 'email', label: 'Email Address', type: 'email', required: true, explanation: 'Primary email where interview invitations will be sent.' },
                { name: 'phone', label: 'Contact Phone Number', type: 'tel', required: true, explanation: 'Primary contact phone number.' },
                { name: 'location', label: 'Current Location (City, Country)', type: 'text', required: true, explanation: 'Your current city of residence.' }
              ]
            },
            {
              stepNumber: 2,
              title: 'Education & Background',
              description: 'Detail your academic background and certifications.',
              fields: [
                { name: 'degree', label: 'Highest Degree Obtained', type: 'text', required: true, explanation: 'e.g., B.E. Information Technology' },
                { name: 'institution', label: 'College / University Name', type: 'text', required: true, explanation: 'Name of your educational institution.' },
                { name: 'graduationYear', label: 'Graduation Year', type: 'text', required: true, explanation: 'Year of completion or expected graduation.' }
              ]
            },
            {
              stepNumber: 3,
              title: 'Skills & Work Authorization',
              description: 'Verify your technical alignment and work eligibility.',
              fields: [
                { name: 'primarySkills', label: 'Primary Technical Skills', type: 'text', required: true, explanation: 'Key skills relevant to this position (e.g. Java, SQL, REST APIs).' },
                { name: 'workAuth', label: 'Are you legally authorized to work in the position jurisdiction?', type: 'select', required: true, explanation: 'Do you currently have legal permission to work where this job is located?', potentialBarrier: 'Contains formal legal phrasing.' }
              ]
            },
            {
              stepNumber: 4,
              title: 'Resume & Documents',
              description: 'Confirm your active resume attachment.',
              fields: [
                { name: 'resumeId', label: 'Attached Resume', type: 'file', required: true, explanation: 'Active verified resume stored in AccessHire Passport.' }
              ]
            },
            {
              stepNumber: 5,
              title: 'Review & Confirm',
              description: 'Carefully review all submitted answers before explicit final confirmation.',
              fields: []
            }
          ],
          complexityScore: 2,
          detectedBarriers: report.detectedBarriers.map(b => ({ barrier: b.description, workaround: report.suggestedWorkarounds[0]?.workaround || 'Use simplified voice or keyboard navigation.' })),
        },
        { upsert: true, new: true }
      );
    }

    console.log('[Seed] Database seeding completed successfully.');
  } catch (err) {
    console.error('[Seed Error]', err);
  }
};

// Allow executing directly
if (process.argv[1]?.endsWith('seedRunner.js')) {
  runSeed().then(() => process.exit(0));
}
