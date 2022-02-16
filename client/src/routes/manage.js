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
    //useState parameters
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [validated, setValidated] = useState(false);

    const clearState = () => {
        setName('');
        setQuantity('');
      }

    //form submit with some validation
    const handleSubmit = async(event) => { 
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          };
        
          setValidated(true);

       if (form.checkValidity() === true) {
           event.preventDefault();
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
    };

    return (
        <div>
            <h4 style={{textAlign: 'center', padding: '10px'}}>ADD:</h4>
            <div style={loginStyle}>
                <Form noValidate validated ={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                            <Form.Label>Product Name: </Form.Label>
                            <Form.Control 
                                type = "text"
                                name="product" 
                                placeholder="Product" 
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a product name.
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity: </Form.Label>
                            <Form.Control 
                                type = "number"
                                name="quantity" 
                                placeholder="quantity" 
                                value={quantity}
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a quantity.
                                </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Select Category: </Form.Label>
                            <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}
                                    required>
                                <option value="Bulk">Bulk</option>
                                <option value="Canned">Canned</option>
                                <option value="Produce">Produce</option>
                                <option value="packaged">Packaged</option>
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" className="form-control mb-3">ADD</Button>
                    </Form>

                
                </div>
        </div>
    );
  }