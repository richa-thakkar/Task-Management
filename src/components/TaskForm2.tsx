import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Switch,
  Button,
  Space,
  Divider,
  Row,
  Col,
} from "antd";
import {
  SaveOutlined,
  CloseOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

// TaskForm component for creating and editing tasks
interface TaskFormProps {
  onSubmit: (task: any) => void;
  initialValues?: any;
  isEditing: boolean;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  initialValues,
  isEditing,
  onCancel,
}) => {
  const [form] = Form.useForm();

  //Effect to set form values when editing
  React.useEffect(() => {
    if (initialValues) {
      const formattedValues = {
        ...initialValues,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null,
      };
      form.setFieldsValue(formattedValues);
    }
  }, [initialValues, form]);

  // Handle form submission
  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate.format("YYYY-MM-DD"),
    };
    onSubmit(formattedValues);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical" size="large">
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: "Task title is required!" }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select priority">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="completed" label="Status" valuePropName="checked">
        <Switch checkedChildren="Completed" unCheckedChildren="Pending" />
      </Form.Item>

      <Divider />

      <Form.Item className="form-actions">
        <Space>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            {isEditing ? "Update Task" : "Add Task"}
          </Button>
          <Button icon={<CloseOutlined />} onClick={onCancel}>
            Cancel
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
