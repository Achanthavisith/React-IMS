import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../context/context';
import axios from 'axios';
import ReadOnlyUserRow from "../components/ReadOnlyUserRow";
import EditableRowUser from "../components/EditableRowUser";

export default function Admin() {
//set states
    const {user} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [editUserRole, setEditedUserRole] = useState();
    const [editUserEmail, setEditedUserEmail] = useState();
    const [editFormData, setEditFormData] = useState({
        email:"",
        role:"",
    });
    const [refresh, setRefresh] = useState(0);

     //get Users data from mongodb input to array
    const getUsers = () => {
        axios.get("http://localhost:5000/api/users")
        .then((response) => {
            const data = response.data;
            setUsers(data);
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleEditClick = (event, users)=> {
        event.preventDefault();
        setEditedUserEmail(users.email);

        const formValues = { 
            email: users.email,
            role: users.role,
        }
        setEditFormData(formValues);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('email');
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        
        event.preventDefault();
        const editedUsers = {
            email: editFormData.email,
            role: editFormData.role,
        }
        const newUsers = [...users];
    
        const index = users.findIndex((users) => users.role === editUserRole)
        newUsers[index] = editedUsers;
        
        setUsers(newUsers);
        setEditedUserRole(null);
        setRefresh(refresh + 1);
    }

    return (
        
        
            <div>
                {user ? 
                (<div className="py-1 m-3">
                    Logged in: {JSON.stringify(user.user)}
                    {user.role === 'admin' ? 
                    
                    (
                    <div>
                        <form onSubmit={handleEditFormSubmit}>
                        <table>
                            <thead>
                                <tr>
                                <th>E-mail</th>
                                <th>Role</th>
                                <th>Admin Buttons</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((users) => (
                                <React.Fragment key={users.email}>
                                    {editUserRole === users.role ? (
                                        <EditableRowUser editFormData={editFormData} handleEditFormChange ={handleEditFormChange}/>
                                    ) : ( 
                            
                                    <ReadOnlyUserRow users={users} handleEditClick = {handleEditClick}/>
                             
                                )}
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                        </form>
                    </div>
                    )
                    :
                    (<div>
                        Not an Admin
                    </div>)
                    
                    }</div>)
                :
                (<div className="py-1 m-3">
                    Logged out.
                </div>)
                }
            </div>
        
    );
    }