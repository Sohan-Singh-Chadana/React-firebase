import { getDatabase, ref, remove } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { app } from "../Firebase.js";

export const deleteData = (id) => {
  // Get the database and storage references
  const db = getDatabase(app);
  const storage = getStorage(app);

  // Create references to the student data and image in the database and storage
  const studentRef = ref(db, `student/${id}`);
  const myRef = storageRef(storage, `images/${id}`);

  // Delete the image from storage
  deleteObject(myRef)
    .then((res) => {
      // Remove the student data from the database
      remove(studentRef);
    })
    .catch((err) => {
      // Log any errors that occur during the deletion process
      console.error(err);
    });
};
