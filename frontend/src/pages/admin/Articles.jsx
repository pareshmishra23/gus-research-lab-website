export default function Articles() {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Manage Articles</h3>
        <button className="btn btn-primary">Create New</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#a0aec0' }}>
              No articles found. Click "Create New" to add one.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
