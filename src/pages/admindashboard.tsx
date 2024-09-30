import Navbar from "@/components/Navbar";
import { useState } from "react";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      {/* <div>
        <h1>Welcome to the Backroom</h1>
        <p>
          Please select an option from the sidebar to manage your restaurant
          settings
        </p>
      </div> */}
      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <ul>
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
      </div>
    </div>
  );
};
export default AdminDashboard;
