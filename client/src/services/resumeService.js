import { apiRequest } from './api';

export const resumeService = {
  uploadResume: (file) => {
    const formData = new FormData();
    if (file) formData.append('file', file);
    return apiRequest('/resumes', {
      method: 'POST',
      body: formData,
    });
  },

  getResumes: () => apiRequest('/resumes'),

  getResumeById: (id) => apiRequest(`/resumes/${id}`),

  deleteResume: (id) =>
    apiRequest(`/resumes/${id}`, {
      method: 'DELETE',
    }),
};
