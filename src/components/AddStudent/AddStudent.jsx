import { useState } from "react";
import { getDatabase, set, ref } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../Firebase.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./AddStudent.css";
import Heading from "../Heading/Heading.jsx";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  height: 100vh; // Full height for centering
`;

const AddStudent = () => {
  // State for form fields and preview
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("/defaultProfile.jpg");
  const navigate = useNavigate();
  // const [admNo, setAdmNo] = useState("");

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
      setPreview("/defaultProfile.jpg");
    }
  };

  // Function to generate admission number format
  const generateAdmissionNumber = (departmentCode = "BA", id) => {
    const year = new Date().getFullYear().toString().slice(-2);
    const paddedId = String(id).padStart(2, 0);
    return `${year}${departmentCode.toUpperCase()}${paddedId}`;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !phone || !id) {
      alert("Please fill in all required fields.");
      return;
    }

    const db = getDatabase(app);
    const storage = getStorage(app);
    let imageURL;

    // Generate admission number only on submission
    const admNo = generateAdmissionNumber("BA", id);

    try {
      // Check if selectedFile exists; if not, use a default image
      if (selectedFile) {
        // Use the selected file
        const myRef = storageRef(storage, `images/${admNo}`);
        await uploadBytes(myRef, selectedFile);
        imageURL = await getDownloadURL(myRef);
      } else {
        // Fetch and upload the default image
        const defaultImageURL = "/defaultProfile.jpg";
        const response = await fetch(defaultImageURL);
        const defaultImageBlob = await response.blob();
        const myRef = storageRef(storage, `images/${admNo}`);
        await uploadBytes(myRef, defaultImageBlob);
        imageURL = await getDownloadURL(myRef);
      }

      // Save student data to Firebase Database
      await set(ref(db, "student/" + admNo), {
        studentName: name,
        phoneNumber: phone,
        imageURL: imageURL,
      });

      navigate("/dashboard/studentList");
      setName("");
      setPhone("");
      setSelectedFile(null);
      setPreview("/defaultProfile.jpg");
      // setAdmNo("");
    } catch (error) {
      console.error("Error uploading file or saving data:", error);
    }
  };

  return (
    <>
      <Heading>Add Student</Heading>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter No."
          value={id}
          onChange={(e) => setId(e.target.value)}
          // onChange={(e) => setAdmNo(e.target.value)}
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
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default AddStudent;
