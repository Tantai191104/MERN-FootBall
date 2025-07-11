import { toast } from "react-toastify";
import { LockOutlined, UserOutlined } from "../../components/Icon/AntdIcons";
import { Form, Input, Button, Typography, Card } from "antd";
import { login, loginGoogle } from "../../services/authService";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";

const { Title, Text } = Typography;

type LoginValues = {
  membername: string;
  password: string;
};

export default function LoginPage() {
  const navigation = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async (values: LoginValues) => {
    const res = await login(values);

    if (res.success) {
      setAuth(res.data.member, res.data.token);
      toast.success("Login successful!");
      navigation("/");
    } else {
      toast.error(res.message || "Login failed.");
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    if (!credentialResponse.credential) {
      toast.error("Google credential missing");
      return;
    }
    try {
      const res = await loginGoogle({ token: credentialResponse.credential });
      if (res.success) {
       setAuth({ ...res.data.member, isGoogleAccount: true }, res.data.token);
        toast.success("Login with Google successful!");
        navigation("/");
      } else {
        toast.error(res.message || "Google login failed");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      toast.error("Unexpected error during Google login");
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="relative p-2 rounded-2xl bg-gradient-to-r from-[#C0EB6A] to-[#485550] max-w-md w-full shadow-2xl">
        <Card
          className="w-full max-w-md shadow-2xl rounded-2xl"
          style={{ padding: "40px" }}
        >
          <div className="text-center mb-6">
            <Title level={2} style={{ color: "#485550", marginBottom: 0 }}>
              Welcome Back!
            </Title>
            <Text type="secondary">Please login to your account</Text>
          </div>

          <Form<LoginValues> layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Username"
              name="membername"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Enter your username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full"
                style={{
                  backgroundColor: "#C0EB6A",
                  marginTop: "12px",
                  color: "#485550",
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-2 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google login failed")}
            />
          </div>

          <div className="text-center mt-8">
            <Text type="secondary">Don’t have an account?</Text>
            <a
              href="/auth/signUp"
              className="ml-2 text-[#485550] font-semibold"
            >
              Sign Up
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
