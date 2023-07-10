import React, {Component} from 'react';
import axios from "axios";
import {Button, Col, Form, Row} from "react-bootstrap";
import Select from "react-select";

//TODO fix the DTO being passed to back end and just do testing to get it working


class TimeCalculator extends Component {
    constructor(props) {
        super(props);
        this.isTrackEvent = this.isTrackEvent.bind(this);
        this.state = {
            initialEventGender: 'male',
            convertingEventGender: 'male',
            initialEventEnvironment: 'outdoor',
            convertingEventEnvironment: 'outdoor',
            initialEvent: '',
            convertingEvent: '',
            initialEventHours: 0,
            initialEventMinutes: 0,
            initialEventSeconds: 0,
            initialEventScore: 0,
            ConvertedResult: null
        };
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        try {

            this.setState({
                errorMessage: '',
                ConvertedResult: null
            });


            // Perform calculations or further actions with the captured data
            const {initialEventGender, convertingEventGender, initialEventEnvironment, convertingEventEnvironment,
                convertingEventHours, convertingEventMinutes, convertingEventSeconds,
                convertingEventScore, initialEvent, convertingEvent} = this.state;


            // Create the DTO object with the captured data
            // Create the DTO object with the captured data
            const params = {};

            if (this.isTrackEvent()) {
                params.initialPerformance = null;
                params.isField = false;
                params.hours = parseInt(convertingEventHours);
                params.minutes = parseInt(convertingEventMinutes);
                params.seconds = parseFloat(convertingEventSeconds);

            } else {
                params.hours = null;
                params.minutes = null;
                params.seconds = null;
                params.isField = false;
                params.initialPerformance = convertingEventScore;
            }

// Set other parameters as needed
            params.initialGender = initialEventGender;
            params.convertingGender = convertingEventGender;
            params.initialLocation = initialEventEnvironment;
            params.convertingLocation = convertingEventEnvironment;
            params.initialEvent = initialEvent;
            params.convertingEvent = convertingEvent;



            if(!params.isField){
                if((isNaN(params.hours) || params.hours === 0) && (isNaN(params.minutes) || params.minutes ===0)
                    &&  (isNaN(params.seconds) || params.seconds === 0)){
                    throw new Error('Invalid input: distance, hours, minutes, or seconds must be greater than zero');
                }
                }
            else{
                if(isNaN(params.initialPerformance) || params.initialPerformance === 0){
                    throw new Error('Invalid input: score must be greater than zero');
                }
            }

            if((params.initialEvent === ('')|| params.initialEvent === null) &&
                (params.convertingEvent === ('')|| params.convertingEvent === null)){
                throw new Error('Invalid input: initial event and converting event must be selected');
            }




            const response = await axios.get('http://localhost:8080/equivalent-performance-calculator', { params: params });

            // Update the paceResult in the component's state with the API response
            const { convertedPerformance } = response.data;
            this.setState({ ConvertedResult: { convertedPerformance } });
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
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'HEPTATHLON', label: 'Heptathlon' },
                    { value: '4x200', label: '4x200m' },
                    { value: '4x400', label: '4x400m' }
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
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'DISCUS_THROW', label: 'Discus Throw' },
                    { value: 'HAMMER_THROW', label: 'Hammer Throw' },
                    { value: 'JAVELIN_THROW', label: 'Javelin Throw' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'DECATHLON', label: 'Decathlon' },
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
                    { value: 'WALK_50KM', label: 'Walk 50 km' }
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
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'PENTATHLON', label: 'Pentathlon' },
                    { value: '4x200', label: '4x200m' },
                    { value: '4x400', label: '4x400m' }
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
                    { value: 'HIGH_JUMP', label: 'High Jump' },
                    { value: 'LONG_JUMP', label: 'Long Jump' },
                    { value: 'TRIPLE_JUMP', label: 'Triple Jump' },
                    { value: 'DISCUS_THROW', label: 'Discus Throw' },
                    { value: 'HAMMER_THROW', label: 'Hammer Throw' },
                    { value: 'JAVELIN_THROW', label: 'Javelin Throw' },
                    { value: 'POLE_VAULT', label: 'Pole Vault' },
                    { value: 'SHOT_PUT', label: 'Shot Put' },
                    { value: 'HEPTATHLON', label: 'Heptathlon' },
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
                    { value: 'WALK_50KM', label: 'Walk 50 km' }
                ]
            }
        };

        return optionsByCombination[selectedGender][selectedEnvironment];

    }


    isTrackEvent() {
        const { initialEvent } = this.state;
        const fieldEvents = ['HIGH_JUMP', 'LONG_JUMP', 'TRIPLE_JUMP', 'DISCUS_THROW', 'HAMMER_THROW',
            'JAVELIN_THROW', 'POLE_VAULT', 'SHOT_PUT', 'HEPTATHLON', 'PENTATHLON', 'DECATHLON'];

        // Check if the selected event is in the list of field events
        return  !fieldEvents.includes(initialEvent);
    }






    render() {

        const { ConvertedResult, errorMessage} = this.state;

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
                                    onChange={(e) => {
                                        this.setState({ initialEvent: e.value });
                                    }}
                                />
                            </div>
                        </Col>




                    </Row>

                    <div style={{ fontSize: '22px',marginBottom: '20px', marginTop: '40px'/* Default spacing */}}>
                        Performance
                    </div>

                    <Row className="mb-3">
                        {this.isTrackEvent() ? (
                            <>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="text"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        placeholder="Hours"
                                        value={this.state.initialEventHours || ''}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
                                            this.setState({ initialEventHours: numericValue });
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Control
                                        type="text"
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                        placeholder="Minutes"
                                        value={this.state.initialEventMinutes || ''}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
                                            this.setState({ initialEventMinutes: numericValue });
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Control
                                        type="text"
                                        pattern="[0-9]*(\.[0-9]*)?"
                                        inputMode="decimal"
                                        placeholder="Seconds"
                                        value={this.state.initialEventSeconds || ''}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            const numericValue = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric and non-decimal characters
                                            this.setState({ initialEventSeconds: numericValue });
                                        }}
                                    />
                                </Form.Group>
                            </>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <div className="col-12 col-md-4">
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            pattern="[0-9]*(\.[0-9]*)?"
                                            inputMode="decimal"
                                            placeholder="Meters or Score"
                                            value={this.state.initialEventScore || ''}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const numericValue = inputValue.replace(/[^\d.]/g, ''); // Remove non-numeric and non-decimal characters
                                                this.setState({ initialEventScore: numericValue });
                                            }}
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        )}
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
                                        this.setState({ convertingEvent: e.value });
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
                {ConvertedResult && (
                    <div style={{fontSize: '20px', marginTop: '50px' }}>
                        <h2>Time Result:</h2>
                        <p>Time: {ConvertedResult.time}</p>
                    </div>
                )}


            </div>
        );
    }
}



export default TimeCalculator;

