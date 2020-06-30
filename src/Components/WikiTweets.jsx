import React from 'react';

function getTrendingOnTwitter(location) {
	console.log('inside getTrendingOnTwitter() - location: ', location);

	const request = require('request');
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const twitterUrl = 'https://api.twitter.com/1.1/trends/place.json?id=' + location;

	return new Promise((resolve, reject) => {
		request(
			{
				url: proxyUrl + twitterUrl,
				method: 'GET',
				json: true,
				headers: {
					Authorization: 'Bearer ' + process.env.REACT_APP_TWITTER_BEARER_TOKEN
				}
			},
			function(err, resp, data) {
				let returnValue = data;
				console.log('Promise err: ', err);
				console.log('Promise resp: ', resp);
				console.log('Promise data: ', data);

				if (err) {
					returnValue = err;
				} else if (resp) {
					returnValue = resp;
				} else {
					return data;
				}
			}
		);
	});
}

class WikiTweets extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.getData = this.getData.bind(this);
	}

	handleClick(e, location) {
		e.preventDefault();

		console.log('twitterButton - clicked!');
		// this.props.onTweetSearch('button clicked');

		this.getData(location);
	}
	// Intermediary step since handleClick has to be a function and not an object
	getData = async (location) => {
		console.log('inside getData async - location: ', location);

		const twitData = await getTrendingOnTwitter(location);
		console.log('getData > twitData: ', twitData);
	};

	render(props) {
		console.log('WikiTweets - props.location: ', this.props.location);
		return (
			<div className="wiki-tweets-wrapper">
				<button
					id="twitterButton"
					onClick={(e) => {
						this.handleClick(e, this.props.location);
					}}
				>
					Get Wikipedia results for Top Trending Tweets
				</button>
			</div>
		);
	}
}

export default WikiTweets;
