import React, {Component} from 'react';
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from "react-select";



class TimeCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialEventGender: 'male',
            convertingEventGender: 'male',
            initialEventEnvironment: 'outdoor',
            convertingEventEnvironment: 'outdoor',
            distance: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            distanceUnit: 'miles',
            timeResult: null
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
                timeResult: null
            });


            // Perform calculations or further actions with the captured data
            const {distance, hours, minutes, seconds, distanceUnit} = this.state;

            //fix for Nan when they get deleted

            // Create the DTO object with the captured data
            const params = {
                distance: (distance !== null)? parseFloat(distance) : 0,
                hourPace: hours !== null ? parseInt(hours) : 0,
                minutePace: minutes !== null ? parseInt(minutes) : 0,
                secondPace: seconds !== null ? parseFloat(seconds) : 0,
                paceUnits: distanceUnit
            };

            if(isNaN(params.distance)){
                params.distance = 0;
            }

            if(isNaN(params.hourPace)){
                params.hourPace = 0;
            }

            if(isNaN(params.minutePace)){
                params.minutePace = 0;
            }

            if(isNaN(params.secondPace)){
                params.secondPace = 0;
            }





            // Validate the captured data
            if (
                params.distance < 0 ||
                params.hourPace < 0 ||
                params.minutePace < 0 ||
                params.secondPace < 0
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: distance, hours, minutes, or seconds cannot be negative');
            }

            if (
                params.hourPace === 0  &&
                params.minutePace === 0 &&
                params.secondPace === 0
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: pace cannot be zero');
            }

            if (
                params.distance === 0
            ) {
                // Throw an error or handle the validation failure accordingly
                throw new Error('Invalid input: distance cannot be zero');
            }





            const response = await axios.get('http://localhost:8080/time-calculator', { params: params });

            // Update the paceResult in the component's state with the API response
            const { time } = response.data;
            this.setState({ timeResult: { time } });
        } catch (error) {
            console.error(error);
            this.setState({ errorMessage: error});
        }
    }

    getEventOptions(selectedGender, selectedEnvironment) {
        const optionsByCombination = {
            male: {
                indoor: [
                    { value: '50', label: '50m' },
                    { value: '50H', label: '50mH' },
                    { value: '55', label: '55m' },
                    { value: '55H', label: '55mH' },
                    { value: '60', label: '60m' },
                    { value: '60H', label: '60mH' },
                    { value: '200', label: '200m' },
                    { value: '300', label: '300m' },
                    { value: '400', label: '400m' },
                    { value: '500', label: '500m' },
                    { value: '600', label: '600m' },
                    { value: '800', label: '800m' },
                    { value: '1000', label: '1000m' },
                    { value: '1500', label: '1500m' },
                    { value: '1MILE', label: '1 Mile' },
                    { value: '2000', label: '2000m' },
                    { value: '3000', label: '3000m' },
                    { value: '2MILES', label: '2 Miles' },
                    { value: '5000', label: '5000m' },
                    { value: '4x200', label: '4x200m' },
                    { value: '4x400', label: '4x400m' },
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'HEPTATHLON', label: 'Heptathlon' }
                ],
                outdoor: [
                    { value: '100', label: '100' },
                    { value: '200', label: '200' },
                    { value: '300', label: '300' },
                    { value: '400', label: '400' },
                    { value: '600', label: '600' },
                    { value: '800', label: '800' },
                    { value: '1000', label: '1000' },
                    { value: '1500', label: '1500' },
                    { value: '1MILE', label: '1 Mile' },
                    { value: '2000', label: '2000' },
                    { value: '3000', label: '3000' },
                    { value: '2MILES', label: '2 Miles' },
                    { value: '5000', label: '5000' },
                    { value: '10000', label: '10000' },
                    { value: '110H', label: '110 H' },
                    { value: '400H', label: '400 H' },
                    { value: '2000SC', label: '2000 SC' },
                    { value: '3000SC', label: '3000 SC' },
                    { value: '4x100', label: '4x100' },
                    { value: '4x200', label: '4x200' },
                    { value: '4x400', label: '4x400' },
                    { value: 'ROAD_10MILES', label: 'Road 10 Miles' },
                    { value: 'ROAD_10KM', label: 'Road 10 km' },
                    { value: 'ROAD_15KM', label: 'Road 15 km' },
                    { value: 'ROAD_20KM', label: 'Road 20 km' },
                    { value: 'ROAD_25KM', label: 'Road 25 km' },
                    { value: 'ROAD_30KM', label: 'Road 30 km' },
                    { value: 'ROAD_100KM', label: 'Road 100 km' },
                    { value: 'ROAD_HALF_MARATHON', label: 'Road Half Marathon' },
                    { value: 'ROAD_MARATHON', label: 'Road Marathon' },
                    { value: 'WALK_3KM', label: 'Walk 3 km' },
                    { value: 'WALK_5KM', label: 'Walk 5 km' },
                    { value: 'WALK_10KM', label: 'Walk 10 km' },
                    { value: 'WALK_20KM', label: 'Walk 20 km' },
                    { value: 'WALK_30KM', label: 'Walk 30 km' },
                    { value: 'WALK_35KM', label: 'Walk 35 km' },
                    { value: 'WALK_50KM', label: 'Walk 50 km' },
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'DISCUS_THROW', label: 'Discus Throw' },
                    { value: 'HAMMER_THROW', label: 'Hammer Throw' },
                    { value: 'JAVELIN_THROW', label: 'Javelin Throw' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'DECATHLON', label: 'Decathlon' }
                ]
            },
            female: {
                indoor: [
                    { value: '50', label: '50m' },
                    { value: '50H', label: '50mH' },
                    { value: '55', label: '55m' },
                    { value: '55H', label: '55mH' },
                    { value: '60', label: '60m' },
                    { value: '60H', label: '60mH' },
                    { value: '200', label: '200m' },
                    { value: '300', label: '300m' },
                    { value: '400', label: '400m' },
                    { value: '500', label: '500m' },
                    { value: '600', label: '600m' },
                    { value: '800', label: '800m' },
                    { value: '1000', label: '1000m' },
                    { value: '1500', label: '1500m' },
                    { value: '1MILE', label: '1 Mile' },
                    { value: '2000', label: '2000m' },
                    { value: '3000', label: '3000m' },
                    { value: '2MILES', label: '2 Miles' },
                    { value: '5000', label: '5000m' },
                    { value: '4x200', label: '4x200m' },
                    { value: '4x400', label: '4x400m' },
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'PENTATHLON', label: 'Pentathlon' }
                ],
                outdoor: [
                    { value: '100', label: '100' },
                    { value: '200', label: '200' },
                    { value: '300', label: '300' },
                    { value: '400', label: '400' },
                    { value: '600', label: '600' },
                    { value: '800', label: '800' },
                    { value: '1000', label: '1000' },
                    { value: '1500', label: '1500' },
                    { value: '1MILE', label: '1 Mile' },
                    { value: '2000', label: '2000' },
                    { value: '3000', label: '3000' },
                    { value: '2MILES', label: '2 Miles' },
                    { value: '5000', label: '5000' },
                    { value: '10000', label: '10000' },
                    { value: '100H', label: '100 H' },
                    { value: '400H', label: '400 H' },
                    { value: '2000SC', label: '2000 SC' },
                    { value: '3000SC', label: '3000 SC' },
                    { value: '4x100', label: '4x100' },
                    { value: '4x200', label: '4x200' },
                    { value: '4x400', label: '4x400' },
                    { value: 'ROAD_10MILES', label: 'Road 10 Miles' },
                    { value: 'ROAD_10KM', label: 'Road 10 km' },
                    { value: 'ROAD_15KM', label: 'Road 15 km' },
                    { value: 'ROAD_20KM', label: 'Road 20 km' },
                    { value: 'ROAD_25KM', label: 'Road 25 km' },
                    { value: 'ROAD_30KM', label: 'Road 30 km' },
                    { value: 'ROAD_100KM', label: 'Road 100 km' },
                    { value: 'ROAD_HALF_MARATHON', label: 'Road Half Marathon' },
                    { value: 'ROAD_MARATHON', label: 'Road Marathon' },
                    { value: 'WALK_3KM', label: 'Walk 3 km' },
                    { value: 'WALK_5KM', label: 'Walk 5 km' },
                    { value: 'WALK_10KM', label: 'Walk 10 km' },
                    { value: 'WALK_20KM', label: 'Walk 20 km' },
                    { value: 'WALK_30KM', label: 'Walk 30 km' },
                    { value: 'WALK_50KM', label: 'Walk 50 km' },
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'DISCUS_THROW', label: 'Discus Throw' },
                    { value: 'HAMMER_THROW', label: 'Hammer Throw' },
                    { value: 'JAVELIN_THROW', label: 'Javelin Throw' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'HEPTATHLON', label: 'Heptathlon' }
                ]
            }
        };

        return optionsByCombination[selectedGender][selectedEnvironment];

    }







    render() {

        const { timeResult, errorMessage} = this.state;

        const divStyle = {
            padding: '1%',
        };




        return (
            <div style={divStyle}>
                <h1 style={{
                    marginBottom: '20px', /* Default spacing */
                    marginTop: '30px',

                    /* Adjust spacing for smaller screens */
                    '@media (maxWidth: 767px)': {
                        marginBottom: '10px', /* Reduced spacing for mobile */
                        marginTop: '10px'
                    }
                }}>IAAF Convertor</h1>

                <Form onSubmit={this.handleSubmit}>

                <div style={{ fontSize: '22px',marginBottom: '20px', /* Default spacing */}}>
                    Initial Event
                </div>

                    <Row className="mb-3">

                        <Col className="d-flex justify-content-center" >
                            <Form.Group>
                                <Form.Label style={{ fontSize: '20px' }}>Gender</Form.Label>

                                <Form.Check
                                type="radio"
                                label="male"
                                id="initialeventmale"
                                defaultChecked
                                checked={this.state.initialEventGender === 'male'}
                                onChange={() => this.setState({ initialEventGender: 'male' })}
                            />
                            <Form.Check
                                type="radio"
                                label="female"
                                id="initialeventfemale"
                                checked={this.state.initialEventGender === 'female'}
                                onChange={() => this.setState({ initialEventGender: 'female' })}
                            />
                            </Form.Group>

                        </Col>

                        <Col className="d-flex justify-content-center" >
                            <Form.Group>
                                <Form.Label style={{ fontSize: '20px' }}>Environment</Form.Label>

                                <Form.Check
                                    type="radio"
                                    label="outdoor"
                                    id="intialeventoutdoor"
                                    style={{ marginRight: '10px' }}
                                    defaultChecked
                                    checked={this.state.initialEventEnvironment === 'outdoor'}
                                    onChange={() => this.setState({ initialEventEnvironment: 'outdoor' })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="indoor"
                                    id="initialeventindoor"
                                    style={{ marginRight: '10px' }}
                                    checked={this.state.initialEventEnvironment === 'indoor'}
                                    onChange={() => this.setState({ initialEventEnvironment: 'indoor' })}
                                />
                            </Form.Group>

                        </Col>

                        <Col className="d-flex justify-content-center">
                            <div>
                                <div
                                    style={{
                                        margin: '0 auto'}}>
                                    <Form.Label style={{ fontSize: '20px' }}>Event</Form.Label>
                                </div>
                                <Select

                                    options={this.getEventOptions(this.state.initialEventGender, this.state.initialEventEnvironment)} // Pass the gender and environment values
                                    placeholder="Select event"
                                    //styles={selectStyles}
                                    onChange={(e) => {
                                        this.setState({ event: e.value });
                                    }}
                                />
                            </div>
                        </Col>




                    </Row>

                    <div style={{ fontSize: '22px',marginBottom: '20px', marginTop: '40px'/* Default spacing */}}>
                        Converting Event
                    </div>

                    <Row className="mb-3">

                        <Col className="d-flex justify-content-center" >
                            <Form.Group>
                                <Form.Label style={{ fontSize: '20px' }}>Gender</Form.Label>

                                <Form.Check
                                    type="radio"
                                    label="male"
                                    id="convertingeventmale"
                                    defaultChecked
                                    checked={this.state.convertingEventGender === 'male'}
                                    onChange={() => this.setState({ convertingEventGender: 'male' })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="female"
                                    id="convertingeventfemale"
                                    checked={this.state.convertingEventGender === 'female'}
                                    onChange={() => this.setState({ convertingEventGender: 'female' })}
                                />
                            </Form.Group>

                        </Col>

                        <Col className="d-flex justify-content-center" >
                            <Form.Group>
                                <Form.Label style={{ fontSize: '20px' }}>Environment</Form.Label>

                                <Form.Check
                                    type="radio"
                                    label="outdoor"
                                    id="convertingeventoutdoor"
                                    style={{ marginRight: '10px' }}
                                    defaultChecked
                                    checked={this.state.convertingEventEnvironment === 'outdoor'}
                                    onChange={() => this.setState({ convertingEventEnvironment: 'outdoor' })}
                                />
                                <Form.Check
                                    type="radio"
                                    label="indoor"
                                    id="convertingeventindoor"
                                    style={{ marginRight: '10px' }}
                                    checked={this.state.convertingEventEnvironment === 'indoor'}
                                    onChange={() => this.setState({ convertingEventEnvironment: 'indoor' })}
                                />
                            </Form.Group>

                        </Col>

                        <Col className="d-flex justify-content-center">
                            <div>
                                <div
                                    style={{
                                        margin: '0 auto'}}>
                                    <Form.Label style={{ fontSize: '20px' }}>Event</Form.Label>
                                </div>
                                <Select

                                    options={this.getEventOptions(this.state.convertingEventGender, this.state.convertingEventEnvironment)} // Pass the gender and environment values
                                    placeholder="Select event"
                                    //styles={selectStyles}
                                    onChange={(e) => {
                                        this.setState({ event: e.value });
                                    }}
                                />
                            </div>
                        </Col>




                    </Row>


                    <Button variant="primary" type="submit">
                        Calculate
                    </Button>
                </Form>


                {errorMessage && <p className="error-message" style={{fontSize: '20px', marginTop: '50px' }}>{errorMessage.toString()}</p>}

                {/* Display the paceResult at the bottom of the webpage */}
                {timeResult && (
                    <div style={{fontSize: '20px', marginTop: '50px' }}>
                        <h2>Time Result:</h2>
                        <p>Time: {timeResult.time}</p>
                    </div>
                )}


            </div>
        );
    }
}



export default TimeCalculator;

