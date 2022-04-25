
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
          <img src="" alt="First slide" className="h-full" />
      </div>
  </Carousel.Item>
    <Carousel.Item interval={null}>
      <div className="h-128">
        <img src=""
        alt="Second slide" className="h-full" />
      </div>
    </Carousel.Item>

        <Carousel.Item interval={null}>
          <div className="h-128">
            <img src=""
            alt="Third slide" className="h-full" />
          </div>
    </Carousel.Item>

</Carousel>
  <Card.Footer className="text-muted">A React based Application</Card.Footer>
</Card>


      </div>  
    );
}