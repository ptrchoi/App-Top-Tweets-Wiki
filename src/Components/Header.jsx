// Libs
import React from 'react';

// Consts
const cardImg = require('../images/cardImage.png');

function Header(props) {
	return (
		<div className="header-wrapper">
			<h1>Top Tweets & Wikis</h1>
			<img className="logoImg" src={cardImg} />
		</div>
	);
}

export default Header;
