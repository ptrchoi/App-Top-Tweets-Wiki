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

class Location extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedOption: '2487956' // default to SF
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
		// console.log('selectedOption: ', selectedOption);

		return (
			<div className="location-wrapper">
				{/* <div className="selection-wrapper">
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
						ALL
					</label>
				</div> */}
				<div className="selection-wrapper">
					<input
						id="input1"
						type="radio"
						name="country"
						value="2487956"
						onChange={this.handleChange}
						checked={selectedOption === '2487956'}
					/>
					<label htmlFor="input1" className="flag-wrapper">
						<img className="flag-image" src={imgUS} />
						S.F.
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input2"
						type="radio"
						name="country"
						value="2442047"
						onChange={this.handleChange}
						checked={selectedOption === '2442047'}
					/>
					<label htmlFor="input2" className="flag-wrapper">
						<img className="flag-image" src={imgUS} />
						L.A.
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input3"
						type="radio"
						name="country"
						value="2424766"
						onChange={this.handleChange}
						checked={selectedOption === '2424766'}
					/>
					<label htmlFor="input3" className="flag-wrapper">
						<img className="flag-image" src={imgUS} />
						HOU
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input4"
						type="radio"
						name="country"
						value="2379574"
						onChange={this.handleChange}
						checked={selectedOption === '2379574'}
					/>
					<label htmlFor="input4" className="flag-wrapper">
						<img className="flag-image" src={imgUS} />
						CHI
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input5"
						type="radio"
						name="country"
						value="2459115"
						onChange={this.handleChange}
						checked={selectedOption === '2459115'}
					/>
					<label htmlFor="input5" className="flag-wrapper">
						<img className="flag-image" src={imgUS} />
						N.Y.
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input6"
						type="radio"
						name="country"
						value="9807"
						onChange={this.handleChange}
						checked={selectedOption === '9807'}
					/>
					<label htmlFor="input6" className="flag-wrapper">
						<img className="flag-image" src={imgCA} />
						VAN
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input7"
						type="radio"
						name="country"
						value="116545"
						onChange={this.handleChange}
						checked={selectedOption === '116545'}
					/>
					<label htmlFor="input7" className="flag-wrapper">
						<img className="flag-image" src={imgMX} />
						MEX
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input8"
						type="radio"
						name="country"
						value="455825"
						onChange={this.handleChange}
						checked={selectedOption === '455825'}
					/>
					<label htmlFor="input8" className="flag-wrapper">
						<img className="flag-image" src={imgBR} />
						RIO
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input9"
						type="radio"
						name="country"
						value="44418"
						onChange={this.handleChange}
						checked={selectedOption === '44418'}
					/>
					<label htmlFor="input9" className="flag-wrapper">
						<img className="flag-image" src={imgGB} />
						LON
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input10"
						type="radio"
						name="country"
						value="727232"
						onChange={this.handleChange}
						checked={selectedOption === '727232'}
					/>
					<label htmlFor="input10" className="flag-wrapper">
						<img className="flag-image" src={imgNE} />
						AMS
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input11"
						type="radio"
						name="country"
						value="638242"
						onChange={this.handleChange}
						checked={selectedOption === '638242'}
					/>
					<label htmlFor="input11" className="flag-wrapper">
						<img className="flag-image" src={imgDE} />
						BER
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input12"
						type="radio"
						name="country"
						value="615702"
						onChange={this.handleChange}
						checked={selectedOption === '615702'}
					/>
					<label htmlFor="input12" className="flag-wrapper">
						<img className="flag-image" src={imgFR} />
						PAR
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input13"
						type="radio"
						name="country"
						value="766273"
						onChange={this.handleChange}
						checked={selectedOption === '766273'}
					/>
					<label htmlFor="input13" className="flag-wrapper">
						<img className="flag-image" src={imgES} />
						MAD
					</label>
				</div>
				<div className="selection-wrapper">
					<input
						id="input14"
						type="radio"
						name="country"
						value="721943"
						onChange={this.handleChange}
						checked={selectedOption === '721943'}
					/>
					<label htmlFor="input14" className="flag-wrapper">
						<img className="flag-image" src={imgIT} />
						ROM
					</label>
				</div>
			</div>
		);
	}
}

export default Location;
