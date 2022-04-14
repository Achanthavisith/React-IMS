import React, { useEffect, useState } from 'react';
import '../components/PostProduct.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const EditableUserRow = ({editFormData, handleEditFormChange}) => {

    // Making non required for delete, but required for update
    async function onSave() {
            const user = { 
                name: editFormData.name, 
                role: role, 
            }; 
        };

    async function onDelete() {
        if(window.confirm('Are you sure you want to delete')) {
                await axios.delete("http://localhost:5000/api/products/delete", {data: {email: editFormData.email}})
            }
        };

    //Setting states
    const [role, setRole] = useState("");

    return (
        <tr>
            <td > 
                <input readOnly type = "text" required placeholder=" Edit Product Name" name = "name"  value= {editFormData.email}>
                    </input> 
                    </td>
                    <td > 
                    <Form.Control 
                        as="select"
                        id="category"
                        type="select"
                        value={role}
                        className="form-control"
                        onChange={(e) => setRole(e.target.value)}
                        >
                        <option value="" >- - -</option>
                        <option value="user" >User</option>
                        <option value="Manager" >Manager</option>
                    </Form.Control>
                    
                    </td>
                    <td>
                <button type = "submit" className="m-1 btn-primary btn-sm" onClick= {onSave}> Save</button>
                <button type = "submit" className="m-1 btn-danger btn-sm" onClick= {onDelete}> Delete</button>
                </td>
        </tr>
    );
};


// <input required = "" placeholder=" Edit Product Category" name="category"  value= {editFormData.name}>
//</input> 
/*

*/
// AROUND 39:20 in video is where left off and need to work the button into actually editing and saving stuff 

// https://www.youtube.com/watch?v=dYjdzpZv5yc

export default EditableUserRow;