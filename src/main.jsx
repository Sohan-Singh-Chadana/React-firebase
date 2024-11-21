import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import StudentList from "./pages/StudentList/StudentList";
import AddStudent from "./components/AddStudent/AddStudent";
import AddFaculty from "./components/AddFaculty/AddFaculty";
import FacultyList from "./pages/FacultyList/FacultyList";
import UpdateStudent from "./components/UpdateStudent/UpdateStudent.jsx";
import UpdateFaculty from "./components/UpdateFaculty/UpdateFaculty.jsx";
import "./index.css";

const router = createBrowserRouter(
  [
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
      element: <Dashboard />,
      children: [
        {
          path: "/dashboard",
          element: <StudentList />,
        },
        {
          path: "/dashboard/addStudent",
          element: <AddStudent />,
        },
        {
          path: "/dashboard/studentList",
          element: <StudentList />,
        },
        {
          path: "/dashboard/editStudent",
          element: <UpdateStudent />,
        },
        {
          path: "/dashboard/addFaculty",
          element: <AddFaculty />,
        },
        {
          path: "/dashboard/facultyList",
          element: <FacultyList />,
        },
        {
          path: "/dashboard/editFaculty",
          element: <UpdateFaculty />,
        },
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
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </StrictMode>
);
