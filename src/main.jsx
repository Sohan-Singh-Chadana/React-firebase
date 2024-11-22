import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentList from "./pages/StudentList/StudentList";
import AddStudent from "./components/AddStudent/AddStudent";
import AddFaculty from "./components/AddFaculty/AddFaculty";
import FacultyList from "./pages/FacultyList/FacultyList.jsx";
import UpdateStudent from "./components/UpdateStudent/UpdateStudent.jsx";
import UpdateFaculty from "./components/UpdateFaculty/UpdateFaculty.jsx";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.jsx";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Home from "./components/Home.jsx";

const isLoggedIn = localStorage.getItem("isLoggedIn");

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: isLoggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <PrivateRoute>
          <App />
        </PrivateRoute>
      ),
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <App />
        </PrivateRoute>
      ),
      children: [
        { path: "/dashboard", element: <Home /> },
        { path: "addStudent", element: <AddStudent /> },
        { path: "studentList", element: <StudentList /> },
        { path: "editStudent", element: <UpdateStudent /> },
        { path: "addFaculty", element: <AddFaculty /> },
        { path: "facultyList", element: <FacultyList /> },
        { path: "editFaculty", element: <UpdateFaculty /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </AuthProvider>
  </StrictMode>
);
