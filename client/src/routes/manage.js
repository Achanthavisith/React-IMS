import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import '../components/PostProduct.css'
import ReadOnlyRow from '../components/ReadOnlyRow';
import EditableRow from '../components/EditableRow';
import { UserContext } from '../context/context';
import { addButtonContext } from '../context/addButtonContext';

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
    const {addGroup, setAddGroup} = useContext(addButtonContext);
    //set states
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [removeCategory, setRemoveCategory] = useState("");
    const [product, setProduct] = useState("");
    const [editProductName, setEditedProductName] = useState();
    const [catFilter, setCatFilter] = useState("");
    const [quantityFilter, setQuantityFilter] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [groupDelete, setGroupDelete] = useState([]);

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

    //formchange for product rows
    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    //form submit states and reset edited row
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
        
        setProduct(newProduct);
        setEditedProductName(null);
    }

    //hide button for rows
    const handleClickHide = () => {
        setEditedProductName(null);
    }

    //handle edit click and setstates for form
    const handleEditClick = (event, product)=> {
        event.preventDefault();
        
        const formValues = { 
            name: product.name,
            quantity: product.quantity,
            category: product.category,
        }

        if (addGroup) {
            setEditedProductName(null);
            setGroupDelete(groupDelete.concat(product.name));
        } else {
            setEditedProductName(product.name);
        }

        setEditFormData(formValues);
    };

    //clear states
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
    }, [refresh,product]);
    

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
            }).catch((err) => {
                alert('category already exists')
            })
            setCategoryValidated(false);
            setRefresh(refresh + 1);
            clearState();
        };
    };

    //delete category submit
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
                axios.delete("http://localhost:5000/api/categories/delete", {data: {category: removeCategory}})
            }
            setRemoveCategoryValidated(false);
            setRefresh(refresh + 1);
            setRemoveCategory("");
        };
    };

    function productsDeleteHandler(event) {
        event.preventDefault();

        if (groupDelete.length === 0) {
            window.alert('there is no products to delete')
        }
        else if (window.confirm('Are you sure you want to delete these products?')) {
            for (let i = 0; i < groupDelete.length; i++) {
                const product = groupDelete[i];
                    axios.delete("http://localhost:5000/api/products/delete", {data: {name: product}})
            }
            setGroupDelete([])
        }
        setRefresh(refresh+1);
    }

    return (
        //break into components next time...
        <React.Fragment>
        {user ? 
            (
            <div>
                {user.role === ('admin' || 'manager') ? 
                    (
                        <div>
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
            
                                {toggle ? 
                                    (
                                        <Button className="mb-3" size="sm" variant="secondary" onClick={(e) => setToggle(false)}>ADD PRODUCT</Button>
                                    ) 
                                : 
                                    (
                                        <Button className="mb-3" size="sm" variant="secondary" onClick={(e) => setToggle(true)}>NEW CATEGORY?</Button>
                                    )
                                }
            
                            </div>
                        </div>) 
                        : 
                        <div className="py-1 m-3">CANNONT MANAGE/NOT ADMIN</div>
                        }
                </div>
            )
        :
            (
                <div className="py-1 m-3">
                    Logged out.
                </div>
            )
        }
        <div className="container"> 
                    <div className = "py-2">
                        <label className="m-1 fw-bold">Category filter:</label> 
                        <br></br>

                        {categories.map((categoryOption) => <Button className ="m-1 btn-sm" onClick={(e) => setCatFilter(categoryOption.category)} value={categoryOption.category} key={categoryOption._id}>{categoryOption.category}</Button>)}
                            <Button className ="m-1 btn-sm btn-danger" onClick={(e) => setCatFilter("")}>Remove Filter</Button>
                        <br></br>

                        <label className="m-1 fw-bold">Search Product: </label>
                            <input 
                                className = 'form-control'
                                type = "text" 
                                placeholder = "Name of product"  
                                onChange= {(e) => setNameSearch(e.target.value)}>
                            </input>

                        <label className="m-1 fw-bold">Check quantities less than: </label>
                            <input 
                                className = 'form-control'
                                type = "number" 
                                placeholder = "quantity"  
                                onChange= {(e) => setQuantityFilter(e.target.value)}>
                            </input>



                        {user ? (

                                <div>
                                    {user.role === ("admin" || "manager") 
                                    ?  
                                        (
                                            <div>
                                                <Form.Label className="m-1 fw-bold">Group delete: </Form.Label>
                                                    {groupDelete.map((product) => 
                                                        <div className="m-1" key={product}>{product}</div>)
                                                    }
                                                <Form onSubmit={productsDeleteHandler}>
                                                        {addGroup ? 
                                                            (<div>
                                                                <Button className="m-1 btn-sm btn-danger" onClick= {() => setGroupDelete([])}>clear delete</Button>
                                                                <Button className="m-1 btn-sm btn-danger" type="submit">Group Delete</Button>
                                                                <Button className="m-1 btn-sm btn-secondary" onClick={() => setAddGroup(false)}>cancel</Button>
                                                            </div>) 
                                                        :   (<div>
                                                                <Button className="m-1 btn-sm btn-primary" onClick={() => setAddGroup(true)}>Add to be deleted</Button>
                                                            </div>)
                                                        }   

                                                </Form>
                                            </div>) 
                                    : 
                                        (<div></div>) }
                                </div> ) 
                            : (<div> </div>) }
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
                                if (quantityFilter) {
                                    return (product.quantity <= quantityFilter)
                                } else {
                                    return (product.quantity > null)
                                }
                            })
                            .filter(product => {
                                    return (product.category.includes(catFilter))
                            }).filter(product => {
                                return (product.name.toLowerCase().includes(nameSearch.toLocaleLowerCase()))
                            }).map((product) => (
                                <React.Fragment key={product.name}>
                                    {editProductName === product.name ? (
                                        <EditableRow editFormData={editFormData} handleEditFormChange ={handleEditFormChange} handleEditableRowCancel = {handleClickHide}/>
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
