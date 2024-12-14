import React, { useState, useEffect } from "react";
import {
  Layout,
  notification,
  Spin,
  Button,
  Modal,
  Typography,
  Card,
  Flex,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import TaskForm from "./components/TaskForm2";
import TaskTable from "./components/TaskTable2";
import "./styles/components.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  // State management for tasks, loading status, editing state, and modal visibility

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingTask, setEditingTask] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // API endpoint for tasks
  const API_URL = "http://localhost:5000/tasks";

  // Function to handle task editing
  const handleEdit = (task: any) => {
    setEditingTask(task);
    setIsModalVisible(true);
  };

  // Function for showing the add task modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingTask(null);
  };

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch {
      notification.error({ message: "Error fetching tasks" });
    } finally {
      setLoading(false);
    }
  };

  // Handle task submission (create/update)
  const handleSubmit = async (task: any) => {
    try {
      if (editingTask) {
        const response = await axios.put(`${API_URL}/${editingTask.id}`, task);
        setTasks((prev) =>
          prev.map((t) => (t.id === editingTask.id ? response.data : t))
        );
        notification.success({ message: "Task updated successfully!" });
      } else {
        const response = await axios.post(API_URL, task);
        setTasks((prev) => [...prev, response.data]);
        notification.success({ message: "Task added successfully!" });
      }
      setIsModalVisible(false);
      setEditingTask(null);
    } catch {
      notification.error({ message: "Error saving task" });
    } finally {
      setEditingTask(null);
    }
  };

  // Handle task deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      notification.success({ message: "Task deleted successfully!" });
    } catch {
      notification.error({ message: "Error deleting task" });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={2} style={{ color: "white", margin: "0" }}>
          Task Management
        </Title>
      </Header>
      <Content>
        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <div className="task-dashboard">
            <div className="content-wrapper">
              <Card>
                <Flex
                  justify="space-between"
                  align="center"
                  className="table-header"
                >
                  <Title level={3}>Task List</Title>
                  <Button
                    key="add"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                  >
                    Add Task
                  </Button>
                </Flex>
                <TaskTable
                  tasks={tasks}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Card>

              <Modal
                title={
                  <Title level={4}>
                    {editingTask ? "Update Task" : "Add New Task"}
                  </Title>
                }
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
                width={600}
              >
                <TaskForm
                  onSubmit={handleSubmit}
                  initialValues={editingTask}
                  onCancel={handleCancel}
                  isEditing={!!editingTask}
                />
              </Modal>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default App;
