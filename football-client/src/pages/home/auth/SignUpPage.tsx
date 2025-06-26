import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "../../../components/Icon/AntdIcons";

const { Title, Text } = Typography;
type signUpValues = {
  username: string;
  password: string;
  confirmPassword: string;
};
export default function SignUpPage() {
  const handleSignUp = (values: signUpValues) => {
    console.log("Sign up info:", values);
    // Gọi API signup ở đây
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#C0EB6A] to-[#485550] px-4">
      <Card
        className="w-full max-w-md shadow-2xl rounded-2xl"
        bodyStyle={{ padding: "40px" }}
      >
        <div className="text-center mb-6">
          <Title level={2} style={{ color: "#003459", marginBottom: 0 }}>
            Create Account
          </Title>
          <Text type="secondary">Sign up to get started</Text>
        </div>

        <Form layout="vertical" onFinish={handleSignUp}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
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
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="password"
            rules={[
              { required: true, message: "Please confirm your password" },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
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
                color: "#485550",
                fontWeight: 600,
                borderRadius: "8px",
              }}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text type="secondary">Already have an account?</Text>
          <a href="/auth/login" className="ml-2 text-[#003459] font-semibold">
            Login
          </a>
        </div>
      </Card>
    </div>
  );
}
