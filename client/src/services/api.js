const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  let data = {};
  const responseText = await response.text();
  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch (_) {
      data = { success: false, error: { message: responseText || 'Invalid server response format' } };
    }
  }

  if (!response.ok || data.success === false) {
    const errorMsg = data.error?.message || `API request failed with status ${response.status}`;
    const error = new Error(errorMsg);
    error.code = data.error?.code || 'API_ERROR';
    error.details = data.error?.details || {};
    throw error;
  }

  return data.data;
};
