import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ResearchPage from './pages/ResearchPage';
import BlogPage from './pages/BlogPage';
import PublicationsPage from './pages/PublicationsPage';
import AIResearchAssistant from './pages/AIResearchAssistant';
import ProjectDetailPage from './pages/ProjectDetailPage';
import VideosPage from './pages/VideosPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import Articles from './pages/admin/Articles';
import Projects from './pages/admin/Projects';
import Videos from './pages/admin/Videos';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Breadcrumbs from './components/Breadcrumbs';
import ScrollToTop from './components/ScrollToTop';

import { useAuth } from './context/AuthContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null; // Or a loading spinner

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    style={{ height: '100%' }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/research" element={<PageWrapper><ResearchPage /></PageWrapper>} />
        <Route path="/research/:projectId" element={<PageWrapper><ProjectDetailPage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogPage /></PageWrapper>} />
        <Route path="/publications" element={<PageWrapper><PublicationsPage /></PageWrapper>} />
        <Route path="/videos" element={<PageWrapper><VideosPage /></PageWrapper>} />
        <Route path="/ai-assistant" element={<PageWrapper><AIResearchAssistant /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout><PageWrapper><AdminPage /></PageWrapper></AdminLayout></ProtectedRoute>} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><PageWrapper><Dashboard /></PageWrapper></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/articles" element={<ProtectedRoute><AdminLayout><PageWrapper><Articles /></PageWrapper></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><PageWrapper><Projects /></PageWrapper></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/videos" element={<ProtectedRoute><AdminLayout><PageWrapper><Videos /></PageWrapper></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminLayout><PageWrapper><Users /></PageWrapper></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><PageWrapper><Settings /></PageWrapper></AdminLayout></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
}

function RoutesWrapper() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return (
      <div className="admin-app-wrapper">
        <AnimatedRoutes />
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <Breadcrumbs />
      <main>
        <AnimatedRoutes />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
