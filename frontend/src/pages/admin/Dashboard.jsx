import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Eye, FileEdit, Star, Users, Activity, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAdminMetrics, getAdminUsers, getAuditLogs } from '../../services/projectService';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    publishedCount: 0,
    draftCount: 0,
    featuredCount: 0,
    totalCount: 0
  });
  const [adminCount, setAdminCount] = useState(0);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const isSuperAdmin = user?.roles?.includes('ROLE_SUPER_ADMIN');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const metricsData = await getAdminMetrics();
      setMetrics(metricsData);

      if (isSuperAdmin) {
        const usersData = await getAdminUsers();
        setAdminCount(Array.isArray(usersData) ? usersData.length : 1);
      } else {
        setAdminCount(1);
      }

      try {
        const logsData = await getAuditLogs();
        setAuditLogs(Array.isArray(logsData) ? logsData.slice(0, 6) : []);
      } catch (err) {
        console.warn('Audit logs fetch failed:', err);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Published Projects', value: metrics.publishedCount, icon: Eye, color: '#4ade80' },
    { label: 'Draft / Unpublished', value: metrics.draftCount, icon: FileEdit, color: '#60a5fa' },
    { label: 'Featured Projects', value: metrics.featuredCount, icon: Star, color: '#fcc419' },
    { label: 'Administrators', value: adminCount, icon: Users, color: '#c084fc' },
  ];

  return (
    <div className="dashboard-wrapper" style={{ color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#f8fafc' }}>GUS Research Lab CMS Dashboard</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
            Welcome back, <strong>{user?.username || 'Admin'}</strong>
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          style={{ padding: '0.5rem 1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
        >
          <RefreshCw size={14} /> Refresh Metrics
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="stat-card-admin"
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div className="stat-info">
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 0.25rem 0', fontWeight: 600 }}>{stat.label}</p>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                  {loading ? '...' : stat.value}
                </h3>
              </div>
              <div className="stat-icon-admin" style={{ color: stat.color, backgroundColor: `${stat.color}15`, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Recent Audit Trail Activity */}
        <div className="recent-activity card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} style={{ color: '#60a5fa' }} /> Administrative Audit Trail
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Live System Logs</span>
          </div>

          <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {auditLogs.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No recent administrative actions recorded.</p>
            ) : (
              auditLogs.map((log) => (
                <div key={log.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.625rem', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '6px' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', color: '#f1f5f9' }}>
                      <strong>{log.username}</strong> performed <span style={{ color: '#60a5fa', fontWeight: 600 }}>{log.action}</span> on <em>{log.target}</em>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : 'Just now'}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions card" style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', fontSize: '1.1rem', color: '#f8fafc' }}>Quick Actions</h3>
          <div className="action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/admin/projects" className="btn btn-primary" style={{ textDecoration: 'none', textAlign: 'center', padding: '0.75rem', fontWeight: 600 }}>
              Manage Research Projects
            </Link>
            {isSuperAdmin && (
              <Link to="/admin/users" className="btn btn-secondary" style={{ textDecoration: 'none', textAlign: 'center', padding: '0.75rem', fontWeight: 600, background: 'rgba(255,255,255,0.08)', color: '#fff' }}>
                Manage Administrators
              </Link>
            )}
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', textAlign: 'center', padding: '0.75rem', fontWeight: 600, background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              View Public Website <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
