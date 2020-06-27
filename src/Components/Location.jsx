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

function getSelectedCountryId() {
	const radioButtons = document.querySelectorAll('input[name="country"]');

	let selectedCountry = 23424977; //Default to USA
	for (const rb of radioButtons) {
		if (rb.checked) {
			selectedCountry = rb.value;
			break;
		}
	}
	console.log('selectedCountry: ', selectedCountry);

	return selectedCountry;
}

function Location(props) {
	return (
		<div className="location-wrapper">
			<input id="input1" type="radio" name="country" value="1" />
			<label for="input1" className="flag-wrapper">
				<img className="flag-image" src={imgGLO} />
				Global
			</label>
			<input id="input2" type="radio" name="country" value="2487956" />
			<label for="input2" className="flag-wrapper">
				<img className="flag-image" src={imgUS} />
				S.F, CA
			</label>
			<input id="input3" type="radio" name="country" value="2357024" />
			<label for="input3" className="flag-wrapper">
				<img className="flag-image" src={imgUS} />
				Atlanta, GA
			</label>
			<input id="input4" type="radio" name="country" value="2459115" />
			<label for="input4" className="flag-wrapper">
				<img className="flag-image" src={imgUS} />
				N.Y., NY
			</label>
			<input id="input5" type="radio" name="country" value="9807" />
			<label for="input5" className="flag-wrapper">
				<img className="flag-image" src={imgCA} />
				Vancouver, CA
			</label>
			<input id="input6" type="radio" name="country" value="116545" />
			<label for="input6" className="flag-wrapper">
				<img className="flag-image" src={imgMX} />
				Mexico City, MX
			</label>
			<input id="input7" type="radio" name="country" value="455825" />
			<label for="input7" className="flag-wrapper">
				<img className="flag-image" src={imgBR} />
				Rio de Janeiro, BR
			</label>
			<input id="input8" type="radio" name="country" value="44418" />
			<label for="input8" className="flag-wrapper">
				<img className="flag-image" src={imgGB} />
				London, GB
			</label>
			<input id="input9" type="radio" name="country" value="638242" />
			<label for="input9" className="flag-wrapper">
				<img className="flag-image" src={imgDE} />
				Berlin, DE
			</label>
			<input id="input10" type="radio" name="country" value="766273" />
			<label for="input10" className="flag-wrapper">
				<img className="flag-image" src={imgES} />
				Madrid, ES
			</label>
			<input id="input11" type="radio" name="country" value="615702" />
			<label for="input11" className="flag-wrapper">
				<img className="flag-image" src={imgFR} />
				Paris, FR
			</label>
			<input id="input12" type="radio" name="country" value="721943" />
			<label for="input12" className="flag-wrapper">
				<img className="flag-image" src={imgIT} />
				Rome, IT
			</label>
			<input id="input13" type="radio" name="country" value="1105779" />
			<label for="input13" className="flag-wrapper">
				<img className="flag-image" src={imgAU} />
				Sydney, AU
			</label>
		</div>
	);
}

export default Location;
