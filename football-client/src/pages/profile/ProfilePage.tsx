import React from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Descriptions,
  Typography,
} from "antd";
import { LockOutlined, UserOutlined } from "../../components/Icon/AntdIcons";

const { TabPane } = Tabs;
const { Title } = Typography;

type ChangePasswordValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  const handlePasswordChange = (values: ChangePasswordValues) => {
    console.log("Password change submitted:", values);
    // TODO: Call API here
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <Card
        className="w-full max-w-4xl"
        bordered={false}
        style={{
          background:
            "linear-gradient(to right, rgba(192, 235, 106, 0.7), #485550)",
          borderRadius: "20px",
          padding: "32px",
          border: "1px solid #d1fae5",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.08)",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <div className="text-center mb-8">
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(192, 235, 106, 0.7)",
              padding: "12px 28px",
              borderRadius: "14px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transform: "translateY(-10px)",
            }}
          >
            <Title
              level={2}
              style={{
                color: "#ffff",
                fontWeight: 800,
                fontSize: "32px",
                marginBottom: 0,
                letterSpacing: "0.5px",
                textShadow: "0 1px 1px rgba(0,0,0,0.05)",
              }}
            >
              ⚽ Member Profile
            </Title>
          </div>
        </div>

        <Tabs
          defaultActiveKey="1"
          centered
          tabBarGutter={80}
          animated={{ inkBar: true, tabPane: true }}
          tabBarStyle={{ fontWeight: 600, fontSize: 16 }}
        >
          {/* Tab 1: Member Info */}
          <TabPane
            tab={
              <span style={{ color: "#ffffff", fontWeight: 600 }}>
                <UserOutlined style={{ marginRight: 8 }} />
                Member Information
              </span>
            }
            key="1"
          >
            <div className="flex flex-col items-center gap-6 mt-8 mb-4">
              <Avatar
                size={100}
                icon={<UserOutlined />}
                style={{
                  backgroundColor: "#064e3b",
                  border: "3px solid white",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              />
              <Descriptions
                column={1}
                className="w-full max-w-xl"
                layout="vertical"
                contentStyle={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "16px",
                  fontSize: "16px",
                  color: "#022c22",
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
                }}
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#065f46",
                  paddingBottom: "4px",
                }}
              >
                {[
                  { label: "Full Name", value: "John Doe" },
                  { label: "Email", value: "johndoe@example.com" },
                  { label: "Phone", value: "+1 234 567 890" },
                  { label: "Address", value: "123 Main Street, New York" },
                ].map((item, index) => (
                  <Descriptions.Item key={index} label={item.label}>
                    {item.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </div>
          </TabPane>

          {/* Tab 2: Change Password */}
          <TabPane
            tab={
              <span style={{ color: "#ffffff", fontWeight: 600 }}>
                <LockOutlined style={{ marginRight: 8 }} />
                Change Password
              </span>
            }
            key="2"
          >
            <div className="flex justify-center mt-8 mb-4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handlePasswordChange}
                className="w-full max-w-xl"
              >
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your current password",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter current password" />
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="newPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a new password",
                    },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter new password" />
                </Form.Item>

                <Form.Item
                  label="Confirm New Password"
                  name="confirmPassword"
                  dependencies={["newPassword"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your new password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("newPassword") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm new password" />
                </Form.Item>

                <Form.Item className="text-center mt-8">
                  <Button
                    className="w-full"
                    style={{
                      backgroundColor: "#064e3b",
                      borderColor: "#064e3b",
                      color: "#fff",
                      fontSize: "16px",
                      padding: "16px",
                      borderRadius: "8px",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#022c22")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#064e3b")
                    }
                  >
                    Update Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfilePage;
