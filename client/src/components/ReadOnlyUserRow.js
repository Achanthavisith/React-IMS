import React, { useContext } from 'react';
import '../components/PostProduct.css'
import { UserContext } from '../context/context';

const ReadOnlyUserRow = ({users, handleEditClick}) => {
    const {user} = useContext(UserContext);

    return (
        
            <tr>
                <td>{users.email}</td>
                <td>{users.role}</td>
                <td>
                    {user ? 
                    (<div>
                        {user.role === 'admin' && 'manager' ? 
                    (<div>
                        <button type = "button" className="btn-primary btn-sm m-1 rounded" onClick={(event) => handleEditClick(event, users)}>
                            Edit
                        </button>
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

export default ReadOnlyUserRow;