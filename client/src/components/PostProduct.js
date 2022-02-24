export function PostProduct(props) {
    return (
        <div className= 'mx-2 p-2 border shadow border-red-300'>
            <div>Name: {props.post.name}</div>
            <div>Quantity: {props.post.quantity}</div>
            <div>Category: {props.post.category}</div>
        </div>
    )
}