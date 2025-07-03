import { Form, Input, Button, Typography, Card, InputNumber } from "antd";
import { toast } from "react-toastify";
import { register } from "../../services/authService";
import { UserOutlined, LockOutlined } from "../../components/Icon/AntdIcons";
import type { RegisterPayload } from "../../model/AuthTypes";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function SignUpPage() {
  const navigation = useNavigate();
  const [form] = Form.useForm();

  const handleSignUp = async (values: RegisterPayload) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const payload: RegisterPayload = {
      membername: values.membername,
      password: values.password,
      confirmPassword: values.confirmPassword,
      name: values.name,
      YOB: values.YOB,
    };

    try {
      const res = await register(payload);

      if (res.success) {
        toast.success(res.message || "Register successful!");
        navigation("/auth/login");
      } else {
        toast.error(res.message || "Register failed.");
      }
    } catch {
      // error handled globally by interceptor
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
              Create Account
            </Title>
            <Text type="secondary">Please fill in the details to register</Text>
          </div>

          <Form form={form} layout="vertical" onFinish={handleSignUp}>
            <Form.Item
              label="Member Name"
              name="membername"
              rules={[
                { required: true, message: "Please enter a member name" },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined />}
                placeholder="Enter your member name"
              />
            </Form.Item>

            <Form.Item
              label="Full Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Year of Birth"
              name="YOB"
              rules={[
                { required: true, message: "Please enter your year of birth" },
                {
                  type: "number",
                  min: 1900,
                  max: new Date().getFullYear(),
                  message: "Year of birth must be between 1900 and 2025",
                },
              ]}
            >
              <InputNumber
                size="large"
                className="w-full"
                placeholder="Enter year of birth"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter a password" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
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
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-4">
            <Text type="secondary">Already have an account?</Text>
            <a href="/auth/login" className="ml-2 text-[#485550] font-semibold">
              Login
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
