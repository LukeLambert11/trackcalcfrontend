import React, {Component} from 'react';
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";



    class TimeCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            hours: null,
            minutes: null,
            seconds: null,
            distanceUnit: 'miles',
            paceResult: null
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
        return (
            <div>
                <h1 style={{
                    marginBottom: '30px', /* Default spacing */
                    marginTop: '30px',

                    /* Adjust spacing for smaller screens */
                    '@media (max-width: 767px)': {
                        marginBottom: '10px', /* Reduced spacing for mobile */
                        marginTop: '10px'
                    }
                }}>Pace Calculator 2.0</h1>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">

                        <Form.Label className="ml-2">Pace Unit</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                label="miles"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                style={{ display: 'flex', alignItems: 'center'}}
                            />

                            <Form.Check
                                type="radio"
                                label="kilometers"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                style={{ display: 'flex', alignItems: 'center' }}
                            />
                        </div>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        );
    }
}

export default TimeCalculator;