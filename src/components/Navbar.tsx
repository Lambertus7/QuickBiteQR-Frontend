import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [getToken, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  return (
    <div>
      <nav>
        <ul className="navbar-container">
          <h1>QuickBiteQR ☕️ </h1>
          <li className="navbar-item">
            <Link href="/">Home</Link>
          </li>
          {getToken !== null ? (
            <li className="navbar-item">
              <Link href="/my-tables">My Tables</Link>
            </li>
          ) : null}
          {getToken === null ? (
            <li className="navbar-item">
              <Link href="/register">Register</Link>
            </li>
          ) : null}
          {getToken === null ? (
            <li className="navbar-item">
              <Link href="/login">Login</Link>
            </li>
          ) : (
            <li className="navbar-item">
              <button
                className="logout-button"
                onClick={() => {
                  setToken(null);
                  localStorage.removeItem("token");
                  location.reload();
                }}
              >
                Log out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
