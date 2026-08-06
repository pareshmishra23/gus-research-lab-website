export default function Settings() {
  return (
    <div className="card">
      <h3>General Settings</h3>
      <form style={{ marginTop: '2rem', maxWidth: '500px' }}>
        <div className="form-group">
          <label>Lab Name</label>
          <input type="text" defaultValue="GUS Research Lab" />
        </div>
        <div className="form-group">
          <label>Contact Email</label>
          <input type="email" defaultValue="info@guslab.res" />
        </div>
        <div className="form-group">
          <label>Maintenance Mode</label>
          <select className="custom-select">
            <option value="off">Off</option>
            <option value="on">On</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Settings</button>
      </form>
    </div>
  );
}
