import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './paceCalculator/pace-calculator.css';
import axios from "axios";


class PaceCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            hours: null,
            minutes: null,
            seconds: null,
            distanceUnit: 'kilometers'
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {

            // Perform calculations or further actions with the captured data
            const {distance, hours, minutes, seconds, distanceUnit} = this.state;



            // Validate the captured data
            if (
                distance < 0 ||
                hours < 0 ||
                minutes < 0 ||
                seconds < 0
            ) {
                // Throw an error or handle the validation failure accordingly
                console.error('Invalid input: distance, hours, minutes, or seconds cannot be negative');
                return; // Exit the function or component render if needed
            }


            // Create the DTO object with the captured data
            const params = {
                distance: parseFloat(distance),
                hours: hours !== null ? parseInt(hours) : 0,
                minutes: minutes !== null ? parseInt(minutes) : 0,
                seconds: seconds !== null ? parseFloat(seconds) : 0,
                distanceUnit
            };

            const response = await axios.get('http://localhost:8080/pace-calculator', { params: params });

            // Handle the response from the API
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div className="container">
                <h1 className="mb-xxl-5 mt-5">Pace Calculator</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} className="mb-custom justify-content-center">
                        <Form.Label column sm="2" className="text-right">
                            Distance Unit
                        </Form.Label>
                        <Col sm="2">
                            <Form.Control
                                as="select"
                                name="distanceUnit"
                                value={this.state.distanceUnit}
                                onChange={this.handleInputChange}
                                size="sm"
                                style={{ height: '38px', width: '150px' }}
                            >
                                <option value="kilometers">Kilometers</option>
                                <option value="miles">Miles</option>
                            </Form.Control>
                        </Col>
                        <Form.Label column sm="1" className="text-right">
                            Distance
                        </Form.Label>
                        <Col sm="1">
                            <Form.Control
                                type="number"
                                name="distance"
                                value={this.state.distance}
                                onChange={this.handleInputChange}
                                size="sm"
                                step="0.1"
                                style={{ height: '38px', width: '150px' }}
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
            </div>
        );
    }
}

export default PaceCalculator;
