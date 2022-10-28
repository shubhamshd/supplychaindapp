import { Nav, Container, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";


const MyNavbar = ({isConnected, connectWallet}) => {
  const [showParticipant, setShowParticipant] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const showParticipantDropdown = (e)=>{
      setShowParticipant(!showParticipant);
  }
  const hideParticipantDropdown = e => {
      setShowParticipant(false);
  }

  const showProductDropdown = (e)=>{
    setShowProduct(!showProduct);
  }
  const hideProductDropdown = e => {
    setShowProduct(false);
  }
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown"
              show={showProduct}
              onMouseEnter={showProductDropdown} 
              onMouseLeave={hideProductDropdown}
            >
              <NavDropdown.Item as={Link} to="/products">Products</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/changeProductOwnership">Change Product Ownership</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/addProduct">Add New Product</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Participants" id="basic-nav-dropdown"
              show={showParticipant}
              onMouseEnter={showParticipantDropdown} 
              onMouseLeave={hideParticipantDropdown}
            >
              <NavDropdown.Item as={Link} to="/getParticipant">Get Participant Details</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/addParticipant">Add New Participant</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          { !isConnected.current ? 
            <Button className="pull-right" onClick={event => connectWallet(event)}>Connect Wallet??</Button>
            : 
            <Navbar.Brand>Connected!!!</Navbar.Brand>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;