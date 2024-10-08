import Navbar from "@/components/Navbar";
import { useState } from "react";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>("tables");

  const handleSectionClick = (section: string) => {
    setActiveSection(section);
  };

  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const addTable = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tables`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setSuccessMessage("Table added successfully!");
        setName("");
      } else {
        const errorData = await res.json();
        setError(`Failed to add table: ${errorData.message}`);
      }
    } catch (err) {
      setError("Something went wrong while adding the table.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <ul>
            <li className="dash-item">
              <button
                className={`sidebar-btn ${
                  activeSection === "tables" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("tables")}
              >
                Manage Tables
              </button>
            </li>
            <li className="dash-item">
              <button
                className={`sidebar-btn ${
                  activeSection === "orders" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("orders")}
              >
                Manage Orders
              </button>
            </li>
            <li className="dash-item">
              <button
                className={`sidebar-btn ${
                  activeSection === "menu" ? "active" : ""
                }`}
                onClick={() => handleSectionClick("menu")}
              >
                Manage Menu
              </button>
            </li>
          </ul>
        </div>
        <div className="dashboard-content">
          <h1>Admin Dashboard</h1>
          {activeSection === "tables" && (
            <section>
              <h2>Manage Tables</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTable();
                }}
              >
                <label>
                  Table Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Table"}
                </button>
              </form>
            </section>
          )}

          {activeSection === "orders" && (
            <section>
              <h2>Manage Orders</h2>
              <p>This is where you can manage orders.</p>
            </section>
          )}

          {activeSection === "menu" && (
            <section>
              <h2>Manage Menu</h2>
              <p>This is where you can manage the menu.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
