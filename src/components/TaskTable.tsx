import React from "react";
import { Table, Button } from "antd";

interface TaskTableProps {
  tasks: any[];
  onEdit: (task: any) => void;
  onDelete: (id: number) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Priority", dataIndex: "priority", key: "priority" },
    { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
    { title: "Status", dataIndex: "completed", key: "completed", render: (completed: boolean) => (completed ? "Completed" : "Pending") },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={tasks} rowKey="id" />;
};

export default TaskTable;
