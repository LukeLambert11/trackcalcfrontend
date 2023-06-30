import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './paceCalculator/pace-calculator.css';
import axios from "axios";


class PaceCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            distanceUnit: 'miles',
            paceResult: 0
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
                paceResult: null
            });


            // Perform calculations or further actions with the captured data
            const {distance, hours, minutes, seconds, distanceUnit} = this.state;

            //fix for Nan when they get deleted

            // Create the DTO object with the captured data
            const params = {
                distance: distance !== null ? parseFloat(distance) : 0,
                hours: hours !== null ? parseInt(hours) : 0,
                minutes: minutes !== null ? parseInt(minutes) : 0,
                seconds: seconds !== null ? parseFloat(seconds) : 0,
                distanceUnit
            };



            // Validate the captured data
            if (
                params.distance < 0 ||
                params.hours < 0 ||
                params.minutes < 0 ||
                params.seconds < 0
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: distance, hours, minutes, or seconds cannot be negative');
            }

            if (
                params.hours === 0  &&
                params.minutes === 0 &&
                params.seconds === 0
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: time cannot be zero');
            }

            if (
                params.distance === 0 || isNaN(params.distance)
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: distance cannot be zero');
            }





            const response = await axios.get('http://localhost:8080/pace-calculator', { params: params });

            // Update the paceResult in the component's state with the API response
            const { milePace, kilometerPace } = response.data;
            this.setState({ paceResult: { milePace, kilometerPace } });
            console.log(params.distance);
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: error});
        }
    }

    render() {

        const { paceResult, errorMessage} = this.state;

        return (
            <div className="container">
                <h1 className="mb-xxl-5 mt-5">Pace Calculator</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className="mb-custom">
                        <Form.Label className="text-center">
                            Distance Unit
                        </Form.Label>
                        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 2, offset: 0 }} className="text-center">
                            <Form.Control
                                as="select"
                                name="distanceUnit"
                                value={this.state.distanceUnit}
                                onChange={this.handleInputChange}
                                size="sm"
                                style={{ height: '38px', width: '100%' }}
                            >
                                <option value="kilometers">Kilometers</option>
                                <option value="miles">Miles</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-custom">
                        <Form.Label className="text-center">
                            Distance
                        </Form.Label>
                        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 2, offset: 0 }} className="text-center">
                            <Form.Control
                                type="number"
                                name="distance"
                                value={this.state.distance}
                                onChange={this.handleInputChange}
                                size="sm"
                                step="0.1"
                                style={{ height: '38px', width: '100%' }}
                            />
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} className="mb-custom justify-content-center">
                        <Form.Label column sm="3">
                            Time
                        </Form.Label>
                        <Col sm="9">
                            <Row>
                                <Col sm="3"> {/* Adjusted column width to allocate more space */}
                                    <Form.Control
                                        type="number"
                                        name="hours"
                                        value={this.state.hours}
                                        onChange={this.handleInputChange}
                                        placeholder="Hours"
                                        style={{ height: '38px', width: '150px' }}
                                    />
                                </Col>
                                <Col sm="3"> {/* Adjusted column width to allocate more space */}
                                    <Form.Control
                                        type="number"
                                        name="minutes"
                                        value={this.state.minutes}
                                        onChange={this.handleInputChange}
                                        placeholder="Minutes"
                                        style={{ height: '38px', width: '150px' }}
                                    />
                                </Col>
                                <Col sm="3"> {/* Adjusted column width to allocate more space */}
                                    <Form.Control
                                        type="number"
                                        name="seconds"
                                        value={this.state.seconds}
                                        onChange={this.handleInputChange}
                                        placeholder="Seconds"
                                        style={{ height: '38px', width: '150px' }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit">Calculate</Button>


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

export default PaceCalculator;
