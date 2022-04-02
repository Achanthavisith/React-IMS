import React from 'react';
import '../components/PostProduct.css'

const ReadOnlyRow = ({product, handleEditClick}) => {
    return (
        
            <tr>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                    <button type = "button" onClick={(event) => handleEditClick(event, product)}>
                        Edit
                    </button>
                </td>
            </tr>
        
    );
}

export default ReadOnlyRow;