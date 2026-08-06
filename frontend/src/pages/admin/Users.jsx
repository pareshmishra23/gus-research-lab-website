export default function Users() {
  return (
    <div className="card">
      <div className="card-header">
        <h3>User Management</h3>
        <button className="btn btn-primary">Add User</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Admin User</td>
            <td>admin@guslab.res</td>
            <td><span className="badge">Administrator</span></td>
            <td><span className="status-badge active">Active</span></td>
            <td>Edit | Delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
