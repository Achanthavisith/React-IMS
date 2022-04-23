import React, { useContext } from 'react';
import '../components/PostProduct.css'
import { addButtonContext } from '../context/addButtonContext';
import { UserContext } from '../context/context';

const ReadOnlyRow = ({product, handleEditClick}) => {
    const {user} = useContext(UserContext);
    const {addGroup} = useContext(addButtonContext);

    return (
        
            <tr>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                    {user ? 
                    (<div>
                        {user.role === ("admin" || "manager") ? 
                    (<div>
                        { addGroup ? 
                        (<div>
                            <button className="btn-primary btn-sm m-1 rounded" onClick={(event) => handleEditClick(event, product)}>
                                Add
                            </button>
                        </div>)
                        :
                        (<div> 
                            <button className="btn-primary btn-sm m-1 rounded" onClick={(event) => handleEditClick(event, product)}>
                                Edit
                            </button>
                        </div>)}
    
                    </div>)
                    :
                    (<div>
                        N/A
                    </div>)
                    }
                    </div>) 
                    : 
                    (<div>
                        N/A
                    </div>)}
                </td>
            </tr>
        
    );
}

export default ReadOnlyRow;