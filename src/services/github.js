const BASE_URL = 'https://api.github.com';

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    if (response.status === 404) {
      throw new Error('Resource not found.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }
  return response.json();
};

export const searchUsers = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=12`);
    const data = await handleResponse(response);
    return data.items || [];
  } catch (error) {
    throw error;
  }
};

export const getUserRepos = async (username) => {
  if (!username) return [];
  try {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`);
    const data = await handleResponse(response);
    return data || [];
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (username) => {
  if (!username) return null;
  try {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(username)}`);
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};
