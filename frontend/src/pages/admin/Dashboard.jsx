import { motion } from 'framer-motion';
import { FileText, Briefcase, Video, Users } from 'lucide-react';

const stats = [
  { label: 'Total Articles', value: '24', icon: FileText, color: '#4a7bba' },
  { label: 'Active Projects', value: '12', icon: Briefcase, color: '#51cf66' },
  { label: 'Videos', value: '8', icon: Video, color: '#fcc419' },
  { label: 'Total Users', value: '156', icon: Users, color: '#ff6b6b' },
];

export default function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="stat-card-admin"
            >
              <div className="stat-info">
                <p>{stat.label}</p>
                <h3>{stat.value}</h3>
              </div>
              <div className="stat-icon-admin" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                <Icon size={24} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <div className="recent-activity card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-text">
                  <p><strong>New article published:</strong> "Quantum Computing Trends 2026"</p>
                  <span>2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="quick-actions card">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="btn btn-primary">Add New Article</button>
            <button className="btn btn-secondary">Upload Video</button>
            <button className="btn btn-secondary">New Project</button>
          </div>
        </div>
      </div>
    </div>
  );
}
