import React from "react";
import "./components.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";

export const NavBar = () => {
  return (
    <div className="Navbar">
      <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Brand href="/">Contact Tracing</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Locations</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
