import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import UserRepos from './pages/UserRepos';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/user/:username" element={<UserRepos />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
