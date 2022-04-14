import React, { useEffect, useState } from 'react';
import '../components/PostProduct.css';
import axios from 'axios';
import { Form, } from 'react-bootstrap';

const EditableRowUser = ({editFormData, handleEditFormChange}) => {


    //setState

    const [role, setRole] = useState("");

    // Making non required for delete, but required for update
     async function  onSave() {
            const user = { 
                email: editFormData.email, 
                role: editFormData.role, 
            }; 
            console.log(user + "works");
                await axios.put("http://localhost:5000/api/user/update", 
                user)
                
            .then((res) => {
                
                alert('User: ' + editFormData.email + ' was updated');
            }).catch((err) => {
                alert('Error')
            })
        };

    async function onDelete() {
        if(window.confirm('Are you sure you want to delete')) {
                await axios.delete("http://localhost:5000/api/user/delete", {data: {email: editFormData.email}})
            }
        };


    return (
        <tr>
            <td > 
                <input type = "text" required placeholder=" Edit User Email" name = "email"  value= {editFormData.email} onChange = {handleEditFormChange}>
                    </input> 
                    </td>
                    <td > 
                
                <Form.Control 
                        as="select"
                        id="role"
                        type="select"
                        className="form-control"
                        value = {role}
                        onChange={ (e) => setRole(e.target.value)}
                        >
                        <option value="" >- - -</option>
                        <option value="user" >User</option>
                        <option value="manager" >Manager</option>
                        
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

//<input type = "text" required placeholder=" Edit User Role" name="role" onChange={handleEditFormChange} value= {editFormData.role}> </input>

export default EditableRowUser;