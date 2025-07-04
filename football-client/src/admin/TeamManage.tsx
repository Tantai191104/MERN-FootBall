import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Modal,
  Form,
  Space,
  Typography,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { addATeam, getAllTeam } from "../services/teamService";
import { toast } from "react-toastify";
import type { Team } from "../model/Types";

const { Title } = Typography;
const { confirm } = Modal;

function TeamManage() {
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await getAllTeam();
        if (res.success) {
          setTeams(res.data);
        } else {
          console.error("Failed to fetch teams");
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showAddModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

   const handleAddTeam = async () => {
    try {
      const values = await form.validateFields();
      console.log(values.teamName);
      const res = await addATeam(values.teamName);
      if (res.success) {
        toast.success(res.message);
        setIsModalOpen(false);
        form.resetFields();
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
    console.log(id);
    // const team = teams.find((t) => t.id === id);

    // confirm({
    //   title: `Are you sure you want to delete "${team.name}"?`,
    //   icon: <ExclamationCircleOutlined />,
    //   content: "This action cannot be undone.",
    //   okText: "Yes, delete it",
    //   okType: "danger",
    //   cancelText: "Cancel",
    //   onOk() {
    //     setTeams((prev) => prev.filter((t) => t.id !== id));
    //     message.success("Team deleted");
    //   },
    // });
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "teamName",
      key: "teamName",
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete("1")}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-6xl mx-auto mt-8">
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Space style={{ justifyContent: "space-between", width: "100%" }}>
          <Title level={3} style={{ margin: 0 }}>
            Team Management
          </Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddModal}>
            Add Team
          </Button>
        </Space>

        <Table
          dataSource={teams}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Space>

      <Modal
        title="Add New Team"
        open={isModalOpen}
        onOk={handleAddTeam}
        onCancel={() => setIsModalOpen(false)}
        okText="Add"
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="Team Name"
            name="teamName"
            rules={[{ required: true, message: "Please enter team name" }]}
          >
            <Input placeholder="Enter team name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TeamManage;
