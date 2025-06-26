import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images.png";
import { LoginOutlined, UserAddOutlined } from "../components/Icon/AntdIcons";
function Header() {
  const navigation = useNavigate()
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 shadow-md px-5 py-3 rounded-b-[52px] transition-transform">
      <div className="container mx-auto flex items-center justify-between gap-13 p-6">
        <img src={Logo} alt="Logo" className="h-12 w-auto" />
        <nav className="flex flex-1 items-center space-x-8">
          <Link
            to="#"
            className="font-semibold text-[#003459] hover:text-[#003459]/80"
          >
            Home
          </Link>
          <Link
            to="#"
            className="font-semibold text-[#003459] hover:text-[#003459]/80"
          >
            Category
          </Link>
          <Link
            to="#"
            className="font-semibold text-[#003459] hover:text-[#003459]/80"
          >
            About
          </Link>
          <Link
            to="#"
            className="font-semibold text-[#003459] hover:text-[#003459]/80"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            type="primary"
            size="large"
            icon={<LoginOutlined />}
            style={{
              backgroundColor: "#F4F6F0",
              color: "#485550",
              border: "none",
              borderRadius: "10px",
              padding: "10px 28px",
              fontSize: "16px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(72, 85, 80, 0.3)",
              transition: "all 0.5s ease in out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#C0EB6A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#F4F6F0";
            }}
            onClick={() => navigation("/auth/login")}
          >
            Login
          </Button>

          <Button
            size="large"
            style={{
              backgroundColor: "#10b981",
              border: "none",
              borderRadius: "10px",
              padding: "10px 28px",
              fontSize: "16px",
              fontWeight: "600",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#059669";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#10b981";
            }}
            icon={<UserAddOutlined />}
            onClick={() => navigation("/auth/signUp")}
          >
            SignUp
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
