import React from 'react';
import '../components/PostProduct.css'
const EditableRow = ({editFormData, handleEditFormChange}) => {
    return (
     <tr>
         <td > 
             <input type = "text" required = "required" placeholder=" Edit Product Name" name = "name" onChange={handleEditFormChange} value= {editFormData.name}>
                 </input> 
                 </td>
                 <td > 
             <input type = "text" required = "required" placeholder=" Edit Product Quantity" name="quantity" onChange={handleEditFormChange} value= {editFormData.quantity}>
                 </input> 
                 </td>
                 <td > 
             <input type = "text" required = "required" placeholder=" Edit Product Category" name="category" onChange={handleEditFormChange} value= {editFormData.category}>
                 </input> 
                 </td>
                 <td>
            <button type = "submit"> Save</button>
            </td>
     </tr>
    );
};




// AROUND 39:20 in video is where left off and need to work the button into actually editing and saving stuff 

// https://www.youtube.com/watch?v=dYjdzpZv5yc

export default EditableRow;