import Navbar from "@/components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <h1>Welcome to the Backroom</h1>
      <ul>
        <li>
          <a href="admin/mytables">Manage Tables</a>
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
