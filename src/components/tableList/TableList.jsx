import React from "react";
import { useNavigate } from "react-router-dom";

const TableList = ({ tableList, confirmDelete }) => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "0 20px" }}>
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
          {tableList &&
            tableList.map(
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
    </div>
  );
};

export default TableList;
