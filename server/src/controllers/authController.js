import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { User } from '../models/User.js';
import { AccessibilityProfile } from '../models/AccessibilityProfile.js';
import { getIsConnected } from '../config/db.js';
import { SEED_DEMO_USER } from '../utils/seedData.js';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, name: user.name, email: user.email },
    config.jwtSecret,
    { expiresIn: '7d' }
  );
};

const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (getIsConnected()) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return sendError(res, 'User with this email already exists', 'USER_EXISTS', 400);
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await User.create({ name, email, passwordHash });

      const profile = await AccessibilityProfile.create({
        userId: user._id,
        voiceEnabled: false,
        keyboardFirst: false,
        screenReaderOptimized: false,
        highContrast: false,
        reducedMotion: false,
        fontScale: 1.0,
        voiceSpeed: 1.0,
        preferredLanguage: 'en',
      });

      user.accessibilityProfileId = profile._id;
      await user.save();

      const token = generateToken(user);
      setAuthCookie(res, token);

      return sendSuccess(res, {
        user: { id: user._id, name: user.name, email: user.email },
        accessibilityProfile: profile,
        token,
      }, 201);
    }

    // In-memory demo register fallback
    const fakeId = `usr_${Date.now()}`;
    const token = jwt.sign({ id: fakeId, name, email }, config.jwtSecret, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return sendSuccess(res, {
      user: { id: fakeId, name, email },
      accessibilityProfile: {
        userId: fakeId,
        voiceEnabled: false,
        keyboardFirst: false,
        screenReaderOptimized: false,
        highContrast: false,
        reducedMotion: false,
        fontScale: 1.0,
        voiceSpeed: 1.0,
        preferredLanguage: 'en',
      },
      token,
    }, 201);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === SEED_DEMO_USER.email && password === SEED_DEMO_USER.passwordPlain) {
      const token = jwt.sign(
        { id: SEED_DEMO_USER._id, name: SEED_DEMO_USER.name, email: SEED_DEMO_USER.email },
        config.jwtSecret,
        { expiresIn: '7d' }
      );
      setAuthCookie(res, token);
      return sendSuccess(res, {
        user: { id: SEED_DEMO_USER._id, name: SEED_DEMO_USER.name, email: SEED_DEMO_USER.email },
        token,
      });
    }

    if (getIsConnected()) {
      const user = await User.findOne({ email });
      if (!user) {
        return sendError(res, 'Invalid email or password', 'INVALID_CREDENTIALS', 401);
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return sendError(res, 'Invalid email or password', 'INVALID_CREDENTIALS', 401);
      }

      const token = generateToken(user);
      setAuthCookie(res, token);

      const profile = await AccessibilityProfile.findOne({ userId: user._id });

      return sendSuccess(res, {
        user: { id: user._id, name: user.name, email: user.email },
        accessibilityProfile: profile,
        token,
      });
    }

    // Dynamic demo login fallback
    const fakeId = `usr_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const token = jwt.sign({ id: fakeId, name: email.split('@')[0], email }, config.jwtSecret, { expiresIn: '7d' });
    setAuthCookie(res, token);

    return sendSuccess(res, {
      user: { id: fakeId, name: email.split('@')[0], email },
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('token');
  return sendSuccess(res, { message: 'Successfully logged out' });
};

export const getCurrentUser = async (req, res, next) => {
  try {
    let profile = null;
    if (getIsConnected() && req.user._id) {
      profile = await AccessibilityProfile.findOne({ userId: req.user._id });
    }

    return sendSuccess(res, {
      user: req.user,
      accessibilityProfile: profile || {
        voiceEnabled: true,
        keyboardFirst: true,
        screenReaderOptimized: false,
        highContrast: false,
        reducedMotion: false,
        fontScale: 1.0,
        voiceSpeed: 1.0,
        preferredLanguage: 'en',
      },
    });
  } catch (err) {
    next(err);
  }
};
