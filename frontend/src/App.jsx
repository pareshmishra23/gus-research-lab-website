import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ResearchPage from './pages/ResearchPage';
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
import './App.css';

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
        <Route path="/admin" element={<PageWrapper><AdminPage /></PageWrapper>} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin/dashboard" element={<AdminLayout><PageWrapper><Dashboard /></PageWrapper></AdminLayout>} />
        <Route path="/admin/articles" element={<AdminLayout><PageWrapper><Articles /></PageWrapper></AdminLayout>} />
        <Route path="/admin/projects" element={<AdminLayout><PageWrapper><Projects /></PageWrapper></AdminLayout>} />
        <Route path="/admin/videos" element={<AdminLayout><PageWrapper><Videos /></PageWrapper></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><PageWrapper><Users /></PageWrapper></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><PageWrapper><Settings /></PageWrapper></AdminLayout>} />
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
  const isAdminPath = location.pathname.startsWith('/admin') && location.pathname !== '/admin';

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
