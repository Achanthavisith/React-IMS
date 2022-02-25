
import { Component } from 'react';
import axios from 'axios';
import { PostProduct } from './PostProduct';
import SingleClickProductName from './SingleClickProductName';



export default class PostProducts extends Component { 
    constructor(props) {
        super(props);
        this.state = { 
            PostProducts: [],
            selectedPostName: null,
        };
       
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/products",)
                .then((response) => {
                    const PostProducts = [];
                    for ( let key in response.data) {
                        PostProducts.push({...response.data[key], id: key});
                    }
                        this.setState({
                            PostProducts: PostProducts,
                        });
                    });
    }
    
    onPostClickHandler = (name) =>  {
        console.log(name);
        this.setState({
            selectedPostName: name,
        })
    }

render() {
 const PostProducts = this.state.PostProducts.map((post) => {
     return (<PostProduct
     key={post.id}  
     post = {post}  
     postclicked = {this.onPostClickHandler.bind(this, post.name,)} 
     />);
    });


    return (
        <div>
<h1 className = 'font-bold text-xl my-3 '>Products Within System</h1>
<div>{PostProducts}</div>
{this.state.selectedPostName && (
<div>
    <h2 className=' font-bold'>This is the Product you have clicked!</h2><SingleClickProductName id={this.state.selectedPostName}/> </div>
)}
        </div>
    );
}
}