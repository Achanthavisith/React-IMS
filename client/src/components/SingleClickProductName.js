import  axios  from "axios";

import { Component } from "react";
import { PostProduct } from "./PostProduct";


export default class SingleClickProductName extends Component{
    constructor(props) {
        super(props);
    }

componentDidMount() { 
    // need to add the correct api routing for the following of produvt names so after click we can get info for what you chose
    // the routing here returns all products after you clikc but wanting just the info of the one specifc product clicked 
    axios.get('http://localhost:5000/api/products/',).then(response => {
        console.log(response.data);
    })
}

    render() {
        return(
            
        <div class="d-flex  p-2 flex-column" >
        <div>Name: </div>
        <div>Quantitiy: </div>
        <div>Category: </div>


        </div>
        );
    }
}