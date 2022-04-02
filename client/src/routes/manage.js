import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostProducts from '../components/PostProducts';
import '../components/PostProduct.css'
import ReadOnlyRow from '../components/ReadOnlyRow';
import EditableRow from '../components/EditableRow';
import { UserContext } from '../context/context';



const loginStyle = {
    font: '15px arial sans',
    margin: 'auto',
    width: '40%',
    padding: '5px',
    marginTop: ' 5px'
};

export default function Manage() {
    //set states
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [product, setProducts] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);


// set state of editing and adding into the 
    const [addFormData, setAddFormData] = useState({
        name:"",
        quantity:"",
        category:""
    });
    const [editFormData, setEditFormData] = useState({
        name:"",
        quantity:"",
        category:""
    });
    //user context
    const {user} = useContext(UserContext);
    
    const [editProductName, setEditedProductName] = useState(null);


    //Setting state and giving a provider

    const [editProductName, setEditedProductName] = useState();






    //Used to update table when the form is submitted 

 function onUpdate() {
     console.log("Its works/ Updated");
     if (isUpdate === true){
         setIsUpdate(false);

     }
     else{
         setIsUpdate(true);
     }
     setIsUpdate(true);

 }
 
    const handleAddFormChange = (event) => {
        event.preventDefault();
        
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttrribute('_id');
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedProduct = {
            name: editFormData.name,
            quantity: editFormData.quantity,
            category: editFormData.category,
        }
        const newProduct = [...products];

        const index = products.findIndex((product) => product.name === editProductName)
        newProduct[index] = editedProduct;
        
        setProducts(newProduct);
        setEditedProductName(null);

    }

    const handleEditClick = (event, product)=> {
        event.preventDefault();
        setEditedProductName(product.name);

        const formValues = { 
            name: product.name,
            quantity: product.quantity,
            category: product.category,
        }
        setEditFormData(formValues);
    };

    //empty state array to house our categories collections data
    const [categories, setCategories] = useState([]);
    const [products, setAllProducts] = useState([]);
    
    //validated booleans for add forms
    const [validated, setValidated] = useState(false);
    const [categoryValidated, setCategoryValidated] = useState(false);
    //keep track of our buttons
    const [toggle, setToggle] = useState(false);
    const [refresh,setRefresh] = useState(false);

    

    const clearState = () => {
        setName("");
        setQuantity("");
        setCategory("");
    };

    const clearNewCategoryState = () => {
        setNewCategory("");
    }

    //get categories data from mongodb input to array
    const getCategories = () => {
        axios.get("http://localhost:5000/api/categories")
        .then((response) => {
            const data = response.data;
            setCategories(data);
        })
        .catch(error => console.error(error));
    }

    //get products data from mongodb input to array
    const getProducts = () => {
        axios.get("http://localhost:5000/api/products")
        .then((response) => {
            const data = response.data;
            setAllProducts(data);
        })
        .catch(error => console.error(error));
    }

    //useeffect to render our collections data
    useEffect(() => {
        getCategories();
    }, [toggle]);

    useEffect(() => {
        getProducts();
    }, [setAllProducts]);
    





    //sumbit handler for add product form
    const handleSubmit = async (event) => { 
        
        const form = event.currentTarget;
 
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }   
        setValidated(true);

        if(form.checkValidity() === true){
            event.preventDefault(); 
            const product = { 
                name, 
                quantity, 
                category, 
            }; 
            await axios.post("http://localhost:5000/api/addProduct", 
                product)
            .then((res) => {
                alert('Product Created: ' + name);
            }).catch((err) => {
                alert('Product already exists')
            })
            setValidated(false);
            clearState();
          
        };
        event.preventDefault();
        
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
        event.preventDefault();
    const newProduct = {
        name: addFormData.name,
        quantity: addFormData.quantity,
        category: addFormData.category,
    };
    const newProducts = [...products, newProduct];
    setAllProducts(newProducts);
    
    };

    //newcategory form submit handler
    const addCategorySubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setCategoryValidated(true);

        if(form.checkValidity() === true){
            event.preventDefault(); 
            const Category = { 
                category: newCategory, 
            }; 
            await axios.post("http://localhost:5000/api/addCategory", 
                Category)
            .then((res) => {
                alert('Category Created: ' + newCategory);
            }).catch((err) => {
                alert('category already exists')
            })
            setCategoryValidated(false);
            clearNewCategoryState();
        };
    };

    return (
        
        <React.Fragment>
        {user ? 
        (<div>
            {user.role === 'admin' ? 
                (<div><h4 style={{textAlign: 'center', padding: '10px'}}>ADD:</h4>
                    <div style={loginStyle}>
                        {toggle ? 
                            ( 
                            <Form noValidate validated={categoryValidated} onSubmit={addCategorySubmit}>
                                    <Form.Group className="mb-3">
                                    <Form.Label>New Category: </Form.Label>
                                    <Form.Control 
                                    type = "text"
                                    name="category" 
                                    placeholder="category" 
                                    className="form-control mb-3"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    required
                                    />
                                    <Form.Control.Feedback type="invalid" className="mb-3">
                                        Please provide a category name.
                                    </Form.Control.Feedback>
                                    <Button className="mb-3" size="sm" variant="secondary" type="submit">Add new category</Button>
                                    </Form.Group>
                            </Form>
                            ) 
                        : 
                            (
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Product Name: </Form.Label>
                                    <Form.Control 
                                        type = "text"
                                        name="product" 
                                        placeholder="Product" 
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                       // onChange={handleAddFormChange}
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
                                        className="form-control"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                       // onChange={handleAddFormChange}
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a quantity.
                                    </Form.Control.Feedback>
                                </Form.Group>
                
                                <Form.Group className="mb-3">
                                    <Form.Label>Category:</Form.Label>
                                    <Form.Control 
                                        required
                                        as="select"
                                        id="category"
                                        type="select"
                                        value={category}
                                        className="form-control"
                                        onChange={(e) => setCategory(e.target.value)}
                                        //onChange={handleAddFormChange}
                                    >
                                        <option value="" >- - -</option>
                                        {categories.map((categoryOption) => <option value={categoryOption.category} key={categoryOption._id}>{categoryOption.category}</option>)}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select a category.
                                    </Form.Control.Feedback>
                                </Form.Group>
                
                                <Button className="mb-3" type="submit">ADD</Button>
                            </Form>
                            )
                        }
    
                        {toggle ? (<Button className="mb-3" size="sm" onClick={(e) => setToggle(false)}>Add product</Button>) 
                        : 
                        (<Button className="mb-3" size="sm" variant="secondary" onClick={(e) => setToggle(true)}>Need a new Category?</Button>)
                        }
    
                        </div>
                    </div>) 
                : 
                <div>cannot manage/not an admin.</div>}
        </div>)
        :
        (<div>
            not logged in.
        </div>)}
        <div className="product-container"> 
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Admin Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                            {products.map((product) =>(
                                <React.Fragment>
                                    {editProductName === product.name ? (
                                        <EditableRow editFormData={editFormData} handleEditFormChange ={handleEditFormChange}/>
                                    ) : (
                                        <ReadOnlyRow product={product} handleEditClick = {handleEditClick}/>
                                    )}
                                </React.Fragment>
                            ))}
                    </tbody>
                </table>
            </form>
        </div>
        </React.Fragment>
    );
}
