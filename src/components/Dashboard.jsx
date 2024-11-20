import { Link, NavLink, Outlet } from "react-router-dom";
import { NotificationProvider } from "../context/NotificationToastContext";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "24px",
      }}
    >
      <div
        style={{
          width: "20%",
          backgroundColor: "lightskyblue",
          height: "100vh",
        }}
      >
        <NavLink
          to="/dashboard/addStudent"
          className={({ isActive }) => `${isActive && "active"}  `}
          style={{
            color: "white",
            display: "block",
            fontSize: "20px",
            textAlign: "center",
            padding: "10px",
            margin: "10px 20px",
          }}
        >
          Add Student
        </NavLink>
        <NavLink
          to="/dashboard/studentList"
          className={({ isActive }) => `${isActive && "active"} `}
          style={{
            color: "white",
            display: "block",
            fontSize: "20px",
            textAlign: "center",
            padding: "10px",
            margin: "10px 20px",
          }}
        >
          Student List
        </NavLink>
        <NavLink
          to="/dashboard/addFaculty"
          className={({ isActive }) => `${isActive && "active"} `}
          style={{
            color: "white",
            display: "block",
            fontSize: "20px",
            textAlign: "center",
            padding: "10px",
            margin: "10px 20px",
          }}
        >
          Add Faculty
        </NavLink>
        <NavLink
          to="/dashboard/facultyList"
          className={({ isActive }) => `${isActive && "active"} `}
          style={{
            color: "white",
            display: "block",
            fontSize: "20px",
            textAlign: "center",
            padding: "10px",
            margin: "10px 20px",
          }}
        >
          Faculty List
        </NavLink>
      </div>
      <div style={{ width: "75%", height: "100vh" }}>
        <NotificationProvider>
          <Outlet />
        </NotificationProvider>
      </div>
    </div>
  );
};

export default Dashboard;
