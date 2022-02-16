import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const loginStyle = {
    font: '15px arial sans',
    margin: 'auto',
    width: '40%',
    padding: '5px',
    marginTop: ' 5px'
};

export default function Manage() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const onSubmit = async (e) => { 
        e.preventDefault(); 
        const product = { 
            name, 
            quantity, 
            category, 
        }; 
        console.log(product);
        alert('Product Created: ' + name);
    
        await axios.post("http://localhost:5000/api/addProduct", 
            product)
        .then((res) => console.log(res));


    };

    return (
        <div>
            <h4 style={{textAlign: 'center', padding: '10px'}}>ADD:</h4>
            <div style={loginStyle}>
                <Form.Group className="mb-3">
                        <Form.Label>Product Name: </Form.Label>
                        <Form.Control 
                            type = "text"
                            name="product" 
                            placeholder="Product" 
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                            />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Quantity: </Form.Label>
                        <Form.Control 
                            type = "number"
                            name="quantity" 
                            placeholder="quantity" 
                            className="form-control"
                            onChange={(e) => setQuantity(e.target.value)}
                            />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control 
                            type="text"
                            name="category" 
                            placeholder="category" 
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                            />
                    </Form.Group>

                    
                    
                    <Button className="form-control mb-3" type="submit" onClick={onSubmit}>ADD</Button>
                </div>
        </div>
    );
  }