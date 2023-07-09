import React, { Component } from 'react';
import { Container, Nav, Navbar} from "react-bootstrap";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./Home";
import PaceCalculator from "./PaceCalculator";
import logo from "./logo.jpg";
import TimeCalculator from "./TimeCalculator"; // Assuming you have the logo image file in the same directory
import WindCalculator from "./WindCalculator";
import IAAFCalculator from "./IAAFCalculator";


class NavbarComp extends Component {
    render() {

        const logoStyle = {
            width: '100px', // Adjust the width to your desired size
            height : '100px',
            marginRight: '75px', // Adjust the margin-right to add space between the logo and text
        };

        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container fluid>
                            <Navbar.Brand as={Link} to="/">
                                <img src={logo} alt="Logo" style={logoStyle} className="logo" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/windCalculator">Wind Calculator</Nav.Link>
                                    <Nav.Link as={Link} to="/paceCalculator">Pace Calculator</Nav.Link>
                                    <Nav.Link as={Link} to="/timeCalculator">Time Calculator</Nav.Link>
                                    <Nav.Link as={Link} to="/iaafCalculator">IAAF Conversion</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div>
                    <Switch>
                        <Route path="/paceCalculator">
                            <PaceCalculator/>
                        </Route>
                        <Route path="/timeCalculator">
                            <TimeCalculator/>
                        </Route>
                        <Route path="/windCalculator">
                            <WindCalculator/>
                        </Route>
                        <Route path="/iaafCalculator">
                            <IAAFCalculator/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default NavbarComp;

