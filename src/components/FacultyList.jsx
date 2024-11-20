import React, { useEffect } from "react";
import {
  getFirestore,
  getDocs,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { app } from "../Firebase";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../context/NotificationToastContext";
import { deleteObject, getStorage, ref } from "firebase/storage";
import WarnModel from "./WarnModel";

const FacultyList = () => {
  const [faculties, setFaculties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [facultyIdToDelete, setFacultyIdToDelete] = React.useState(null);
  const navigate = useNavigate();
  const { addNotification } = React.useContext(NotificationContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const db = getFirestore(app);
    const facultyCollectionRef = collection(db, "faculties");

    try {
      const docSnap = await getDocs(facultyCollectionRef);
      const facultiesData = docSnap.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .sort((a, b) => a.facultyName.localeCompare(b.facultyName));

      // console.log("document data", facultiesData);
      setFaculties(facultiesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setLoading(false);
  };

  const confirmDelete = (facultyId) => {
    setFacultyIdToDelete(facultyId);
    setShowModal(true);
  };

  const handleDelete = async () => {
    const db = getFirestore(app);
    const storage = getStorage(app);

    const facultyDocRef = doc(db, "faculties", facultyIdToDelete);
    const myRef = ref(storage, `facultyImages/${facultyIdToDelete}`);

    deleteObject(myRef);
    try {
      await deleteDoc(facultyDocRef);
      setShowModal(false);
      setFacultyIdToDelete(null);
      getData();
      // console.log("Faculty deleted successfully!");
      addNotification("success", "Faculty deleted successfully!");
    } catch (error) {
      addNotification("error", "Error deleting faculty!");
      console.error("Error deleting faculty:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2>FacultyList </h2>
      <table>
        <tbody>
          <tr className="taHead">
            <th>No.</th>
            <th>Profile Image</th>
            <th style={{ textAlign: "left" }}>Faculty Name</th>
            <th>Phone No.</th>
            <th>UpdateList</th>
            <th>RemoveList</th>
          </tr>
          {faculties &&
            faculties.map(
              ({ id, facultyName, facultyPhone, imageURL }, index) => (
                <tr key={id}>
                  <td>{index + 1}.</td>
                  <td>
                    <img
                      src={imageURL}
                      alt="profile"
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td style={{ textAlign: "left" }}>{facultyName}</td>
                  <td>{facultyPhone}</td>
                  <td>
                    <span
                      onClick={() => {
                        navigate("/dashboard/editFaculty", {
                          state: { id, facultyName, facultyPhone, imageURL },
                        });
                      }}
                      className="material-symbols-rounded"
                    >
                      edit_square
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => confirmDelete(id)}
                      className="material-symbols-rounded"
                    >
                      delete
                    </span>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
      <WarnModel showModal={showModal}>
        <p>Are you sure you want to delete this faculty?</p>
        <button onClick={handleDelete} style={{ marginRight: "8px" }}>
          Yes, Delete
        </button>
        <button onClick={() => setShowModal(false)}>No, Cancel</button>
      </WarnModel>
    </>
  );
};

export default FacultyList;
