import { useEffect, useState } from "react";
import { Table, Button, Input, Modal, Form, Typography } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "../../components/Icon/AntdIcons";
import { toast } from "react-toastify";
import { addATeam, deleteATeam, getAllTeam } from "../../services/teamService";
import type { Team } from "../../model/Types";

const { Title } = Typography;
const { confirm } = Modal;

function TeamManage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await getAllTeam();
        if (res.success) {
          setTeams(res.data);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const showAddModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleAddTeam = async () => {
    try {
      const values = await form.validateFields();
      const res = await addATeam(values.teamName);
      if (res.success) {
        toast.success(res.message);
        setIsModalOpen(false);
        const updated = await getAllTeam();
        if (updated.success) {
          setTeams(updated.data);
        }
      }
    } catch (error) {
      console.error("Add team error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = (id: string) => {
    const team = teams.find((t) => t._id === id);
    confirm({
      title: `Are you sure you want to delete "${team?.teamName}"?`,
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteATeam(id);
          if (res.success) {
            toast.success(`Team "${team?.teamName}" deleted`);
            setTeams((prev) => prev.filter((t) => t._id !== id));
          }
        } catch (error) {
          console.log(error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
      render: (text: string) => (
        <Typography.Text strong style={{ fontSize: 16 }}>
          {text}
        </Typography.Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Team) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)}
          className="rounded-xl"
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} style={{ margin: 0, color: "#003459" }}>
            Team Management
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showAddModal}
            className="rounded-xl"
          >
            Add Team
          </Button>
        </div>

        <Table
          dataSource={teams}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          bordered
          rowClassName={() => "hover:bg-blue-50"}
        />
      </div>

      <Modal
        title={
          <span style={{ color: "#003459", fontWeight: "bold" }}>
            Add New Team
          </span>
        }
        open={isModalOpen}
        onOk={handleAddTeam}
        onCancel={() => setIsModalOpen(false)}
        okText="Add"
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: "#52c41a", borderColor: "#52c41a" },
          className: "rounded-xl",
        }}
        cancelButtonProps={{ className: "rounded-xl" }}
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label={<b style={{ color: "#333" }}>Team Name</b>}
            name="teamName"
            rules={[{ required: true, message: "Please enter team name" }]}
          >
            <Input placeholder="Enter team name" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TeamManage;
