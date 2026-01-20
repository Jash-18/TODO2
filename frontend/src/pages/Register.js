import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div style={{ textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="JTask"
            className="auth-logo"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start organizing your tasks today</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name (optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              autoComplete="name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password *</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--text-secondary)",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "var(--accent)",
              fontWeight: 500,
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
