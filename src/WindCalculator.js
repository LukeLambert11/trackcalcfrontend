import React, {Component} from 'react';
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from 'react-select';
import './mobilestyles.css';


class WindCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {

            event: '',
            performance: 0,
            wind: 0,
            windResult: null
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        try {

            this.setState({
                errorMessage: '',
                windResult: null
            });


            // Perform calculations or further actions with the captured data
            const {event, performance} = this.state;

            //fix for Nan when they get deleted

            // Create the DTO object with the captured data
            const params = {
                performance: (performance !== null)? parseFloat(performance) : 0,
                event
            };

            if(isNaN(params.performance)){
                params.performance = 0;
            }

            if(isNaN(params.event)){
                params.event = '';
            }






            // Validate the captured data
            if (
               params.performance < 0
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: performance must be greater than zero');
            }

            if (
                params.event === ''
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: select an event');
            }



            const response = await axios.get('http://localhost:8080/wind-calculator', { params: params });

            // Update the paceResult in the component's state with the API response
            const {convertedPerformance} = response.data;
            this.setState({ windResult: { convertedPerformance} });
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: error});
        }
    }






    render() {

        const { paceResult, errorMessage} = this.state;




        const selectStyles = {
            control: (provided) => ({
                ...provided,
                width: '160px', // Set the desired width here
            }),
            menu: (provided) => ({
                ...provided,
                width: '160px', // Set the desired width here
            }),
        };

        //make so the widths above depend on the screen size

        return (
            <div>
                <h1 className="responsive-heading">Wind Calculator </h1>


                <Form onSubmit={this.handleSubmit}>
                    <Row className="mb-3">

                        <Col>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <div
                                    style={{
                                        alignSelf: 'center',
                                        width: '97%',
                                    }}
                                >
                                    <Form.Label style={{ fontSize: '20px' }}>Event</Form.Label>
                                </div>
                            <Select
                                options={[
                                    { value: '100', label: '100 m' },
                                    { value: '200', label: '200 m' },
                                    { value: '100/100H', label: '100/110 H' },
                                    { value: 'LONG_JUMP', label: 'Long Jump' },
                                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' }
                                ]}
                                placeholder="Select an option"
                                styles={selectStyles}
                                onChange={(e) => {
                                    this.setState({ event: e.value });
                                }}
                            />
                            </div>
                        </Col>

                        <Form.Group as={Col} controlId="formGridSeconds">
                            <div>
                                <Form.Label style={{ fontSize: '20px' }}>Time</Form.Label>
                            </div>
                            <Form.Control
                                style={{width: '97%'}}
                                type="text"
                                pattern="[0-9]*(\.[0-9]*)?"
                                inputMode="decimal"
                                placeholder="seconds or meters"
                                value={this.state.performance || ''}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numericValue = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric and non-decimal characters
                                    this.setState({ performance: numericValue });
                                }}
                            />
                        </Form.Group>
                    </Row>


                    <Button variant="primary" type="submit">
                        Calculate
                    </Button>
                </Form>


                {errorMessage && <p className="error-message" style={{fontSize: '20px', marginTop: '50px' }}>{errorMessage.toString()}</p>}

                {/* Display the paceResult at the bottom of the webpage */}
                {paceResult && (
                    <div style={{fontSize: '20px', marginTop: '50px' }}>
                        <h2>Pace Result:</h2>
                        <p>Mile Pace: {paceResult.milePace}</p>
                        <p>Kilometer Pace: {paceResult.kilometerPace}</p>
                    </div>
                )}


            </div>
        );
    }
}

export default WindCalculator;