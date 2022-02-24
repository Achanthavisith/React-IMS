
import { Component } from 'react';
import axios from 'axios';
import { PostProduct } from './PostProduct';



export default class PostProducts extends Component { 
    constructor(props) {
        super(props);
        this.state = { 
            PostProducts: [],
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
    

render() {
 const PostProducts = this.state.PostProducts.map((post) => {
     return <PostProduct  key={post.id}  post = {post} />;
    });


    return (
        <div>
<h1 ClassName = 'font-bold text-xl my-3 '>Products Within System</h1>
<div>{PostProducts}</div>

        </div>
    );
}
}