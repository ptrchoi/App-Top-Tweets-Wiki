import React from 'react';

const cardImg = require('../images/cardImage.png');

function Header(props) {
	return (
		<div className="header-wrapper">
			<h1>Top Tweets Wiki</h1>
			<img className="logoImg" src={cardImg} />
		</div>
	);
}

export default Header;
