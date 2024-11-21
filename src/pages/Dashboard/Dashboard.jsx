import { NavLink, Outlet } from "react-router-dom";
import { NotificationProvider } from "../../context/NotificationToastContext";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <NavLink
          to="/dashboard/addStudent"
          className={({ isActive }) => `${isActive && "active"} nav-link`}
        >
          <span className="material-symbols-rounded">person_add</span>
          <span>Add Student</span>
        </NavLink>
        <NavLink
          to="/dashboard/addFaculty"
          className={({ isActive }) => `${isActive && "active"} nav-link `}
        >
          <span className="material-symbols-rounded">person_add</span>
          <span>Add Faculty</span>
        </NavLink>
        <NavLink
          to="/dashboard/studentList"
          className={({ isActive }) => `${isActive && "active"} nav-link `}
        >
          <span className="material-symbols-rounded">list</span>
          <span>Student List</span>
        </NavLink>

        <NavLink
          to="/dashboard/facultyList"
          className={({ isActive }) => `${isActive && "active"} nav-link`}
        >
          <span className="material-symbols-rounded">list</span>
          <span> Faculty List</span>
        </NavLink>
      </div>
      <div className="dashboard-main">
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
      </div>
    </div>
  );
};

export default Dashboard;
