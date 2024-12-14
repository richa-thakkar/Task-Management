import React from "react";
import { Table, Button, Space, Tag, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

// TaskTable component for displaying tasks
const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  // Define table columns configuration
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => (
        <Tag
          color={
            priority === "High"
              ? "red"
              : priority === "Medium"
              ? "orange"
              : "green"
          }
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date: string) => <div>{dayjs(date).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => (
        <Tag color={completed ? "success" : "default"}>
          {completed ? "Completed" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  //Return the Table component with pagination
  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} tasks`,
      }}
    />
  );
};

export default TaskTable;
