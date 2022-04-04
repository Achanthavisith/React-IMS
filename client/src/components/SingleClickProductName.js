import  axios  from "axios";
import { Component } from "react";

export default class SingleClickProductName extends Component{
    constructor(props) {
        super(props);
    }

componentDidMount() { 
    // need to add the correct api routing for the following of produvt names so after click we can get info for what you chose
    // the routing here returns all products after you clikc but wanting just the info of the one specifc product clicked 
    const name = this.props.name;


    axios.get('http://localhost:5000/api/products/name', name ).then((response) => {

        console.log(response.data);
    })
}

    render() {
        return(
            
        <div className="d-flex  p-2 flex-column" >
        <div>Name:  </div>
        <div>Quantitiy: </div>
        <div>Category: </div>


        </div>
        );
    }
}