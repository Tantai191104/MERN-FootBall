import { Form, Modal, Select, type FormProps } from "antd";
import TextArea from "antd/es/input/TextArea";
type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (content: string, rating: number) => void;
};

interface CommentFormValues {
  content: string;
  rating: number;
}

function CommentModal({ open, onClose, onAdd }: Props) {
  const [form] = Form.useForm<CommentFormValues>();

  const handleSubmit: FormProps<CommentFormValues>["onFinish"] = (values) => {
    onAdd(values.content, values.rating);
    form.resetFields();
  };

  return (
    <Modal
      open={open}
      title="Add Comment"
      onCancel={onClose}
      onOk={() => form.submit()}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ rating: 1 }}
      >
        <Form.Item
          name="content"
          label="Comment"
          rules={[{ required: true, message: "Please enter your comment" }]}
        >
          <TextArea rows={4} placeholder="Write your comment..." />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rating"
          rules={[{ required: true, message: "Please select a rating" }]}
        >
          <Select placeholder="Select rating (1 - 3)">
            <Select.Option value={1}>⭐</Select.Option>
            <Select.Option value={2}>⭐⭐</Select.Option>
            <Select.Option value={3}>⭐⭐⭐</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CommentModal;
