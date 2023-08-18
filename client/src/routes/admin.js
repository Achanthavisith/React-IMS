import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/context";
import axios from "axios";
import ReadOnlyUserRow from "../components/ReadOnlyUserRow";
import EditableUserRow from "../components/EditableUserRow";
import { Form } from "react-bootstrap";

export default function Admin() {
  //set user context on whos logged in
  const { user } = useContext(UserContext);

  //set states
  const [users, setUsers] = useState([]);
  const [editUser, setEditedUser] = useState();
  const [password, setNewPassword] = useState("");
  const [editFormData, setEditFormData] = useState({
    email: "",
    role: "",
  });
  //used to refresh field
  const [refresh, setRefresh] = useState(0);

  //gets the users
  const getUsers = () => {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        const data = response.data;
        setUsers(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUsers();
  }, [refresh]);

  const handleCancelEdit = () => {
    setEditedUser(null);
  };
  // submits edited data form
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedUsers = {
      email: editFormData.email,
      role: editFormData.role,
    };
    const newUsers = [...users];

    const index = users.findIndex((users) => users.email === editUser);
    newUsers[index] = editedUsers;

    setUsers(newUsers);
    setEditedUser(null);
    setRefresh(refresh + 1);
  };

  //Stores edit data that is being changed
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("email");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  //Changes admin buttons to edit and delete when admin is logged in and clicks
  const handleEditClick = (event, users) => {
    event.preventDefault();
    setEditedUser(users.email);

    const formValues = {
      email: users.email,
      role: users.role,
    };
    setEditFormData(formValues);
  };

  //Updates logged in Users password
  async function onSubmitPassword() {
    const editUser = {
      email: user.user,
      password: password,
    };
    if (editUser.password !== "") {
      await axios
        .put("http://localhost:8000/api/user/update/password", editUser)
        .then((res) => {
          alert("User Password Updated: ");
        })
        .catch((err) => {
          alert("Error");
        });
    } else {
      alert("Password Field can not be empty");
    }

    setNewPassword("");
    setRefresh(refresh + 1);
  }

  const loginStyle = {
    font: "15px arial sans",
    margin: "auto",
    width: "40%",
    padding: "5px",
    marginTop: " 5px",
  };

  return (
    <div className="container">
      {user ? (
        <div className="py-1 m-3">
          Logged in: {JSON.stringify(user.user)}
          {user.role === "admin" ? (
            <div>
              <form onSubmit={handleEditFormSubmit}>
                <table>
                  <thead>
                    <tr>
                      <th>E-mail</th>
                      <th>Role</th>
                      <th>Admin Buttons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((users) => (
                      <React.Fragment key={users.email}>
                        {editUser === users.email ? (
                          <EditableUserRow
                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelEdit={handleCancelEdit}
                          />
                        ) : (
                          <ReadOnlyUserRow
                            users={users}
                            handleEditClick={handleEditClick}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </form>
            </div>
          ) : (
            <div style={loginStyle}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Input your new password:</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    onClick={onSubmitPassword}
                    className="m-1 btn-sm btn-danger center"
                  >
                    Submit Password
                  </button>
                </Form.Group>
              </Form>
            </div>
          )}
        </div>
      ) : (
        <div className="py-1 m-3">Logged out.</div>
      )}
    </div>
  );
}
