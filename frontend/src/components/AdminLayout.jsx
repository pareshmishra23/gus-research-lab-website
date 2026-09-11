import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Video, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Globe,
  Activity,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuSections = [
  {
    title: null,
    items: [
      { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' }
    ]
  },
  {
    title: 'CONTENT',
    items: [
      { path: '/admin/projects', icon: Briefcase, label: 'Research Projects' },
      { path: '/admin/articles', icon: FileText, label: 'Articles / Blog' },
      { path: '/admin/videos', icon: Video, label: 'Videos' }
    ]
  },
  {
    title: 'SITE & CMS',
    items: [
      { path: '/admin/settings', icon: Settings, label: 'Site & Footer Settings' }
    ]
  },
  {
    title: 'ADMINISTRATION',
    items: [
      { path: '/admin/users', icon: Users, label: 'Administrators' }
    ]
  }
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentPageLabel = menuSections
    .flatMap(s => s.items)
    .find(item => item.path === location.pathname)?.label || 'Admin CMS';

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/">🔬 GUS LAB</Link>
        </div>
        
        <nav className="sidebar-nav">
          {menuSections.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '1.25rem' }}>
              {section.title && (
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 0.75rem 0.4rem', marginTop: '0.5rem' }}>
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {isActive && <ChevronRight size={16} className="active-indicator" />}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>{currentPageLabel}</h2>
          <div className="admin-user">
            <span>{user?.username || 'Admin User'}</span>
            <div className="avatar">{user?.username?.charAt(0).toUpperCase() || 'A'}</div>
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
