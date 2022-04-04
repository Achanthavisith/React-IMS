import { useContext, useState, useEffect } from "react";
import { UserContext } from '../context/context';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const loginStyle = {
    font: '15px arial sans',
    margin: 'auto',
    width: '40%',
    padding: '5px',
    marginTop: ' 5px'
};

export default function Admin() {

    const {user} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [adminUser, setAdminUser] = useState("");
    const [role, setRole] = useState("");


    //get categories data from mongodb input to array
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

    const editUserSubmit = async (event) => { 
        event.preventDefault();

        if(adminUser === user.user) {
            alert("Cannot edit logged in user.");
        }
        else if(adminUser === "admin@admin"){
            alert("Cannot edit admin.");
        } else {
            console.log("sumbitted");
        }
    };

    return (
        <div>
            <div>
                {user ? 
                (<div className="py-1 m-3">
                    Logged in: {JSON.stringify(user.user)}
                    {user.role === 'admin' ? 
                    
                    (<div style={loginStyle}>
                        <Form onSubmit={editUserSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select user:</Form.Label>
                                        <Form.Control 
                                            required
                                            as="select"
                                            id="category"
                                            type="select"
                                            value={adminUser}
                                            className="form-control"
                                            onChange={(e) => setAdminUser(e.target.value)}
                                            //onChange={handleAddFormChange}
                                        >
                                            <option value="" >- - -</option>
                                            {users.map((usersOption) => <option value={usersOption.email} key={usersOption._id}>{usersOption.email}</option>)}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Select role:</Form.Label>
                                        <Form.Control 
                                            required
                                            as="select"
                                            id="user"
                                            type="select"
                                            value={role}
                                            className="form-control"
                                            onChange={(e) => setRole(e.target.value)}
                                            //onChange={handleAddFormChange}
                                        >
                                            <option value="" >- - -</option>
                                            <option value="manager" >manager</option>
                                            <option value="user" >user</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="mb-3" type="submit">EDIT</Button>
                            </Form>
                    </div>)
                    :
                    (<div>
                        Not an Admin
                    </div>)
                    }
                </div>)
                :
                (<div className="py-1 m-3">
                    Logged out.
                </div>)
                }
            </div>
        </div>
    );
}