import React, { Component } from 'react';
import { Container, Nav, Navbar} from "react-bootstrap";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./pages/Home";
import PaceCalculator from "./pages/PaceCalculator";
import logo from "./logowhite.PNG";
import TimeCalculator from "./pages/TimeCalculator"; // Assuming you have the logo image file in the same directory
import WindCalculator from "./pages/WindCalculator";
import IAAFCalculator from "./pages/IAAFCalculator";
import './styles/mobilestyles.css';



class NavbarComp extends Component {
    render() {

        return (
            <Router>
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container fluid>
                            <Navbar.Brand as={Link} to="/">
                                <img src={logo} alt="Logo"  className="navbarlogo" />
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link style={{fontSize: '25px'}} as={Link} to="/paceCalculator" >Pace Calculator</Nav.Link>
                                    <Nav.Link style={{fontSize: '25px'}} as={Link} to="/timeCalculator">Time Calculator</Nav.Link>
                                    <Nav.Link style={{fontSize: '25px'}} as={Link} to="/iaafCalculator">IAAF Conversion</Nav.Link>
                                    <Nav.Link style={{fontSize: '25px'}} as={Link} to="/windCalculator">Wind Calculator</Nav.Link>
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

