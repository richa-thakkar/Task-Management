import React from "react";
import { Form, Input, Select, DatePicker, Switch, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

interface TaskFormProps {
  onSubmit: (task: any) => void;
  initialValues?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      // Ensure the dueDate is a valid Day.js object
      const formattedValues = {
        ...initialValues,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : null, // Convert to Day.js object
      };
      form.setFieldsValue(formattedValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate.format("YYYY-MM-DD"),
    };
    onSubmit(formattedValues);
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="title" label="Task Title" rules={[{ required: true, message: "Task title is required!" }]}>
        <Input placeholder="Enter task title" />
      </Form.Item>
      <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
        <Select placeholder="Select priority">
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item name="completed" label="Status" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Button type="primary" htmlType="submit">Submit</Button>
    </Form>
  );
};

export default TaskForm;
