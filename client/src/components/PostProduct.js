

import '../components/PostProduct.css'

export function PostProduct(props) {
    const card = {
        border: '2px solid #2F4F4F',
        font: '30px arial',
        backgroundColor: '#D2691E',
        margin: 20,
        padding: 10,
    }
    
    return (
    
            <tr>
              <td>{props.post.name}</td>
              <td>{props.post.quantity}</td>
              <td>{props.post.category}</td>
              
            </tr>
  

        /*
        //<div  class ="row">
        <div  className="col-sm-6">
          <div  style = {card}  className="card ">
            <div  className="card-body ">
                <h1 className = "text-center display-1"><u>Product</u></h1>
              <h2 className="card-title d-flex justify-content-center display-2"> {props.post.name}</h2>
              <p className="card-text  d-flex justify-content-center display-6">Quantity: {props.post.quantity}</p>
              <p className="card-text d-flex justify-content-center display-6">Category: {props.post.category}</p>
              <a  href = '#' 
                        onClick={props.postclicked} className = " text-decoration-none card-body d-flex justify-content-center"><button className= " bg-dark text-white center" > 
                        More Information</button>
                        </a>
              <div  className = "card-body d-flex justify-content-center"><button onClick = {props.postDeleted} className= " bg-dark text-white center" > 
                        Delete Product</button>
                        </div>
            </div>
          </div>
        </div>
        */
        
    );
    
}