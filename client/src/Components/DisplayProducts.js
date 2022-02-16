import { Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './DisplayProducts.css';
export default function DisplayProduct() {

  const [listOfProducts, setListOfProduts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/displayProduct")
    .then((response) => {
        console.log(response)
        //setListOfProduts(response.data)
  })
  .catch(() => {
      console.log("ERR")
});
}, []);

    
    return (
        <div className="listOfProducts">
      {listOfProducts.map((val) => {
          return (
              <div className = "productDisplay">
              <h3>{val.name}</h3>
              <h3>{val.quantity}</h3>
              <h3>{val.category}</h3>
              </div>
    );

})}
</div>
      );
}
