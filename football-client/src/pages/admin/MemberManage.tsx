import { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { getAllMembers } from "../../services/memberService";
import type { Member } from "../../model/Types";

const { Title } = Typography;

function MemberManage() {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getAllMembers();
        if (res.success) {
          setMembers(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };

    fetchMembers();
  }, []);

  const columns = [
    {
      title: "Member Name",
      dataIndex: "membername",
      key: "membername",
      render: (text: string) => (
        <span className="font-medium text-base text-[#1f2937]">{text}</span>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: "Year of Birth",
      dataIndex: "YOB",
      key: "YOB",
    },
    {
      title: "Create Date",
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
      title: "Update Date",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) =>
        new Date(text).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <Title level={3} style={{ margin: 0, color: "#003459" }}>
            Member Management
          </Title>
        </div>

        <Table
          dataSource={members}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 6 }}
          bordered
          rowClassName={() => "hover:bg-blue-50"}
        />
      </div>
    </div>
  );
}

export default MemberManage;
