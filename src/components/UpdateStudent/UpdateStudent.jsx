import React, { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../Firebase.js";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationContext from "../../context/NotificationToastContext.jsx";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(location.state.studentName);
  const [phone, setPhone] = useState(location.state.phoneNumber);
  const [admNo, setAdmNo] = useState(location.state.id);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(location.state.imageURL);
  const { addNotification } = React.useContext(NotificationContext);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    const db = getDatabase(app);
    const storage = getStorage(app);

    const studentRef = ref(db, `student/${admNo}`);

    try {
      // Check if selectedFile exists; if not, update data
      if (selectedFile) {
        // Use the selected file
        const myRef = storageRef(storage, `images/${admNo}`);
        await uploadBytes(myRef, selectedFile);
        const imageURL = await getDownloadURL(myRef);

        await update(studentRef, {
          studentName: name,
          phoneNumber: phone,
          imageURL: imageURL,
        });
      } else {
        await update(studentRef, {
          studentName: name,
          phoneNumber: phone,
        });
      }

      navigate("/dashboard/studentList");
      setName("");
      setPhone("");
      setSelectedFile(null);
      setPreview(location.state.imageURL);
      // setAdmNo("");
    } catch (error) {
      console.error("Error uploading file or saving data:", error);
    }

    setName("");
    setAdmNo("");
    setPhone("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => setAdmNo(e.target.value)}
          type="text"
          placeholder="Admission No."
          value={admNo}
          readOnly
          disabled
        />
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="student name"
          value={name}
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="phone number"
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
            alignContent: "start",
            gap: "36px",
            margin: "20px 0",
          }}
        >
          <p style={{ margin: "0" }}>Image Preview:</p>
          <img
            src={preview}
            alt="Selected Preview"
            style={{ width: "100px ", height: "100px", objectFit: "cover" }}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
