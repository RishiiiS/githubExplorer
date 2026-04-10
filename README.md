# GitHub Explorer

A React application that allows users to search GitHub profiles and explore their repositories through a clean and focused interface.

---

## Overview

GitHub Explorer is a frontend-focused project built as part of a developer assignment. It enables users to search for GitHub users, view their profiles, and explore their repositories efficiently.

The application emphasizes clean UI, performance, and maintainable code structure, inspired by real-world developer tools.

---

## Features

### User Search

* Search GitHub users in real-time
* Debounced input to reduce unnecessary API calls
* Displays avatar and username

### Repository Explorer

* View repositories of selected users
* Displays:

  * Repository name
  * Description
  * Stars
  * Forks
  * Language

### Sorting and Filtering

* Sort repositories by:

  * Stars
  * Forks
* Filter repositories by programming language

### State Handling

* Loading state (skeleton or spinner)
* Error handling
* Empty state for no results

### Responsive Design

* Mobile-first layout
* Optimized for mobile, tablet, and desktop

---

## Tech Stack

* React.js (Functional Components and Hooks)
* React Router
* CSS (custom styling)
* GitHub REST API

---

## API Used

This project uses the GitHub REST API:

Search Users:

```
https://api.github.com/search/users?q={query}
```

Get User Repositories:

```
https://api.github.com/users/{username}/repos
```

---

## Key Concepts Implemented

* Debouncing for performance optimization
* Reusable component-based architecture
* Custom hooks (e.g., useDebounce)
* Separation of concerns (UI and API logic)
* Clean and maintainable folder structure

---

## Project Structure

```id="x4bjki"
src/
 ├── components/
 ├── pages/
 ├── hooks/
 ├── services/
 ├── utils/
 ├── App.jsx
 └── main.jsx
```

---

## Getting Started

### 1. Clone the repository

```bash id="ysvl2k"
git clone https://github.com/your-username/github-explorer.git
```

### 2. Navigate to the project folder

```bash id="35asst"
cd github-explorer
```

### 3. Install dependencies

```bash id="eh00i9"
npm install
```

### 4. Run the development server

```bash id="j4h7b8"
npm run dev
```

---

## Future Improvements

* Bookmark repositories using localStorage
* Dark mode support
* Pagination or infinite scrolling
* Additional repository insights

---

## Notes

* This is a frontend-only project (no backend required)
* Focused on clean architecture and user experience
* Built to demonstrate frontend development skills

---

## Acknowledgements

* GitHub REST API for data access
* Inspired by GitHub and modern developer tools
