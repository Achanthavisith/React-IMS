import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const loginStyle = {
    font: '15px arial sans',
    margin: 'auto',
    width: '40%',
    padding: '5px',
    marginTop: ' 5px'
};


function FormInput(props) {
    const { label } = props;

    const [value, setValue] = useState('');
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={loginStyle}>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>{label}: </Form.Label>
                        <Form.Control 
                            type = "text"
                            name="category" 
                            className="form-control mb-3"
                            value={value}
                            onChange={onChange}
                            required
                        />
                </Form.Group>
            </Form>
        </div>
    )
}

export default FormInput;