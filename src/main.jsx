import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import AddStudent from "./components/AddStudent.jsx";
import StudentList from "./components/StudentList.jsx";
import "./index.css";
import UpdateStudent from "./components/UpdateStudent.jsx";
import AddFaculty from "./components/AddFaculty.jsx";
import FacultyList from "./components/FacultyList.jsx";
import UpdateFaculty from "./components/UpdateFaculty.jsx";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";

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
