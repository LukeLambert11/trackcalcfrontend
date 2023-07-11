import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';
import blackLogo from "../logoblack.PNG";
import '../styles/mobilestyles.css';

const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '18vh',
};

const linkContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(150px, 200px))',
    gridGap: '20px',
    marginTop: '20px',
    justifyContent: 'center',
    padding: '10px', // Add padding to create the gap
};

const linkStyle = {
    display: 'block',
    padding: '10px',
    backgroundColor: '#343a40',
    color: 'white',
    textDecoration: 'none',
    marginBottom: '10px',
};

const byLineContainerStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '25px',
};

const linkedinIconStyle = {
    marginLeft: '5px',
    fontSize: '50px',
};

const HomePage = () => {
    return (
        <div style={{ position: 'relative' }}>
            <div style={divStyle}>
                <img src={blackLogo} alt="Logo" className="logo" />
            </div>

            <div style={linkContainerStyle}>
                <div>
                    <Nav.Link as={Link} to="/paceCalculator" style={linkStyle}>
                        Pace Calculator
                    </Nav.Link>
                    <Nav.Link as={Link} to="/iaafCalculator" style={linkStyle}>
                        IAAF Conversion
                    </Nav.Link>
                </div>
                <div>
                    <Nav.Link as={Link} to="/timeCalculator" style={linkStyle}>
                        Time Calculator
                    </Nav.Link>
                    <Nav.Link as={Link} to="/windCalculator" style={linkStyle}>
                        Wind Calculator
                    </Nav.Link>
                </div>
            </div>

            <div style={byLineContainerStyle} className="byline-container">
                <span>By Luke Lambert</span>
                <a
                    href="https://www.linkedin.com/in/luke-lambert-378730232"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FaLinkedin style={linkedinIconStyle} />
                </a>
            </div>
        </div>
    );
};

export default HomePage;
