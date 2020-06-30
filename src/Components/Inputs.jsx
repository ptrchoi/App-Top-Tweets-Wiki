import React from 'react';

// Components
import WikiTweets from './WikiTweets';
import Location from './Location';
import Search from './Search';

function Inputs(props) {
	return (
		<div className="inputs-wrapper">
			<WikiTweets location={props.location} onTweetSearch={props.onTweetSearch} />
			<Location onLocation={props.onLocation} />
			<Search onSearch={props.onSearch} />
		</div>
	);
}

export default Inputs;
