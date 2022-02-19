import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {

    const loginStyle = {
        font: '15px arial sans',
        margin: 'auto',
        width: '40%',
        padding: '5px',
        marginTop: ' 200px'
    }

    const [toggle, setToggle] = useState(false)

     //set states
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const clearState = () => {
        setEmail("");
        setPassword("");
    };

    const register = async (event) => { 
            event.preventDefault(); 
            
            const user = { 
                email, 
                password, 
                role: "user", 
            };
            
            await axios.post("http://localhost:5000/api/addUser", user)
            .then((res) => console.log(res));
            clearState();  
            
    };

    
    return (
        <div style={loginStyle}>
            <Form className="container">
                <h2>User login:</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control 
                        type="text" 
                        name="email" 
                        placeholder="Email" 
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </Form.Group>

                {toggle ? (<Button className="form-control mb-3" onClick={register}>Register</Button>) 
                : 
                (<Button className="form-control mb-3">Login</Button>)
                }

                {toggle ? (<Button style={{fontSize: 15, fontWeight: 'bold'}} onClick={(e) => setToggle(false)}>Sign in</Button>) 
                : 
                (<Button style={{fontSize: 15, fontWeight: 'bold'}} onClick={(e) => setToggle(true)}>Not a user?</Button>)
                }

            </Form>
        </div>
    );
  }