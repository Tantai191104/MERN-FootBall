import { Form, Input, Button, Typography, Card } from "antd";
import { LockOutlined, UserOutlined } from "../../../components/Icon/AntdIcons";

const { Title, Text } = Typography;

type SignUpValues = {
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
  YOB: number;
};

export default function SignUpPage() {
  const [form] = Form.useForm();

  const handleSignUp = (values: SignUpValues) => {
    console.log("Sign up info:", values);
    // Gọi API ở đây
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

        <Form form={form} layout="vertical" onFinish={handleSignUp}>
          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please enter your username!" },
              { min: 4, message: "Username must be at least 4 characters" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your username"
            />
          </Form.Item>

          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your full name!" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
            hasFeedback
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          {/* YOB */}
          <Form.Item
            label="Year of Birth"
            name="YOB"
            rules={[
              { required: true, message: "Please enter your year of birth!" },
              {
                pattern: /^[0-9]{4}$/,
                message: "Enter a valid 4-digit year",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="e.g. 2000"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
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
