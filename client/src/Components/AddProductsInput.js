import { Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
export default function AddProductsInputs() {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [listOfProducts, setListOfProduts] = useState([]);

  const AddProduct = () => {
      Axios.post("http://localhost:3000/addProduct" , {
          name: name ,
          quantity: quantity,
          category: category,
      })
  };



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
                <h2>Add A Product:</h2>
                <Form.Group className="mb-3">
                    <Form.Label>Product Name: </Form.Label>
                    <Form.Control 
                        type="text" 
                        name="Product Name" 
                        placeholder="Ex: Canned Corn" 
                        className="form-control"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity of Product: </Form.Label>
                    <Form.Control 
                        type="integer" 
                        name="Quantity of Product" 
                        placeholder="ex: 100" 
                        className="form-control"
                        onChange={(event) => {
                            setQuantity(event.target.value);
                        }}

                        />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category: </Form.Label>
                    <Form.Control 
                        type="text" 
                        name="Category of Product" 
                        placeholder="ex: Canned or Fresh" 
                        className="form-control"
                        onChange={(event) => {
                            setCategory(event.target.value);
                        }}

                        />
                </Form.Group>
                
                <Button onClick={AddProduct} className="form-control mb-3">Insert</Button>
                
            </Form>
            
        </div>
      
    );
}
