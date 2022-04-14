import React, { useContext } from 'react';
import '../components/PostProduct.css'
import { UserContext } from '../context/context';

const ReadOnlyRowUser = ({users, handleEditClick}) => {
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
                        <button type = "button" onClick={(event) => handleEditClick(event, users)}>
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

export default ReadOnlyRowUser;