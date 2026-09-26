import { apiRequest } from './api';

export const accessibilityService = {
  getProfile: () => apiRequest('/accessibility-profile'),

  updateProfile: (profileData) =>
    apiRequest('/accessibility-profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
};
