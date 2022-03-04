

export function PostProduct(props) {
    const card = {
        border: '2px solid #2F4F4F',
        font: '30px arial',
        backgroundColor: '#D2691E',
        margin: 20,
        padding: 10,
    }
    
    return (
        
        //<div  class ="row">
        <div  class="col-sm-6">
          <div  style = {card}  class="card ">
            <div  class="card-body ">
                <h1 class = "text-center display-1"><u>Product</u></h1>
              <h2 class="card-title d-flex justify-content-center display-2"> {props.post.name}</h2>
              <p class="card-text  d-flex justify-content-center display-6">Quantity: {props.post.quantity}</p>
              <p class="card-text d-flex justify-content-center display-6">Category: {props.post.category}</p>
              <a  href = '#' 
        onClick={props.postclicked} class = " text-decoration-none card-body d-flex justify-content-center"><button class= " bg-dark text-white center" > 
                        More Information</button>
                        </a>
              <div  class = "card-body d-flex justify-content-center"><button onClick = {props.postDeleted} class= " bg-dark text-white center" > 
                        Delete Product</button>
                        </div>
            </div>
          </div>
        </div>
        
        
    );
    
}