import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";
import pic3 from "../images/pic3.png";

export default function Home() {
  const loginStyle = {
    font: "15px arial sans",
    margin: "auto",
    padding: "5px",
    marginTop: "100px",
  };
  const slideshow = {
    font: "15px arial sans",
    margin: "auto",
    padding: "5px",
    marginTop: "10px",
    marginBottom: "10px",
    widith: "60%",
  };

  return (
    <div style={loginStyle}>
      <Card className="text-center">
        <Card.Header>Welcome to our Inventory Manager </Card.Header>
        <Card.Body>
          <Card.Title>If an account is not made, visit the login tab!</Card.Title>
          <Card.Text>Application created by Andrew Chanthavisith and Caleb Coussan</Card.Text>
        </Card.Body>

        <Carousel variant="dark" border="black" style={slideshow} interval={7000} className="border border-primary">
          <Carousel.Item interval={null}>
            <div className="h-128">
              <img src={pic1} width={500} height={300} alt="First slide" className="h-full" />
            </div>
          </Carousel.Item>
          <Carousel.Item interval={null}>
            <div className="h-128">
              <img src={pic2} width={400} height={300} alt="Second slide" className="h-full" />
            </div>
          </Carousel.Item>

          <Carousel.Item interval={null}>
            <div className="h-128">
              <img src={pic3} width={400} height={300} alt="Third slide" className="h-full" />
            </div>
          </Carousel.Item>
        </Carousel>
        <Card.Footer className="text-muted">A React based Application</Card.Footer>
      </Card>
    </div>
  );
}
