import React from 'react';

// Components
import WikiTweets from './WikiTweets';
import Location from './Location';
import Search from './Search';

function Inputs(props) {
	return (
		<div className="inputs-wrapper">
			<WikiTweets />
			<Location />
			<Search />
		</div>
	);
}

export default Inputs;
