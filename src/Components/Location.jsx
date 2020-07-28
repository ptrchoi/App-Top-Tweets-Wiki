// Libs
import React from 'react';

// Image loading for Parcel bundling
const imgUS = require('../images/usa.png');
const imgCA = require('../images/can.png');
const imgBR = require('../images/brz.png');
const imgGB = require('../images/gbr.png');
const imgDE = require('../images/ger.png');
const imgES = require('../images/spa.png');
const imgFR = require('../images/fra.png');
const imgIT = require('../images/ita.png');

// Array of Location objs
const LOCATIONS = [
	{
		id: 'input1',
		cityAbb: 'S.F.',
		cityFull: 'San Francisco, California',
		WOEID: '2487956',
		flagImg: imgUS
	},
	{
		id: 'input2',
		cityAbb: 'L.A.',
		cityFull: 'Los Angeles, California',
		WOEID: '2442047',
		flagImg: imgUS
	},
	{
		id: 'input3',
		cityAbb: 'HOU',
		cityFull: 'Houston, Texas',
		WOEID: '2424766',
		flagImg: imgUS
	},
	{
		id: 'input4',
		cityAbb: 'CHI',
		cityFull: 'Chicago, Illinois',
		WOEID: '2379574',
		flagImg: imgUS
	},
	{
		id: 'input5',
		cityAbb: 'N.Y.',
		cityFull: 'New York City, New York',
		WOEID: '2459115',
		flagImg: imgUS
	},
	{
		id: 'input6',
		cityAbb: 'VAN',
		cityFull: 'Vancouver, British Columbia',
		WOEID: '9807',
		flagImg: imgCA
	},
	{
		id: 'input7',
		cityAbb: 'RIO',
		cityFull: 'Rio de Janeiro, Brazil',
		WOEID: '455825',
		flagImg: imgBR
	},
	{
		id: 'input8',
		cityAbb: 'LON',
		cityFull: 'London, England',
		WOEID: '44418',
		flagImg: imgGB
	},
	{
		id: 'input9',
		cityAbb: 'BER',
		cityFull: 'Berlin, Germany',
		WOEID: '638242',
		flagImg: imgDE
	},
	{
		id: 'input10',
		cityAbb: 'PAR',
		cityFull: 'Paris, France',
		WOEID: '615702',
		flagImg: imgFR
	},
	{
		id: 'input11',
		cityAbb: 'MAD',
		cityFull: 'Madrid, Spain',
		WOEID: '766273',
		flagImg: imgES
	},
	{
		id: 'input12',
		cityAbb: 'ROM',
		cityFull: 'Rome, Italy',
		WOEID: '721943',
		flagImg: imgIT
	}
];

const getCityNameForID = (id) => {
	return LOCATIONS.find((item) => {
		if (item.WOEID === id) return item;
	}).cityFull;
};

class Location extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedWOEID: LOCATIONS[0].WOEID // initialize location to default (S.F.)
		};

		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		const defaultID = this.state.selectedWOEID;
		// Notify parent of initial default location (S.F.)
		this.props.onLocSelection(defaultID, getCityNameForID(defaultID));
	}
	handleChange(e) {
		let selectedWOEID = e.target.value;

		// Notify parent of location selection update
		this.props.onLocSelection(selectedWOEID, getCityNameForID(selectedWOEID));

		this.setState({
			selectedWOEID: selectedWOEID
		});
	}

	render() {
		let { selectedWOEID } = this.state;

		// Map through the LOCATIONS array returning a button div for each item to render.
		let renderButtons = () => {
			return LOCATIONS.map((location) => {
				return (
					<div key={location.WOEID}>
						<input
							id={location.id}
							type="radio"
							name="country"
							value={location.WOEID}
							onChange={this.handleChange}
							checked={selectedWOEID === location.WOEID}
						/>
						<label htmlFor={location.id} className="button-wrapper">
							<img className="flag-image" src={location.flagImg} />
							{location.cityAbb}
						</label>
					</div>
				);
			});
		};

		// Return the final rendered array of divs
		return <div className="location-container">{renderButtons()}</div>;
	}
}

export default Location;
