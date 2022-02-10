import { Button, Form } from 'react-bootstrap';

export default function Login() {

    const loginStyle = {
        font: '15px arial sans',
        margin: 'auto',
        width: '40%',
        padding: '5px',
        marginTop: ' 200px'
    }

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
                        />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        className="form-control"

                        />
                </Form.Group>
                
                <Button className="form-control mb-3">Login</Button>
                <Form.Text style={{fontSize: 15, fontWeight: 'bold'}}>Not a user?</Form.Text>
            </Form>
        </div>
    );
  }