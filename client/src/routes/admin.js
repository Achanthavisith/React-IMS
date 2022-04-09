import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../context/context';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import EditableRowUser from '../components/EditableRowUser';

const loginStyle = {
    font: '15px arial sans',
    margin: 'auto',
    width: '40%',
    padding: '5px',
    marginTop: ' 5px'
};

export default function Admin() {
//set states
    const {user} = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [adminUser, setAdminUser] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [filter, setFilter] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [allUserRoles,setAllUserRole] = useState("");
    const [editUserEmail, setEditedUserEmail] = useState();

    

 //validated booleans for add forms
 const [validated, setValidated] = useState(false);
 const [categoryValidated, setCategoryValidated] = useState(false);
 const [removeCategoryValidated, setRemoveCategoryValidated] = useState(false);


    // making handler for adding in users form

        //Clearing set states
    const clearState = () => {
        setEmail("");
        setRole("");
    };

    const handleSubmit = async (event) => { 
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }   
        setValidated(true);

        if(form.checkValidity() === true){
            event.preventDefault(); 
            const allUsers = { 
                email, 
                role, 
                password, 
            }; 
            await axios.post("http://localhost:5000/api/allUsers", 
                allUsers)
            .then((res) => {
                alert('User Created: ' + email);
            }).catch((err) => {
                alert('User already exists')
            })
            setValidated(false);
            clearState();
        };
        
        const fieldName = event.target.email;
        const fieldValue = event.target.value;
      //  const newFormData = { ...addFormData};
      //  newFormData[fieldName] = fieldValue;

       // setAddFormData(newFormData);

      //  const newProduct = {
    //        name: addFormData.name,
     //       quantity: addFormData.quantity,
     //       category: addFormData.category,
     //   };
       // const newProducts = [...products, newProduct];
       // setAllProducts(newProducts);
      //  setRefresh(refresh + 1);
      //  setRefresh(0);
    };

    const [editFormDataUser, setEditFormDataUser] = useState({
        email:"",
        role:"",
    });

    //Refresh the table when a new user is added into it 
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedProduct = {
          //  name: editFormData.name,
         //   quantity: editFormData.quantity,
         //   category: editFormData.category,
        }
      //  const newProduct = [...products];

      //  const index = products.findIndex((product) => product.name === editProductName)
      //  newProduct[index] = editedProduct;
      //  
       // setProducts(newProduct);
       // setEditedProductName(null);
       // setRefresh(refresh + 1);
    }

    // Edit click when wanting to edit a specfic product
    const handleEditClick = (event, user)=> {
        event.preventDefault();
        
        setEditedUserEmail(users.email);
        const formValues = { 
            email: user.email,
            role: user.role,
        }
        setEditFormDataUser(formValues);
    };

    const handleEditFormChangeUser = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttrribute('_id');
        const fieldValue = event.target.value;

        const newFormData = {...editFormDataUser};
        newFormData[fieldName] = fieldValue;

        setEditFormDataUser(newFormData);
    }


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



                //get Users data from mongodb input to array
                const getAllUserRoles = () => {
                    axios.get("http://localhost:5000/api/user/roles")
                    .then((response) => {
                        const data = response.data;
                        setAllUserRole(data);
                    })
                    .catch(error => console.error(error));
                }
            
                useEffect(() => {
                    getAllUserRoles();
                }, []);
        
    // Used to edit user within the system to change role etc
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
                {user ? 
                (<div className="py-1 m-3">
                    Logged in: {JSON.stringify(user.user)}
                    {user.role === 'admin' ? 
                    
                    (
                        
                    <div >
                        <React.Fragment>
                            <div style={loginStyle}>
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
                                            <option value="admin"> admin</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="mb-3" type="submit">EDIT</Button>
                            </Form>
                            </div>
                            <div>
                           
                            <div className= "container">
             <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                        <th>UserEmail</th>
                        <th>Role</th>
                        <th>Admin Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                            {users.map((users) => (
                                <React.Fragment key={users._id}>
                                   
                                        <EditableRowUser editFormDataUser={editFormDataUser} handleEditFormChange ={handleEditFormChangeUser}/>
                            
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </form>
        </div>
                            </div>
                            </React.Fragment>
                    
                    </div>
          
                    )
                    :
                    (
              <div></div>
                )
                    (<div>
                        Not an Admin
                    </div>)
                    
                    }</div>)
                :
                (<div className="py-1 m-3">
                    Logged out.
                </div>)
                }

                <div>
                
                </div>
            </div>
        
    );
            }

           