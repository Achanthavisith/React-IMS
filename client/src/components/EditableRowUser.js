import React, { useEffect, useState } from 'react';
import '../components/PostProduct.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const EditableRow = ({editFormDataUser, handleEditFormChange}) => {
    // Making non required for delete, but required for update
    async function onSave() {
            const users = { 
                email: editFormDataUser.email, 
                role: editFormDataUser.role, 
            }; 

            await axios.put("http://localhost:5000/api/user/update", 
                users)
            .then((res) => {
                alert('User Updated: ' + editFormDataUser.users);
            }).catch((err) => {
                alert('Error')
            })
        };

    async function  onDelete() {
        /*
        const product = {
            name: editFormData.name
        };
          */
            if(window.confirm('Are you sure you want to delete')) {
                  //  console.log(product);
                await axios.delete("http://localhost:5000/api/products/delete", {data: {name: editFormDataUser.name}})
            }
        };

    //Setting states
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");



//get categories data from mongodb input to array
const getUser = () => {
    axios.get("http://localhost:5000/api/users")
    .then((response) => {
        const data = response.data;
        setCategories(data);
    })
    .catch(error => console.error(error));
}

useEffect(() => {
    getUser();
}, []);

    return (
        
    <tr>
        <td > 
            <input type = "text" required = "required" placeholder=" Edit User Email" name = "email"  defaultValue= {editFormDataUser.email}>
                </input> 
                </td>
                <td > 
            <input type = "text" required = "required" placeholder=" Edit Product Role" name="quantity" onChange={handleEditFormChange.role} defaultValue= {editFormDataUser.role}>
                </input> 
                </td>
                <td>
            <button type = "submit" onClick= {onSave}> Save</button>
            <button type = "submit" onClick= {onDelete}> Delete</button>
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

export default EditableRow;