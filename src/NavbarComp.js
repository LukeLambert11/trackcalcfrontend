import React, { Component } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";

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


class NavbarComp extends Component {
    render() {
        const navbarStyle = {
            height: '120px', // Adjust the height to your desired thickness
        };

        const logoStyle = {
            width: '100px', // Adjust the width to your desired size
            height : '100px',
            marginRight: '75px', // Adjust the margin-right to add space between the logo and text
        };

        return (
            <Router>
            <div>
                <Navbar bg="dark" data-bs-theme="dark" style={navbarStyle}>
                    <Container>
                        <img src={logo} alt="Logo" style={logoStyle} className="logo" />
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/paceCalculator"}>Pace Calculator</Nav.Link>
                            <Nav.Link as={Link} to={"/timeCalculator"}>Time Calculator</Nav.Link>

                            {/* <Nav.Link href="features">Features</Nav.Link>
                            <Nav.Link href="pricing">Pricing</Nav.Link> */}
                        </Nav>
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

