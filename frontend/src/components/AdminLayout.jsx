import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Video, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/articles', icon: FileText, label: 'Articles' },
  { path: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { path: '/admin/videos', icon: Video, label: 'Videos' },
  { path: '/admin/users', icon: Users, label: 'Users' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/">🔬 GUS LAB</Link>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`sidebar-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={16} className="active-indicator" />}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h2>{menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}</h2>
          <div className="admin-user">
            <span>Admin User</span>
            <div className="avatar">A</div>
          </div>
        </header>
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
