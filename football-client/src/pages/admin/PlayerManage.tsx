import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  Tag,
  Image,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Player, Team } from "../../model/Types";
import {
  addAPlayer,
  deletePlayerById,
  editAPlayer,
  fetchAllPlayer,
  type Query,
} from "../../services/playerService";
import { PlusOutlined, EditOutlined } from "../../components/Icon/AntdIcons";
import { toast } from "react-toastify";
import { getAllTeam } from "../../services/teamService";

export default function PlayerManage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();
  const [currentId, setCurrentId] = useState<string | null>(null);

  const query: Query = {};

  const getPlayers = async () => {
    setLoading(true);
    try {
      const res = await fetchAllPlayer(query);
      setPlayers(res.data.players);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const getAllTeams = async () => {
    try {
      const res = await getAllTeam();
      if (res.success) {
        setTeams(res.data);
      }
    } catch (err) {
      console.log("Failed to fetch teams:", err);
    }
  };
  useEffect(() => {
    getPlayers();
    getAllTeams();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await deletePlayerById(id);
      if (res.success) {
        toast.success(res.message);
        setPlayers(players.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddEdit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      if (isEditMode && currentId) {
        const res = await editAPlayer(currentId, values);
        if (res.success) toast.success(res.message);
      } else {
        const res = await addAPlayer(values);

        if (res.success) toast.success(res.message);
      }
      setIsModalOpen(false);
      form.resetFields();
      getPlayers();
    } catch (err) {
      console.log("Submit error", err);
    }
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setCurrentId(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setIsEditMode(true);
    setCurrentId(player._id);
    form.setFieldsValue({
      playerName: player.playerName,
      cost: player.cost,
      isCaptain: player.isCaptain,
      team: player.team._id,
      image: player.image,
      information: player.information,
    });
    setIsModalOpen(true);
  };

  const columns: ColumnsType<Player> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => <Image width={60} src={url} />,
    },
    {
      title: "Name",
      dataIndex: "playerName",
      key: "playerName",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => `$${cost}M`,
    },
    {
      title: "Captain",
      dataIndex: "isCaptain",
      key: "isCaptain",
      render: (isCaptain) =>
        isCaptain ? <Tag color="blue">Captain</Tag> : <Tag>No</Tag>,
    },
    {
      title: "Team",
      dataIndex: "team",
      key: "team",
      render: (team) => team?.teamName || "-",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        new Date(text).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this player?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#003459]">
            Player Management
          </h1>
          <Button icon={<PlusOutlined />} type="primary" onClick={openAddModal}>
            Add Player
          </Button>
        </div>

        <Table
          rowKey="_id"
          dataSource={players}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 6 }}
          bordered
        />
      </div>

      {/* Modal Add / Edit */}
      <Modal
        open={isModalOpen}
        title={isEditMode ? "Edit Player" : "Add Player"}
        onOk={handleAddEdit}
        onCancel={() => setIsModalOpen(false)}
        okText={isEditMode ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="playerName"
            label="Player Name"
            rules={[{ required: true, message: "Please enter player name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="cost"
            label="Cost (in million $)"
            rules={[{ required: true, message: "Please enter cost" }]}
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>

          <Form.Item name="isCaptain" label="Captain" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item
            name="team"
            label="Team"
            rules={[{ required: true, message: "Please select a team" }]}
          >
            <Select placeholder="Select team">
              {teams.map((team) => (
                <Select.Option key={team._id} value={team._id}>
                  {team.teamName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="information" label="Information">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
