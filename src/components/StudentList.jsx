import { useCallback, useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { app } from "../Firebase.js";
import LoadingSpinner from "./LoadingSpinner.jsx";
import { useNavigate } from "react-router-dom";
import { deleteData } from "./DeleteData";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // Filtered students for display
  const [isLoading, setIsLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Get data from Firebase
  useEffect(() => {
    // Get the database reference
    const db = getDatabase(app);

    // Create a reference to the student data in the database
    const studentRef = ref(db, "student");

    // Listen for changes to the student data
    onValue(studentRef, (snapshot) => {
      // Get the data from the snapshot
      const data = snapshot.val();

      if (data) {
        // Convert the data to an array of student objects
        const studentArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // Sort if `isSorting` is true
        let sortedStudents = studentArray;
        if (isSorting) {
          sortedStudents = studentArray.sort((a, b) =>
            a.studentName.localeCompare(b.studentName)
          );
        }

        // Update the state with the student array
        setStudents(sortedStudents);
        setFilteredStudents(sortedStudents); // Initialize filtered students
      } else {
        // If there is no data, set the students array to empty
        setStudents([]);
        setFilteredStudents([]);
      }
      // Set the loading state to false
      setIsLoading(false);
    });
  }, [isSorting]); // Re-run effect when sorting toggles

  // Debounce utility function
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  // Memoized Search function with debounce
  const debouncedSearch = useCallback(
    debounce((query) => {
      // Filter students based on search query
      const filtered = students.filter((student) => {
        return student.studentName.toLowerCase().includes(query);
      });

      setFilteredStudents(filtered);
    }, 500),
    [students]
  );

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query); // Update local state
    debouncedSearch(query); // Trigger debounced search
  };

  const toggleSorting = () => {
    setIsSorting((prevState) => !prevState); // Toggle sorting state
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ margin: "0 20px" }}>
      <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
        <button
          style={{ padding: "8px 16px" }}
          onClick={toggleSorting}
          title={isSorting ? "Sort By Adm No" : "Sort By Alpha"}
        >
          <span className="material-symbols-rounded">
            {isSorting ? "sort" : "sort_by_alpha"}
          </span>
        </button>
        <input
          type="search"
          placeholder="Search Students Name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <h2>StudentList</h2>
      <table>
        <tbody>
          <tr className="taHead">
            <th>No.</th>
            <th>Profile Image</th>
            <th>Admission No.</th>
            <th>Student Name</th>
            <th>Phone No.</th>
            <th>RemoveList</th>
            <th>UpdateList</th>
          </tr>
          {filteredStudents &&
            filteredStudents.map(
              ({ id, phoneNumber, studentName, imageURL }, i) => (
                <tr key={id}>
                  <td>{i + 1}.</td>
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
                  <td>{id}</td>
                  <td>{studentName}</td>
                  <td>{phoneNumber}</td>
                  <td>
                    <span
                      onClick={() => {
                        deleteData(id);
                      }}
                      className="material-symbols-rounded"
                    >
                      delete
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        navigate("/dashboard/editStudent", {
                          state: { id, phoneNumber, studentName, imageURL },
                        });
                      }}
                      className="material-symbols-rounded"
                    >
                      edit_square
                    </span>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
