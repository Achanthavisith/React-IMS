import { Button, Form } from 'react-bootstrap';
import { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/context';
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'

export default function Home() {

    const {user} = useContext(UserContext);

    const loginStyle = {
        font: '15px arial sans',
        margin: 'auto',
        width: '60%',
        padding: '5px',
        marginTop: '10px',
    }

    return (
        <div>
            <Card className="text-center">
  <Card.Header>Welcome to our Inventory Manager, {JSON.stringify(user.user)} </Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
      With supporting text below as a natural lead-in to additional content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
  
  <Carousel variant="dark"
  border = 'black'
style={loginStyle}
 interval = {null}
 class = "border border-primary"
>
  <Carousel.Item interval={null}>
      
    <img
      className="d-block w-100 h-50"
      src="https://www.simpleimageresizer.com/_uploads/photos/c2326972/264-2640106_inventory-management-system-logo-hd-png-download_1_500x250.png"
      alt="First slide"
    />
    <Carousel.Caption>
      <h5>First slide label</h5>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={null}>
    <img
      className="d-block w-100"
      src="https://www.simpleimageresizer.com/_uploads/photos/c2326972/Warehouse_800x355.png"
      alt="Second slide"
    />
    <Carousel.Caption>
      <h5>Second slide label</h5>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item interval={null}>
    <img
      className="d-block w-100"
      src="https://www.simpleimageresizer.com/_uploads/photos/c2326972/inventory_800x355.png"
      alt="Third slide"
    />
    <Carousel.Caption>
      <h5>Third slide label</h5>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  <Card.Footer className="text-muted">2 days ago</Card.Footer>
</Card>


      </div>
    );
}