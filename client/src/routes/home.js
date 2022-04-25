
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'


export default function Home() {


    const loginStyle = {
        font: '15px arial sans',
        margin: 'auto',
        padding: '5px',
        marginTop: '100px',
    }
    const slideshow = {
      font: '15px arial sans',
      margin: 'auto',
      padding: '5px',
      marginTop: '10px',
      marginBottom: '10px',
      widith: '60%'
  }

    return (
        <div style={loginStyle}>
            <Card className="text-center">
  <Card.Header  >Welcome to our Inventory Manager </Card.Header>
  <Card.Body>
    <Card.Title>If an account its not made, login with the login tab!</Card.Title>
    <Card.Text>
      Application created by Andrew Chanthavisith and Caleb Coussan
    </Card.Text>
  </Card.Body>
  
<Carousel variant="dark"
  border = 'black'
  style={slideshow}
  interval = {7000}
  class = "border border-primary"
>
  <Carousel.Item interval={null}>
      <div className="h-128">
          <img src="https://www.simpleimageresizer.com/_uploads/photos/c2326972/567-5675046_transparent-inventory-clipart-cartoon-inventory-png-png-download_800x355.png" alt="First slide" className="h-full" />
      </div>
  </Carousel.Item>
    <Carousel.Item interval={null}>
      <div className="h-128">
        <img src="https://www.simpleimageresizer.com/_uploads/photos/c2326972/Inventory-PNG-Image_800x355.png"
        alt="Second slide" className="h-full" />
      </div>
    </Carousel.Item>

        <Carousel.Item interval={null}>
          <div className="h-128">
            <img src="https://www.simpleimageresizer.com/_uploads/photos/c2326972/inventory_800x355.png"
            alt="Third slide" className="h-full" />
          </div>
    </Carousel.Item>

</Carousel>
  <Card.Footer className="text-muted">A React based Application</Card.Footer>
</Card>


      </div>  
    );
}