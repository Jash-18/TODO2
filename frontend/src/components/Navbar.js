import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Link to="/" className="navbar-brand">
          <img
            src="/logo.png"
            alt="JTask"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span>JTask</span>
        </Link>
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
              {user.name || user.email}
            </span>
            <button
              className="icon-btn"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
            >
              <LogoutIcon style={{ fontSize: 18 }} />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
