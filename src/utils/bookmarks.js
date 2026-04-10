const BOOKMARKS_KEY = 'github-explorer-bookmarks';

/**
 * Retrieves the currently saved bookmarks from localStorage
 * @returns {Array} List of repository objects
 */
export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to parse bookmarks:', err);
    return [];
  }
};

/**
 * Overwrites the persistent localStorage directly with a new array
 * @param {Array} bookmarks 
 */
export const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (err) {
    console.error('Failed to save bookmarks:', err);
  }
};

/**
 * Checks if a specific repository ID is globally saved
 * @param {number} repoId 
 * @returns {boolean}
 */
export const isBookmarked = (repoId) => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.id === repoId);
};

/**
 * Toggles a repository in the global registry map securely.
 * Will construct and push a minimal repo layout mapping if inserting.
 * @param {Object} repo 
 * @returns {boolean} The resulting active state
 */
export const toggleBookmark = (repo) => {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex(b => b.id === repo.id);

  if (index >= 0) {
    bookmarks.splice(index, 1);
    saveBookmarks(bookmarks);
    return false; // Removed
  } else {
    const cleanRepo = {
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      language: repo.language,
      html_url: repo.html_url,
      private: repo.private,
      owner: repo.owner ? {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url
      } : null
    };
    bookmarks.push(cleanRepo);
    saveBookmarks(bookmarks);
    return true; // Added
  }
};
