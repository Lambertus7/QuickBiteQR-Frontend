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
            <li
              className={`dash-item ${
                activeSection === "tables" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("tables")}
            >
              Manage Tables
            </li>
            <li
              className={`dash-item ${
                activeSection === "orders" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("orders")}
            >
              Manage Orders
            </li>
            <li
              className={`dash-item ${
                activeSection === "menu" ? "active" : ""
              }`}
              onClick={() => handleSectionClick("menu")}
            >
              Manage Menu
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
              {/* Insert order management logic here */}
            </section>
          )}

          {activeSection === "menu" && (
            <section>
              <h2>Manage Menu</h2>
              <p>This is where you can manage the menu.</p>
              {/* Insert menu management logic here */}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
