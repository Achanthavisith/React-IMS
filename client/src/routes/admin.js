import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../context/context';
import axios from 'axios';
import ReadOnlyUserRow from "../components/ReadOnlyUserRow";
import EditableUserRow from '../components/EditableUserRow'

export default function Admin() {
    //set user context on whos logged in
    const {user} = useContext(UserContext);

    //set states
    const [users, setUsers] = useState([]);
    const [editUser, setEditedUser] = useState();
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
    
    }, [refresh]);


    const handleCancelEdit = () => {
        setEditedUser(null);
    }

    const handleEditFormSubmit = (event) => {
        
        event.preventDefault();
        const editedUsers = {
            email: editFormData.email,
            role: editFormData.role,
        }
        const newUsers = [...users];
    
        const index = users.findIndex((users) => users.email === editUser)
        newUsers[index] = editedUsers;
        
        setUsers(newUsers);
        setEditedUser(null);
        setRefresh(refresh + 1);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('email');
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditClick = (event, users)=> {
        event.preventDefault();
        setEditedUser(users.email);

        const formValues = { 
            email: users.email,
            role: users.role,
        }
        setEditFormData(formValues);
    };


    return (
            <div className="container">
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
                                    {editUser === users.email ? 
                                    (<EditableUserRow editFormData={editFormData} handleEditFormChange ={handleEditFormChange} handleCancelEdit = {handleCancelEdit}/>)
                                    : 
                                    (<ReadOnlyUserRow users={users} handleEditClick = {handleEditClick} />)
                                    }
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