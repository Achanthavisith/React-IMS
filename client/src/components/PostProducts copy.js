import { PostProduct } from './PostProduct';

import '../components/PostProduct.css'

const PostProducts = () => {
    const PostProducts = this.state.PostProducts.map((post) => {
        return (<PostProduct
        key={post.name}  
        post = {post}  
        postclicked = {this.onPostClickHandler.bind(
            this, 
            post.name,
            )} 
        postDeleted = {this.onPostDeleteHandler.bind(
                this,
                post.name,
            )}
        />);
        });
    return(
        
        <div className="product-container"> 
      <table>

        <thead>
          <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Test</th>
          </tr>
        </thead>
          <tbody>
        
{PostProducts}
</tbody>
        </table>
        
        </div>



    )
}
/*
export default class PostProducts extends Component { 

    
    constructor(props){
        super(props);
    
        this.state = { 
            PostProducts: [],
            selectedPostName: null,
            products: [],
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
        axios.get("http://localhost:5000/api/products/name", name).then((response) => {
        })
    }

    // this will work in deleteing just need to figure out the route to get the specific deleteProduct back end work and it will delete with axios
    onPostDeleteHandler = (name, e) => {
        console.log(name);

        if(window.confirm('Are you sure you want to delete')) {
            axios.delete("http://localhost:5000/api/products/delete", { data: { name: name }});
        }
    };

render() {
const PostProducts = this.state.PostProducts.map((post) => {
    return (<PostProduct
    key={post.name}  
    post = {post}  
    postclicked = {this.onPostClickHandler.bind(
        this, 
        post.name,
        )} 
    postDeleted = {this.onPostDeleteHandler.bind(
            this,
            post.name,
        )}
    />);
    });


    return (
        <div  >


<h1 className = 'font-bold text-xl my-3 '>Products Within System</h1>
{this.state.selectedPostName && (
<div>
    <h2 className='font-bold'>This is the Product you have clicked!</h2><SingleClickProductName id={this.state.selectedPostName}/> </div>
)}
<div >
<div className="product-container"> 
      <table>

        <thead>
          <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Category</th>
          </tr>
        </thead>
          <tbody>
        
{PostProducts}
</tbody>
        </table>
        
        </div>
</div>




        </div>
        // need to change the class in div for postproucts to align the cards next to each other using "d-flex justify-content-center" aligns the way I want but doenst show all elemetns 
    );
}
}
*/