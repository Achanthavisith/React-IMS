import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {

    //styles
    const loginStyle = {
        font: '15px arial sans',
        margin: 'auto',
        width: '40%',
        padding: '5px',
        marginTop: ' 200px'
    }

    //boolean use state
    const [toggle, setToggle] = useState(false)

     //set states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

     //set states back to empty method
    const clearState = () => {
        setEmail("");
        setPassword("");
    };


    //handlesubmit
    const onSubmit = async (event) => { 
        event.preventDefault(); 
            
        //user schema
        const user = { 
            email, 
            password, 
            role: "user", 
        };

        //if register is clicked when submitted
        if (toggle === true) {
            //call api to post user
            await axios.post("http://localhost:5000/api/addUser", user)
            .then (response => {
                //crude validation to check if submitted email is empty
                if (user.email === "") {
                    alert("Fields are required")
                } else {
                    alert('User created: ' +  user.email);
                }
            }).catch((err)=> {
                //backend returns status(400) alert with user exists error
                alert('user already registered: ' + user.email);

                if (err.response) {
                    //console messages if any
                    console.log(err.response.data);
                    console.log('status code: ' + err.response.status);
                }
            })
            //clear states
            clearState(); 
            }

            if (toggle === false) {
                console.log('button clicked');
            }
    };

    return (
        <div style={loginStyle}>
            <Form className="container" onSubmit={onSubmit}>
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

                {toggle ? (<Button className="form-control mb-3" type="submit">Register</Button>) 
                : 
                (<Button className="form-control mb-3" type="submit">Login</Button>)
                }

                {toggle ? (<Button style={{fontSize: 15, fontWeight: 'bold'}} onClick={(e) => setToggle(false)}>Sign in</Button>) 
                : 
                (<Button style={{fontSize: 15, fontWeight: 'bold'}} onClick={(e) => setToggle(true)}>Not a user?</Button>)
                }

            </Form>
        </div>
    );
}