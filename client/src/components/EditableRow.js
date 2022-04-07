import React, { useEffect, useState } from 'react';
import '../components/PostProduct.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';

const EditableRow = ({editFormData, handleEditFormChange}) => {
    // Making non required for delete, but required for update
    async function onSave() {
            const product = { 
                name: editFormData.name, 
                quantity: editFormData.quantity, 
                category: category, 
            }; 

            await axios.put("http://localhost:5000/api/products/update", 
                product)
            .then((res) => {
                alert('Product Updated: ' + editFormData.name);
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
                await axios.delete("http://localhost:5000/api/products/delete", {data: {name: editFormData.name}})
            }
        };

    //Setting states
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");



//get categories data from mongodb input to array
const getCategories = () => {
    axios.get("http://localhost:5000/api/categories")
    .then((response) => {
        const data = response.data;
        setCategories(data);
    })
    .catch(error => console.error(error));
}

useEffect(() => {
    getCategories();
}, []);

    return (
    <tr>
        <td > 
            <input type = "text" required = "required" placeholder=" Edit Product Name" name = "name"  defaultValue= {editFormData.name}>
                </input> 
                </td>
                <td > 
            <input type = "text" required = "required" placeholder=" Edit Product Quantity" name="quantity" onChange={handleEditFormChange.quantity} defaultValue= {editFormData.quantity}>
                </input> 
                </td>
                <td > 
                <Form.Control 
                    as="select"
                    id="category"
                    type="select"
                    value={category}
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                    
                    >
                    <option id = "defaut" value = ""> - - - </option>
                    {categories.map((categoryOption) => <option  value={categoryOption.category} key={categoryOption._id}>{categoryOption.category} </option>)}
                </Form.Control>
                
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