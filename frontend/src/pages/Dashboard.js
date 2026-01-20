import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <main className="main-content">
        <TodoList />
      </main>
    </div>
  );
};

export default Dashboard;
