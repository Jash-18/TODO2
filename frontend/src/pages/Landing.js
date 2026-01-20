import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SpeedIcon from "@mui/icons-material/Speed";
import SecurityIcon from "@mui/icons-material/Security";

const Landing = () => {
  const { user } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-canvas)" }}>
      <nav
        style={{
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/logo.png"
            alt="JTask"
            style={{ width: 32, height: 32 }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            JTask
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {user ? (
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      <main
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          Your Tasks,
          <br />
          <span style={{ color: "var(--primary)" }}>Simplified</span>
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            maxWidth: 500,
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}
        >
          A minimal, fast, and beautiful task manager designed to help you stay
          organized without the clutter.
        </p>
        {!user && (
          <Link
            to="/register"
            className="btn btn-primary"
            style={{
              padding: "0.75rem 2rem",
              fontSize: "14px",
            }}
          >
            Start Free Today →
          </Link>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
            marginTop: "4rem",
            textAlign: "left",
          }}
        >
          {[
            {
              icon: (
                <CheckCircleIcon
                  style={{ fontSize: 24, color: "var(--success)" }}
                />
              ),
              title: "Simple & Clean",
              desc: "No unnecessary features. Just what you need to get things done.",
            },
            {
              icon: (
                <SpeedIcon style={{ fontSize: 24, color: "var(--accent)" }} />
              ),
              title: "Lightning Fast",
              desc: "Optimized for speed. Your tasks load instantly, every time.",
            },
            {
              icon: (
                <SecurityIcon
                  style={{ fontSize: 24, color: "var(--warning)" }}
                />
              ),
              title: "Secure",
              desc: "Your data is safe with industry-standard encryption and security.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-default)",
                borderRadius: "var(--radius)",
                padding: "1.5rem",
              }}
            >
              <div style={{ marginBottom: "0.75rem" }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "var(--text-primary)",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  fontSize: "14px",
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "1.5rem",
          color: "var(--text-muted)",
          fontSize: "12px",
          borderTop: "1px solid var(--border-default)",
        }}
      >
        Built by{" "}
        <a
          href="https://www.linkedin.com/in/jaswanth-koppala-024943250/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}
        >
          Jaswanth Koppala
        </a>
      </footer>
    </div>
  );
};

export default Landing;
