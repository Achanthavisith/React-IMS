import { Form, Button } from 'react-bootstrap';
import React, { useState, useEffect, useContext, } from 'react';
import axios from 'axios';
import '../components/PostProduct.css'
import ReadOnlyRow from '../components/ReadOnlyRow';
import EditableRow from '../components/EditableRow';
import { UserContext } from '../context/context';
import { addButtonContext } from '../context/addButtonContext';

export default function View() {
    
    //user context
    const {user} = useContext(UserContext);
    const {addGroup, setAddGroup} = useContext(addButtonContext);
    //set states
    const [editProductName, setEditedProductName] = useState();
    const [catFilter, setCatFilter] = useState("");
    const [quantityFilter, setQuantityFilter] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [groupDelete, setGroupDelete] = useState([]);
    const [editFormData, setEditFormData] = useState({
        name:"",
        quantity:"",
        category:""
    });
    //empty state array to house our categories collections data
    const [categories] = useState([]);
    const [products, setAllProducts] = useState([]);
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
        
        setEditedProductName(null);
        setRefresh(refresh + 1);
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
            if(groupDelete.includes(product.name)) {
                alert("Product is already set to be deleted.");
            } else if (groupDelete.length === 5) {
                alert("Max group delete is 5");
            } else {
                setGroupDelete(groupDelete.concat(product.name));
            }
        } else {
            setEditedProductName(product.name);
        }
        setEditFormData(formValues);
    };

    //get products data from mongodb input to array
    const getProducts = () => {
        axios.get("http://localhost:5000/api/products")
        .then((response) => {
            const data = response.data;
            setAllProducts(data);
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        getProducts();
    }, [refresh]);
    

    function productsDeleteHandler() {

        if (groupDelete.length === 0) {
            window.alert('there is no products to delete')
        } else if (window.confirm('Are you sure you want to delete these products?')) {
            for (let i = 0; i < groupDelete.length; i++) {
                const product = groupDelete[i];
                    axios.delete("http://localhost:5000/api/products/delete", {data: {name: product}})
            }
        }
    }

    return (
        //break into components next time...
        <React.Fragment>
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
                                    {user.role === 'admin' || user.role === 'manager' 
                                    ?  
                                        (
                                            <div>
                                                <Form.Label className="m-1 fw-bold">Group delete (Up to 5): </Form.Label>
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
                                    (<div></div>) 
                                    }
                                </div> 
                                ) 
                            : 
                            (<div> </div>) 
                        }
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
