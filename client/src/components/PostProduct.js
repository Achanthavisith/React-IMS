export function PostProduct(props) {
    return (
        <a href = '#' 
        onClick={props.postclicked}
        class="d-flex  p-2 flex-column"
        >
        
            <div>Name: {props.post.name}</div>
            <div>Quantity: {props.post.quantity}</div>
            <div>Category: {props.post.category}</div>

        </a>
    );
    //className= 'mx-2 p-2 border shadow border-black-300 inline-block'
}