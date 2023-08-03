import React, { useEffect, useState } from "react";
import "../components/PostProduct.css";
import axios from "axios";
import { Form } from "react-bootstrap";

const EditableRow = ({ editFormData, handleEditFormChange, handleEditableRowCancel }) => {
  // Making non required for delete, but required for update
  async function onSave() {
    const product = {
      name: editFormData.name,
      quantity: editFormData.quantity,
      category: category,
    };

    const regMatch = /^[0-9]*$/;

    if (regMatch.test(product.quantity) === false) {
      alert("QUANTITY MUST BE A NUMBER");
    } else if (product.category === "") {
      alert("SELECT A CATEGORY");
    } else {
      await axios
        .put("http://localhost:5000/api/products/update", product)
        .then((res) => {
          alert("Product Updated: " + editFormData.name);
        })
        .catch((err) => {
          alert("Error");
        });
    }
  }

  async function onDelete() {
    if (window.confirm("Are you sure you want to delete")) {
      await axios.delete("http://localhost:5000/api/products/delete", { data: { name: editFormData.name } });
    }
  }

  //Setting states
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  //get categories data from mongodb input to array
  const getCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        const data = response.data;
        setCategories(data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <tr>
      <td>
        <input readOnly type="text" required placeholder=" Edit Product Name" name="name" value={editFormData.name}></input>
      </td>
      <td>
        <input type="text" required placeholder=" Edit Product Quantity" name="quantity" onChange={handleEditFormChange} value={editFormData.quantity}></input>
      </td>
      <td>
        <Form.Control as="select" id="category" type="select" value={category} className="form-control" onChange={(e) => setCategory(e.target.value)}>
          <option value="">- - -</option>
          {categories.map((categoryOption) => (
            <option value={categoryOption.category} key={categoryOption._id}>
              {categoryOption.category}{" "}
            </option>
          ))}
        </Form.Control>
      </td>
      <td>
        <button type="submit" className="m-1 btn-primary btn-sm" onClick={onSave}>
          {" "}
          Save
        </button>
        <button type="submit" className="m-1 btn-danger btn-sm" onClick={onDelete}>
          {" "}
          Delete
        </button>
        <button type="cancel" className="m-1 btn-secondary btn-sm" onClick={handleEditableRowCancel}>
          cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
