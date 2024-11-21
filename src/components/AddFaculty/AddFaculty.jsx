import React from "react";
import {
  collection,
  addDoc,
  getFirestore,
  doc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import NotificationContext from "../../context/NotificationToastContext";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import Heading from "../Heading/Heading";

const AddFaculty = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState("/defaultProfile.jpg");
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
      setPreview("/defaultProfile.jpg");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill in all fields");
      return;
    }

    const db = getFirestore(app);
    const storage = getStorage(app);
    const facultyRef = collection(db, "faculties");
    let imageURL;

    try {
      const docRef = await addDoc(facultyRef, {
        facultyName: name,
        facultyPhone: phone,
        imageURL: null, // Temporary, will update after upload
      });

      // Step 2: Upload the image to Firebase Storage
      const imagePath = `facultyImages/${docRef.id}`;
      const storageRef = ref(storage, imagePath);

      if (selectedFile) {
        // Upload the selected file
        await uploadBytes(storageRef, selectedFile);
      } else {
        // Upload the default image
        const defaultImageURL = "/defaultProfile.jpg";
        const response = await fetch(defaultImageURL);
        const defaultImageBlob = await response.blob();
        await uploadBytes(storageRef, defaultImageBlob);
      }

      // Step 3: Get the download URL for the uploaded image
      imageURL = await getDownloadURL(storageRef);

      // Step 4: Update the Firestore document with the image URL
      await updateDoc(doc(db, "faculties", docRef.id), { imageURL });

      // console.log("Document written with ID: ", docRef.id);
      addNotification("success", "Faculty added successfully");
    } catch (error) {
      addNotification("error", "Error adding faculty");
      console.error("Error adding document: ", error);
    }

    // navigate("/dashboard/facultyList");
    setName("");
    setPhone("");
    setSelectedFile(null);
    setPreview("/defaultProfile.jpg");
  };

  return (
    <>
      <Heading>Add Faculty</Heading>
      <form onSubmit={submitHandler}>
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
        <button type="submit">Add Faculty</button>
      </form>
    </>
  );
};

export default AddFaculty;
