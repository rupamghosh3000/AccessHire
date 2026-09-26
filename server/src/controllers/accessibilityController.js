import { sendSuccess } from '../utils/responseHandler.js';
import { AccessibilityProfile } from '../models/AccessibilityProfile.js';
import { getIsConnected } from '../config/db.js';

let inMemoryProfiles = new Map();

export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;

    if (getIsConnected()) {
      let profile = await AccessibilityProfile.findOne({ userId });
      if (!profile) {
        profile = await AccessibilityProfile.create({ userId });
      }
      return sendSuccess(res, profile);
    }

    if (!inMemoryProfiles.has(userId.toString())) {
      inMemoryProfiles.set(userId.toString(), {
        userId,
        voiceEnabled: false,
        keyboardFirst: false,
        screenReaderOptimized: false,
        highContrast: false,
        reducedMotion: false,
        fontScale: 1.0,
        voiceSpeed: 1.0,
        preferredLanguage: 'en',
      });
    }

    return sendSuccess(res, inMemoryProfiles.get(userId.toString()));
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const updates = req.body;

    if (getIsConnected()) {
      let profile = await AccessibilityProfile.findOneAndUpdate(
        { userId },
        { $set: updates },
        { new: true, upsert: true }
      );
      return sendSuccess(res, profile);
    }

    const current = inMemoryProfiles.get(userId.toString()) || {
      userId,
      voiceEnabled: false,
      keyboardFirst: false,
      screenReaderOptimized: false,
      highContrast: false,
      reducedMotion: false,
      fontScale: 1.0,
      voiceSpeed: 1.0,
      preferredLanguage: 'en',
    };

    const updated = { ...current, ...updates, updatedAt: new Date() };
    inMemoryProfiles.set(userId.toString(), updated);

    return sendSuccess(res, updated);
  } catch (err) {
    next(err);
  }
};
