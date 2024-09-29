const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Hello dashboard</h1>
      <ul>
        <li>
          <a href="admin/mytables"></a>Manage Tables
        </li>
        <li>
          <a href="admin/myorders">Manage Orders</a>
        </li>
        <li>
          <a href="admin/menu">Manage Menu</a>
        </li>
      </ul>
    </div>
  );
};
export default AdminDashboard;
