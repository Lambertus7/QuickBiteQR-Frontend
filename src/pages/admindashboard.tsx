import Navbar from "@/components/Navbar";
import { useState } from "react";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <h1>Welcome to the Backroom</h1>
      <ul className="dashboard-sidebar">
        <li className="dash-item">
          <a href="admin/mytables">Manage Tables</a>
        </li>
        <li className="dash-item">
          <a href="admin/myorders">Manage Orders</a>
        </li>
        <li className="dash-item">
          <a href="admin/menu">Manage Menu</a>
        </li>
      </ul>
    </div>
  );
};
export default AdminDashboard;
