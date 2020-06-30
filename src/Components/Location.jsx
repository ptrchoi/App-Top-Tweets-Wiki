import React from 'react';

// Image loading for Parcel bundling
const imgGLO = require('../images/globe.png');
const imgUS = require('../images/usa.png');
const imgCA = require('../images/can.png');
const imgMX = require('../images/mex.png');
const imgBR = require('../images/brz.png');
const imgGB = require('../images/gbr.png');
const imgDE = require('../images/ger.png');
const imgES = require('../images/spa.png');
const imgFR = require('../images/fra.png');
const imgIT = require('../images/ita.png');
const imgAU = require('../images/aus.png');

class Location extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '1'
		};

		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		let selectedLocation = e.target.value;

		this.props.onLocSelection(selectedLocation);
		this.setState({
			selectedOption: selectedLocation
		});
	}

	render() {
		let { selectedOption } = this.state;
		console.log('selectedOption: ', selectedOption);

		return (
			<div className="location-wrapper">
				<input
					id="input1"
					type="radio"
					name="country"
					value="1"
					onChange={this.handleChange}
					checked={selectedOption === '1'}
				/>
				<label htmlFor="input1" className="flag-wrapper">
					<img className="flag-image" src={imgGLO} />
					Global
				</label>
				<input
					id="input2"
					type="radio"
					name="country"
					value="2487956"
					onChange={this.handleChange}
					checked={selectedOption === '2487956'}
				/>
				<label htmlFor="input2" className="flag-wrapper">
					<img className="flag-image" src={imgUS} />
					S.F, CA
				</label>
				<input
					id="input3"
					type="radio"
					name="country"
					value="2357024"
					onChange={this.handleChange}
					checked={selectedOption === '2357024'}
				/>
				<label htmlFor="input3" className="flag-wrapper">
					<img className="flag-image" src={imgUS} />
					Atlanta, GA
				</label>
				<input
					id="input4"
					type="radio"
					name="country"
					value="2459115"
					onChange={this.handleChange}
					checked={selectedOption === '2459115'}
				/>
				<label htmlFor="input4" className="flag-wrapper">
					<img className="flag-image" src={imgUS} />
					N.Y., NY
				</label>
				<input
					id="input5"
					type="radio"
					name="country"
					value="9807"
					onChange={this.handleChange}
					checked={selectedOption === '9807'}
				/>
				<label htmlFor="input5" className="flag-wrapper">
					<img className="flag-image" src={imgCA} />
					Vancouver, CA
				</label>
				<input
					id="input6"
					type="radio"
					name="country"
					value="116545"
					onChange={this.handleChange}
					checked={selectedOption === '116545'}
				/>
				<label htmlFor="input6" className="flag-wrapper">
					<img className="flag-image" src={imgMX} />
					Mexico City, MX
				</label>
				<input
					id="input7"
					type="radio"
					name="country"
					value="455825"
					onChange={this.handleChange}
					checked={selectedOption === '455825'}
				/>
				<label htmlFor="input7" className="flag-wrapper">
					<img className="flag-image" src={imgBR} />
					Rio de Janeiro, BR
				</label>
				<input
					id="input8"
					type="radio"
					name="country"
					value="44418"
					onChange={this.handleChange}
					checked={selectedOption === '44418'}
				/>
				<label htmlFor="input8" className="flag-wrapper">
					<img className="flag-image" src={imgGB} />
					London, GB
				</label>
				<input
					id="input9"
					type="radio"
					name="country"
					value="638242"
					onChange={this.handleChange}
					checked={selectedOption === '638242'}
				/>
				<label htmlFor="input9" className="flag-wrapper">
					<img className="flag-image" src={imgDE} />
					Berlin, DE
				</label>
				<input
					id="input10"
					type="radio"
					name="country"
					value="766273"
					onChange={this.handleChange}
					checked={selectedOption === '766273'}
				/>
				<label htmlFor="input10" className="flag-wrapper">
					<img className="flag-image" src={imgES} />
					Madrid, ES
				</label>
				<input
					id="input11"
					type="radio"
					name="country"
					value="615702"
					onChange={this.handleChange}
					checked={selectedOption === '615702'}
				/>
				<label htmlFor="input11" className="flag-wrapper">
					<img className="flag-image" src={imgFR} />
					Paris, FR
				</label>
				<input
					id="input12"
					type="radio"
					name="country"
					value="721943"
					onChange={this.handleChange}
					checked={selectedOption === '721943'}
				/>
				<label htmlFor="input12" className="flag-wrapper">
					<img className="flag-image" src={imgIT} />
					Rome, IT
				</label>
				<input
					id="input13"
					type="radio"
					name="country"
					value="1105779"
					onChange={this.handleChange}
					checked={selectedOption === '1105779'}
				/>
				<label htmlFor="input13" className="flag-wrapper">
					<img className="flag-image" src={imgAU} />
					Sydney, AU
				</label>
			</div>
		);
	}
}

export default Location;
