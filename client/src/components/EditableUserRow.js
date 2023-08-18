import React, { useState, useContext } from "react";
import "../components/PostProduct.css";
import axios from "axios";
import { Form } from "react-bootstrap";
import { UserContext } from "../context/context";

const EditableUserRow = ({ editFormData, handleCancelEdit }) => {
  // Making non required for delete, but required for update
  async function onSave() {
    const editUser = {
      email: editFormData.email,
      role: role,
    };

    if (editUser.email === user.user) {
      alert("Cannot edit logged in user.");
    } else if (editUser.role === "") {
      alert("Select a role.");
    } else {
      await axios.put("http://localhost:8000/api/user/update", editUser);
    }
  }

  async function onDelete() {
    const editUser = {
      email: editFormData.email,
      role: role,
    };
    if (editUser.email === user.user) {
      alert("Cannot delete logged in user.");
    } else {
      if (window.confirm("Are you sure you want to delete")) {
        await axios.delete("http://localhost:8000/api/user/delete", {
          data: { email: editFormData.email },
        });
      }
    }
  }

  //Setting states
  const [role, setRole] = useState("");
  const { user } = useContext(UserContext);

  return (
    <tr>
      <td>
        <input
          readOnly
          type="text"
          required
          placeholder=" Edit Product Name"
          name="name"
          value={editFormData.email}
        ></input>
      </td>
      <td>
        <Form.Control
          as="select"
          id="category"
          type="select"
          value={role}
          className="form-control"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">- - -</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </Form.Control>
      </td>
      <td>
        <button
          type="submit"
          className="m-1 btn-primary btn-sm"
          onClick={onSave}
        >
          {" "}
          Save
        </button>
        <button
          type="submit"
          className="m-1 btn-danger btn-sm"
          onClick={onDelete}
        >
          {" "}
          Delete
        </button>
        <button
          type="cancel"
          className="m-1 btn-secondary btn-sm"
          onClick={handleCancelEdit}
        >
          cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableUserRow;
