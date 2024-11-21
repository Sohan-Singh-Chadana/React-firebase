import React from "react";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { app } from "../../Firebase";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationContext from "../../context/NotificationToastContext";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import WarnModel from "../SharedComponents/WarnModel";
// import WarnModel from "./WarnModel";

const UpdateFaculty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = React.useState(location.state.facultyName);
  const [phone, setPhone] = React.useState(location.state.facultyPhone);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(location.state.imageURL);
  const { addNotification } = React.useContext(NotificationContext);
  const [showModal, setShowModal] = React.useState(false);

  // Handle file selection and generate preview
  const handleFileChange = (e) => {
    // Get the selected file from the input event
    const file = e.target.files[0];
    if (file) {
      // Update the selected file state
      setSelectedFile(file);

      // Generate a preview URL for the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the preview state with the generated URL
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Reset the selected file and preview states
      setSelectedFile(null);
      setPreview(location.state.imageURL);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill in all fields");
      return;
    }

    const db = getFirestore(app);
    const storage = getStorage(app);

    const docRef = doc(db, "faculties", location.state.id);

    const imagePath = `facultyImages/${location.state.id}`;
    const storageRef = ref(storage, imagePath);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (selectedFile) {
          // Upload the selected file
          await uploadBytes(storageRef, selectedFile);
          // Update the faculty document with the new image URL
          const imageURL = await getDownloadURL(storageRef);

          await updateDoc(docRef, {
            facultyName: name,
            facultyPhone: phone,
            imageURL: imageURL,
          });
        } else {
          await updateDoc(docRef, {
            facultyName: name,
            facultyPhone: phone,
          });
        }

        // console.log("Document updated successfully!");
        addNotification("success", "Faculty updated successfully");
      } else {
        addNotification("info", "Faculty not found");
        console.log("No such document to update!");
      }
    } catch (error) {
      addNotification("error", "Error updating faculty");
      console.error("Error updating user:", error);
    }

    navigate("/dashboard/facultyList");
    setName("");
    setPhone("");
  };

  // profile remove handler
  const defaultImage = async (facultyId) => {
    const db = getFirestore(app);
    const storage = getStorage(app);

    const docRef = doc(db, "faculties", facultyId);

    const imagePath = `facultyImages/${facultyId}`;
    const storageRef = ref(storage, imagePath);

    try {
      // Upload the default image
      const defaultImageURL = "/defaultProfile.jpg";
      const response = await fetch(defaultImageURL);
      const defaultImageBlob = await response.blob();
      await uploadBytes(storageRef, defaultImageBlob);

      const imageURL = await getDownloadURL(storageRef);

      await updateDoc(docRef, {
        facultyName: name,
        facultyPhone: phone,
        imageURL: imageURL,
      });

      setShowModal(false);
      setPreview(defaultImageURL);

      addNotification("success", "Profile image remove  successfully");
    } catch (error) {
      addNotification("error", "Error deleting faculty");
      console.log(error, "Error deleting faculty");
    }
  };

  return (
    <>
      <h2>Update Faculty</h2>
      <form onSubmit={handleUpdate}>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Faculty Name"
          value={name}
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="Faculty Phone"
          value={phone}
        />
        <input
          onChange={handleFileChange}
          type="file"
          style={{ cursor: "pointer" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "36px",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              margin: "20px 0",
            }}
          >
            <p style={{ margin: "0" }}>Image Preview:</p>
            <button type="button" onClick={() => setShowModal(true)}>
              delete Image
            </button>
          </div>
          <img
            src={preview}
            alt="Selected Preview"
            style={{ width: "100px ", height: "100px", objectFit: "cover" }}
          />
        </div>
        <button
          type="button"
          onClick={() => navigate("/dashboard/facultyList")}
          style={{ marginRight: "8px" }}
        >
          No Cancel
        </button>
        <button type="submit">Update Faculty</button>
      </form>
      {/* // Modal */}
      <WarnModel showModal={showModal}>
        <p style={{ marginBottom: "20px" }}>
          Are you sure remove profile picture?
        </p>
        <button
          onClick={() => defaultImage(location.state.id)}
          style={{ marginRight: "8px" }}
        >
          Yes, Delete
        </button>
        <button onClick={() => setShowModal(false)}>No, Cancel</button>
      </WarnModel>
    </>
  );
};

export default UpdateFaculty;
