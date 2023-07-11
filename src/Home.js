import React, {Component} from 'react';

class Home extends Component {
    render() {

        const divStyle = {
            padding: '1%',
        };

        return (
            <div style={divStyle}>
                <h1 style={{
                    marginBottom: '20px', /* Default spacing */
                    marginTop: '18px',

                    /* Adjust spacing for smaller screens */
                    '@media (maxWidth: 767px)': {
                        marginBottom: '10px', /* Reduced spacing for mobile */
                        marginTop: '10px'
                    }
                }}>Track Calculator</h1>






            </div>
        );
    }
}

export default Home;