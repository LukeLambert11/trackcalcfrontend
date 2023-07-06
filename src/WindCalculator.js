import React, {Component} from 'react';
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from 'react-select';
import './mobilestyles.css';


class WindCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
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
                distance: (distance !== null)? parseFloat(distance) : 0,
                hours: hours !== null ? parseInt(hours) : 0,
                minutes: minutes !== null ? parseInt(minutes) : 0,
                seconds: seconds !== null ? parseFloat(seconds) : 0,
                distanceUnit
            };

            if(isNaN(params.distance)){
                params.distance = 0;
            }

            if(isNaN(params.hours)){
                params.hours = 0;
            }

            if(isNaN(params.minutes)){
                params.minutes = 0;
            }

            if(isNaN(params.seconds)){
                params.seconds = 0;
            }





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
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: error});
        }
    }






    render() {

        const { paceResult, errorMessage} = this.state;


        const divStyle = {
            padding: '1%',
        };

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
                                    { value: 'option2', label: '100/110 H' },
                                    { value: 'option3', label: '200 m' }
                                ]}
                                placeholder="Select an option"
                                styles={selectStyles}
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
                                pattern="[0-9]*(\.[0-9])?"
                                inputMode="decimal"
                                placeholder="seconds or meters"
                                value={this.state.seconds || ''}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numericValue = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric and non-decimal characters
                                    this.setState({ seconds: numericValue });
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