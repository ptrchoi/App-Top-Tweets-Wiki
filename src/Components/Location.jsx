// Libs
import React from 'react';

// Image loading for Parcel bundling
const imgUS = require('../images/usa.png');
const imgCA = require('../images/can.png');
const imgMX = require('../images/mex.png');
const imgBR = require('../images/brz.png');
const imgGB = require('../images/gbr.png');
const imgDE = require('../images/ger.png');
const imgES = require('../images/spa.png');
const imgFR = require('../images/fra.png');
const imgIT = require('../images/ita.png');
const imgNE = require('../images/net.png');

// Array of Location objs
const LOCATIONS = [
	{
		id: 'input1',
		city: 'S.F.',
		WOEID: '2487956',
		flagImg: imgUS
	},
	{
		id: 'input2',
		city: 'L.A.',
		WOEID: '2442047',
		flagImg: imgUS
	},
	{
		id: 'input3',
		city: 'HOU',
		WOEID: '2424766',
		flagImg: imgUS
	},
	{
		id: 'input4',
		city: 'CHI',
		WOEID: '2379574',
		flagImg: imgUS
	},
	{
		id: 'input5',
		city: 'N.Y.',
		WOEID: '2459115',
		flagImg: imgUS
	},
	{
		id: 'input6',
		city: 'VAN',
		WOEID: '9807',
		flagImg: imgCA
	},
	{
		id: 'input7',
		city: 'MEX',
		WOEID: '116545',
		flagImg: imgMX
	},
	{
		id: 'input8',
		city: 'RIO',
		WOEID: '455825',
		flagImg: imgBR
	},
	{
		id: 'input9',
		city: 'LON',
		WOEID: '44418',
		flagImg: imgGB
	},
	{
		id: 'input10',
		city: 'AMS',
		WOEID: '727232',
		flagImg: imgNE
	},
	{
		id: 'input11',
		city: 'BER',
		WOEID: '638242',
		flagImg: imgDE
	},
	{
		id: 'input12',
		city: 'PAR',
		WOEID: '615702',
		flagImg: imgFR
	},
	{
		id: 'input13',
		city: 'MAD',
		WOEID: '766273',
		flagImg: imgES
	},
	{
		id: 'input14',
		city: 'ROM',
		WOEID: '721943',
		flagImg: imgIT
	}
];

class Location extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedWOEID: LOCATIONS[0].WOEID // default to first entry = S.F.
		};

		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		// Notify parent of initial default location
		this.props.onLocSelection(this.state.selectedWOEID); // default to first entry = S.F.
	}
	handleChange(e) {
		let selectedLocation = e.target.value;

		// Notify parent of location selection update
		this.props.onLocSelection(selectedLocation);

		this.setState({
			selectedWOEID: selectedLocation
		});
	}

	render() {
		let { selectedWOEID } = this.state;

		// Map through the LOCATIONS array returning a button div for each item to render.
		let renderButtons = () => {
			return LOCATIONS.map((location) => {
				return (
					<div key={location.WOEID} className="selection-wrapper">
						<input
							id={location.id}
							type="radio"
							name="country"
							value={location.WOEID}
							onChange={this.handleChange}
							checked={selectedWOEID === location.WOEID}
						/>
						<label htmlFor={location.id} className="flag-wrapper">
							<img className="flag-image" src={location.flagImg} />
							{location.city}
						</label>
					</div>
				);
			});
		};

		// Return the final rendered array of divs
		return <div className="location-wrapper">{renderButtons()}</div>;
	}
}

export default Location;
