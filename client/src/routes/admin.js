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
    const [password, setNewPassword] = useState("");
    const [email, setNewEmail] = useState("");
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

    async function onSubmitPassword() {
        const editUser = { 
            email: user.user,
            password: password 
        }; 
       console.log(editUser.email + " " + editUser.password)
        await axios.put("http://localhost:5000/api/user/update/password", 
        editUser)
        
    .then((res) => {
        alert('User Password Updated: ');
    }).catch((err) => {
        alert('Error');
    })
    
   setNewPassword("");
    setRefresh(refresh + 1);
    };

    async function onSubmitEmail(event) {
        event.preventDefault()
        const editUser = { 
            _id : user._id,
            email: email
        }; 
        console.log(editUser._id + " " + editUser.email)
        await axios.put("http://localhost:5000/api/user/update/email", 
        editUser)
        
    .then((res) => {
        alert('User Email Updated: ');
    }).catch((err) => {
        alert('Error');
    })
    
   setNewEmail("");
    setRefresh(refresh + 1);
    };


    const loginStyle = {
        font: '15px arial sans',
        margin: 'auto',
        width: '40%',
        padding: '5px',
        marginTop: ' 5px'
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
                    (<div className= "container " style={loginStyle}>
                        <form >
                            <label className="m-1 fw-bold" > Input your new email: </label>
                            <input  className = "form-control" id="changeEmailInput" onChange={(e) => setNewEmail(e.target.value)}></input>
                            <button onClick = {onSubmitEmail} className ="m-1 btn-sm btn-danger">Submit Email</button>
                            <div></div>
                            <label className="m-1 fw-bold">Input your new password: </label>
                            <input className = "form-control" id="changePasswordInput" onChange={(e) => setNewPassword(e.target.value)}></input>
                            <button onClick={onSubmitPassword} className ="m-1 btn-sm btn-danger">Submit Password</button>
                       
                        </form>
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