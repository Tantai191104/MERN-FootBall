// src/components/Header.tsx
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images.png";
import {
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "../components/Icon/AntdIcons";
import { useAuthStore } from "../stores/useAuthStore";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 shadow-md px-5 py-3 rounded-b-[52px] transition-transform">
      <div className="container mx-auto flex items-center justify-between gap-13 py-4">
        <Link to="/">
          <img src={Logo} alt="Logo" className="h-12 w-auto bg-white/30" />
        </Link>

        <nav className="flex flex-1 items-center space-x-8">
          <Link
            to="/"
            className="font-semibold text-[#003459] hover:text-[#003459]/80"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/profile"
              className="font-semibold text-[#003459] hover:text-[#003459]/80"
            >
              Profile
            </Link>
          )}

          {user?.isAdmin && (
            <>
              <Link
                to="/admin/playerManage"
                className="font-semibold text-[#003459] hover:text-[#003459]/80"
              >
                Players
              </Link>
              <Link
                to="/admin/teamManage"
                className="font-semibold text-[#003459] hover:text-[#003459]/80"
              >
                Teams
              </Link>
              <Link
                to="/admin/memberManage"
                className="font-semibold text-[#003459] hover:text-[#003459]/80"
              >
                Members
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Button
                icon={<LoginOutlined />}
                size="large"
                style={{
                  backgroundColor: "#F4F6F0",
                  color: "#485550",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 28px",
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(72, 85, 80, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#C0EB6A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F4F6F0";
                }}
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>

              <Button
                icon={<UserAddOutlined />}
                size="large"
                style={{
                  backgroundColor: "#10b981",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 28px",
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#10b981";
                }}
                onClick={() => navigate("/auth/signUp")}
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Button
              icon={<LogoutOutlined />}
              size="large"
              style={{
                backgroundColor: "#f87171",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 28px",
                fontSize: "16px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ef4444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#f87171";
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
