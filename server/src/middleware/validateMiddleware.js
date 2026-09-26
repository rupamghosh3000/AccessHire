import { sendError } from '../utils/responseHandler.js';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    const formattedErrors = error.errors ? error.errors.map((e) => ({ field: e.path.join('.'), message: e.message })) : [];
    return sendError(res, 'Validation failed for request data.', 'VALIDATION_ERROR', 400, { fields: formattedErrors });
  }
};
