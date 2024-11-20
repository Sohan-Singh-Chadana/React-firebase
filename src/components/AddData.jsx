import { getDatabase, set, ref } from "firebase/database";
import { app } from "../Firebase";

//* Only testing purpose not use for production
const AddData = () => {
  const addDemoData = (userId, name, phone) => {
    const db = getDatabase(app);
    set(ref(db, "student/" + userId), {
      studentName: name,
      studentPhone: phone,
    });
  };
  return (
    <div>
      <h1>AddData</h1>
      <button
        onClick={() => {
          addDemoData(584, "Sohan Rajput", 563258456);
        }}
      >
        Add Demo Data
      </button>
    </div>
  );
};

export default AddData;
