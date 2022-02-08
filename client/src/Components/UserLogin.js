import React , { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const loginStyle = {
    font: '15px arial sans',
    margin: 'auto',
    width: '15%',
    border: '2px solid #2F4F4F',
    borderRadius: '5px',
    padding: '5px',
    marginTop: ' 200px'
}

//not done
export default function UserLogin() {
    const [inputField , setInputField] = useState({
        email: '',
        password: ''
    })

    const submitButton = () =>{
        console.log(inputField)
    }

    return <div style={loginStyle}>
        <Form className="container col-xs-3">
            <h2>User login:</h2>
            <Form.Group className="mb-3">
                <Form.Label>Email: </Form.Label>
                <Form.Control 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    className="form-control"
                    onChange={(e) => setInputField(e.target.value)}
                    value={inputField.email}
                    />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    className="form-control"
                    onChange={(e) => setInputField(e.target.value)}
                    value={inputField.password}
                    />
            </Form.Group>
            
            <Button onClick={submitButton}>Login</Button>
            <Form.Text className="p-3">Not a user?</Form.Text>
        </Form>
  </div>;
}

