import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap'

 const NavbarComponent = () => {
 	return (
 		<Navbar collapseOnSelect expand="lg" variant="dark">
		  <Container>
		  <Navbar.Brand href="/"><strong>Kasir</strong> App</Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
		    <Nav className="me-auto">
		      <Nav.Link href="/">Home</Nav.Link>
		      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
		        <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
		        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
		        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
		        <NavDropdown.Divider />
		        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
		      </NavDropdown>
		    </Nav>
		    <Nav>
		      <Nav.Link eventKey={2} as={Link} to="/login">
		        Login
		      </Nav.Link>
		    </Nav>
		  </Navbar.Collapse>
		  </Container>
		</Navbar>
 	);
 };

export default NavbarComponent;