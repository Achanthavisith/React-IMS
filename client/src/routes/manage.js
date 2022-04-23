import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
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
    //user context
    const {user} = useContext(UserContext);
    //set states
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [removeCategory, setRemoveCategory] = useState("");
    const [product, setProducts] = useState("");
    const [editProductName, setEditedProductName] = useState();
    const [catFilter, setCatFilter] = useState("");
    const [nameSearch, setNameSearch] = useState("");
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
    //empty state array to house our categories collections data
    const [categories, setCategories] = useState([]);
    const [products, setAllProducts] = useState([]);
    //validated booleans for add forms
    const [validated, setValidated] = useState(false);
    const [categoryValidated, setCategoryValidated] = useState(false);
    const [removeCategoryValidated, setRemoveCategoryValidated] = useState(false);
    //keep track of our buttons
    const [toggle, setToggle] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
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
        setRefresh(refresh + 1);
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

    const clearState = () => {
        setName("");
        setQuantity("");
        setCategory("");
    };

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
    }, [refresh]);

    useEffect(() => {
        getProducts();
    }, [refresh]);
    

    //sumbit handler for add product form
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
            const product = { 
                name, 
                quantity, 
                category, 
                usage: 0
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
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);

        setRefresh(refresh + 1);
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
            setRefresh(refresh + 1);
            clearState();
        };
    };

    const deleteCategorySubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setRemoveCategoryValidated(true);

        if(form.checkValidity() === true){
            event.preventDefault(); 
            
            if(window.confirm('Are you sure you want to delete category: ' + removeCategory)) {
                //  console.log(product);
                axios.delete("http://localhost:5000/api/categories/delete", {data: {category: removeCategory}})
            }
            setRemoveCategoryValidated(false);
            setRefresh(refresh + 1);
            setRemoveCategory("");
        };
    };

    const [groupDelete, setGroupDelete] = useState("");

    function productsDeleteHandler(event) {
        event.preventDefault();
        const myArray = groupDelete.split(",");

        if(window.confirm('Are you sure you want to delete these products?')) {
            for (let i = 0; i < myArray.length; i++) {
                const product = myArray[i];
                    axios.delete("http://localhost:5000/api/products/delete", {data: {name: product}})
            }
        }
        setRefresh(refresh+1);
        setGroupDelete("");

    }


    return (
        
        <React.Fragment>
        {user ? 
        (<div>
            {user.role === 'admin' && 'manager' ? 
                (<div>
                    <h4 style={{textAlign: 'center', padding: '10px'}}>ADD:</h4>
                    <div style={loginStyle}>
                        {toggle ? 
                            ( 
                                <>
                                    <Form noValidate validated={categoryValidated} onSubmit={addCategorySubmit}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>New Category: </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="category"
                                                            placeholder="category"
                                                            className="form-control mb-3"
                                                            value={newCategory}
                                                            onChange={(e) => setNewCategory(e.target.value)}
                                                            required />
                                                        <Form.Control.Feedback type="invalid" className="mb-3">
                                                            Please provide a category name.
                                                        </Form.Control.Feedback>
                                                        <Button className="mb-3 btn-sm" type="submit">ADD</Button>
                                                    </Form.Group>
                                    </Form>
                                    <Form noValidate validated={removeCategoryValidated} onSubmit={deleteCategorySubmit}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Delete Category:</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    id="category"
                                                    type="select"
                                                    value={removeCategory}
                                                    className="form-control"
                                                    onChange={(e) => setRemoveCategory(e.target.value)}
                                                >
                                                    <option value="">- - -</option>
                                                    {categories.map((categoryOption) => <option value={categoryOption.category} key={categoryOption._id}>{categoryOption.category}</option>)}
                                                </Form.Control>
                                                <Form.Control.Feedback type="invalid">
                                                    Please select a category.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button className="mb-3 btn-danger btn-sm" type="submit">DELETE</Button>
                                    </Form>
                                </>
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
                                        >
                                            <option value="" >- - -</option>
                                            {categories.map((categoryOption) => <option value={categoryOption.category} key={categoryOption._id}>{categoryOption.category}</option>)}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Please select a category.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button className="mb-3 btn-sm" type="submit">ADD</Button>
                                </Form>
                            )
                        }
    
                        {toggle ? (<Button className="mb-3" size="sm" variant="secondary" onClick={(e) => setToggle(false)}>ADD PRODUCT</Button>) 
                        : 
                        (<Button className="mb-3" size="sm" variant="secondary" onClick={(e) => setToggle(true)}>NEW CATEGORY?</Button>)
                        }
    
                        </div>
                    </div>) 
                : 
                <div className="py-1 m-3">CANNONT MANAGE/NOT ADMIN</div>}
        </div>)
        :
        (<div className="py-1 m-3">
            Logged out.
        </div>)}
        <div className="container"> 
                    <div className = "py-2">
                        <label className="m-1">Category filter:</label> 
                        <br></br>

                        {categories.map((categoryOption) => <Button className ="m-1 btn-sm" onClick={(e) => setCatFilter(categoryOption.category)} value={categoryOption.category} key={categoryOption._id}>{categoryOption.category}</Button>)}
                        <Button className ="m-1 btn-sm btn-danger" onClick={(e) => setCatFilter("")}>Remove Filter</Button>
                        <br></br>

                        <label className="m-1">Search Product: </label>
                        <input 
                            className = 'form-control'
                            type = "text" 
                            placeholder = "Name of product"  
                            onChange= {(e) => setNameSearch(e.target.value)}>
                        </input>

                        {user ? (
                                <div>
                                    {user.role === "admin" && "manager" ?  
                                        (
                                            <div>
                                                <Form.Label className="m-1">Group delete:</Form.Label>
                                                <Form onSubmit={productsDeleteHandler}>
                                                        <Form.Group className="pt-1">
                                                            <Form.Control 
                                                                type ="text"
                                                                name="products" 
                                                                placeholder="Separate products by a comma" 
                                                                className="form-control"
                                                                value={groupDelete}
                                                                onChange={(e) => setGroupDelete(e.target.value)}
                                                                required
                                                            />
                                                        </Form.Group>
                                                        <Button className="mt-2 btn-sm btn-danger" type="submit">DELETE</Button>
                                                </Form>
                                            </div>) : (<div></div>)}
                                </div>) : (<div></div>)}
                    </div>

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
                            {products
                            .filter(product => {
                                    return (product.category.includes(catFilter)
                                )
                            }).filter(product => {
                                return (product.name.toLowerCase().includes(nameSearch.toLocaleLowerCase())
                            )
                            }).map((product) => (
                                <React.Fragment key={product.name}>
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
