import { LockOutlined, UserOutlined } from "../../components/Icon/AntdIcons";
import { FcGoogle } from "../../components/Icon/ReactIcons";
import { Form, Input, Button, Typography, Card } from "antd";

const { Title, Text } = Typography;
type LoginValues = {
  userName: string;
  password: string;
};

export default function LoginPage() {
  const handleLogin = (values: LoginValues) => {
    console.log("Login info:", values);
    // Gọi API login ở đây
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

          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item
              label="Username"
              name="username"
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
          <Button
            icon={<FcGoogle size={20} />}
            htmlType="submit"
            size="large"
            className="w-full"
            style={{
              backgroundColor: "#ffff",
              color: "#485550",
              fontWeight: 600,
              borderRadius: "8px",
            }}
          >
            Sign Up with Google
          </Button>
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
