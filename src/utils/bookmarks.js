const BOOKMARKS_KEY = 'github-explorer-bookmarks';

export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Failed to parse bookmarks:', err);
    return [];
  }
};

export const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (err) {
    console.error('Failed to save bookmarks:', err);
  }
};

export const isBookmarked = (repoId) => {
  const bookmarks = getBookmarks();
  return bookmarks.some(b => b.id === repoId);
};

export const toggleBookmark = (repo) => {
  const bookmarks = getBookmarks();
  const index = bookmarks.findIndex(b => b.id === repo.id);

  if (index >= 0) {
    bookmarks.splice(index, 1);
    saveBookmarks(bookmarks);
    return false;
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
    return true;
  }
};
