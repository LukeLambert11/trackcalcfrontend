import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaLinkedin } from 'react-icons/fa';

const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', // Changed height to minHeight
};

const containerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
};

const linkStyle = {
    display: 'block',
    padding: '10px',
    backgroundColor: '#343a40',
    color: 'white',
    textDecoration: 'none',
};

const byLineContainerStyle = {
    position: 'absolute',
    bottom: '225px', // Adjusted distance from the bottom
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    fontSize: '25px'
};

const linkedinIconStyle = {
    marginLeft: '5px',
    fontSize: '50px',
};

const HomePage = () => {
    return (
        <div style={{ position: 'relative' }}>
            <h1
                style={{
                    marginBottom: '20px', /* Default spacing */
                    marginTop: '18px',

                    /* Adjust spacing for smaller screens */
                    '@media (max-width: 767px)': {
                        marginBottom: '10px', /* Reduced spacing for mobile */
                        marginTop: '10px'
                    }
                }}
            >
                Track Calculator
            </h1>

            <div style={divStyle}>
                <div style={containerStyle}>
                    <div style={linkStyle}>
                        <Nav.Link as={Link} to="/paceCalculator">
                            Pace Calculator
                        </Nav.Link>
                    </div>
                    <div style={linkStyle}>
                        <Nav.Link as={Link} to="/timeCalculator">
                            Time Calculator
                        </Nav.Link>
                    </div>
                    <div style={linkStyle}>
                        <Nav.Link as={Link} to="/iaafCalculator">
                            IAAF Conversion
                        </Nav.Link>
                    </div>
                    <div style={linkStyle}>
                        <Nav.Link as={Link} to="/windCalculator">
                            Wind Calculator
                        </Nav.Link>
                    </div>
                </div>
            </div>

            <div style={byLineContainerStyle}>
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
