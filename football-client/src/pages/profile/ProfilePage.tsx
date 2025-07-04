import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  Descriptions,
  Typography,
  Modal,
  type TabsProps,
  Tabs,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
} from "../../components/Icon/AntdIcons";
import { useAuthStore } from "../../stores/useAuthStore";
import {
  changePassword,
  changeProfile,
  type ChangePasswordValues,
  type editValues,
} from "../../services/memberService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { Title } = Typography;
const { confirm } = Modal;

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [editing, setEditing] = useState<boolean>(false);
  const [editValues, setEditValues] = useState({
    name: user?.name,
    YOB: user?.YOB,
  });
  const navigate = useNavigate();

  const handlePasswordChange = async (values: ChangePasswordValues) => {
    confirm({
      title: "Are you sure you want to change your password?",
      icon: <ExclamationCircleOutlined />,
      content: "You will be logged out after changing your password.",
      okText: "Yes, change it",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        try {
          const res = await changePassword(values);
          if (res.success) {
            toast.success(
              "Password updated successfully. Please log in again."
            );
            localStorage.removeItem("token");
            useAuthStore.getState().logout();
            setTimeout(() => {
              navigate("/auth/login");
            }, 1000);
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  const handleUpdateProfile = async (editValues: editValues) => {
    confirm({
      title: "Are you sure you want to update your profile?",
      icon: <ExclamationCircleOutlined />,
      content:
        "This will update your profile details. Do you want to continue?",
      okText: "Yes, update",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      onOk: async () => {
        const res = await changeProfile(editValues);
        if (res.success) {
          setUser(res.data);
          toast.success(res.message);
        }
      },
      onCancel: () => {
        setEditValues({ name: user?.name, YOB: user?.YOB });
      },
    });
  };

  const handleCancelButton = () => {
    setEditValues({ name: user?.name, YOB: user?.YOB });
    setEditing(false);
  };
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span style={{ color: "#ffffff", fontWeight: 600 }}>
          <UserOutlined style={{ marginRight: 8 }} />
          Member Information
        </span>
      ),
      children: (
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
            styles={{
              content: {
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                padding: "16px",
                fontSize: "16px",
                color: "#022c22",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
              },
              label: {
                fontWeight: "bold",
                fontSize: "14px",
                color: "#065f46",
                paddingBottom: "4px",
              },
            }}
          >
            <Descriptions.Item label="Full Name">
              {editing ? (
                <Input
                  value={editValues.name}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
              ) : (
                user?.name
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Member Name">
              {user?.membername}
            </Descriptions.Item>

            <Descriptions.Item label="Year of birth">
              {editing ? (
                <Input
                  type="number"
                  min={1900}
                  max={2025}
                  value={editValues.YOB}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      YOB: parseInt(e.target.value) || undefined,
                    })
                  }
                />
              ) : (
                user?.YOB
              )}
            </Descriptions.Item>
          </Descriptions>

          <div className="flex justify-center gap-4 mt-6">
            {editing ? (
              <>
                <Button onClick={handleCancelButton}>Cancel</Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#16a34a",
                    borderColor: "#16a34a",
                  }}
                  onClick={() => {
                    handleUpdateProfile(editValues);
                    setEditing(false);
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                style={{
                  backgroundColor: "#2563eb",
                  borderColor: "#2563eb",
                }}
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      ),
    },
  ];

  // 👇 Nếu không phải tài khoản Google thì mới cho đổi mật khẩu
  if (!user?.isGoogleAccount) {
    tabItems.push({
      key: "2",
      label: (
        <span style={{ color: "#ffffff", fontWeight: 600 }}>
          <LockOutlined style={{ marginRight: 8 }} />
          Change Password
        </span>
      ),
      children: (
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
              name="confirmNewPassword"
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
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            <Form.Item className="text-center mt-8">
              <Button
                htmlType="submit"
                className="w-full"
                style={{
                  backgroundColor: "#064e3b",
                  borderColor: "#064e3b",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    });
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white">
      <Card
        className="w-full max-w-4xl"
        variant="borderless"
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
          items={tabItems}
        />
      </Card>
    </div>
  );
};

export default ProfilePage;
