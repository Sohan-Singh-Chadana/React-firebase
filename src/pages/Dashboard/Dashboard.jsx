import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { NotificationProvider } from "../../context/NotificationToastContext";
import { app } from "../../Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import "./Dashboard.css";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const LogOut = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Yes login ");
      } else {
        console.log("No login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${isActive && "active"}  nav-link`}
          style={{ backgroundColor: "white", color: "black" }}
        >
          <span className="material-symbols-rounded">person</span>
          <span>Dashboard</span>
        </NavLink>
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

        <div className="logout-btn" onClick={LogOut}>
          <span className="material-symbols-rounded">logout</span>
          <span>Logout</span>
        </div>
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
