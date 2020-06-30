import React from 'react';

/* Functions
------------------------------------------------------*/
// The splice() method changes the content of a string by removing a range of characters and/or adding new characters.
if (!String.prototype.splice) {
	String.prototype.splice = function(start, delCount, newSubStr) {
		return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
	};
}

// Get top 50 trending tweets by locationID
function getTrendingOnTwitter(locationID) {
	if (isNaN(locationID) || locationID <= 0) {
		locationID = 1;
	}

	const request = require('request');
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const twitterUrl = 'https://api.twitter.com/1.1/trends/place.json?id=' + locationID;

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
				if (err) {
					reject(err);
				}
				resolve(data);
			}
		);
	});
}

function parseTwitterData(data) {
	let cleanedData = [];
	let rawTweets = data[0].trends;

	//Clean up twitter results
	for (let i = 0; i < rawTweets.length; i++) {
		let titleOnly = rawTweets[i].name;

		// Remove any leading hashtag
		if (titleOnly[0] === '#') {
			titleOnly = titleOnly.slice(1);
		}

		// Add spaces for mixed case
		for (let k = 0; k < titleOnly.length - 1; k++) {
			let char = titleOnly[k];
			let nextChar = titleOnly[k + 1];

			// For English characters only...
			let englishCharset = /^[A-Za-z]*$/;

			if (
				englishCharset.test(char) &&
				englishCharset.test(nextChar) &&
				(char === char.toLowerCase() && nextChar === nextChar.toUpperCase())
			) {
				String.prototype.splice = function(idx, rem, str) {
					return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
				};

				titleOnly = titleOnly.splice(k + 1, 0, ' ');
			}
		}
		cleanedData[i] = titleOnly;
	}
	return cleanedData;
}

class WikiTweets extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.getData = this.getData.bind(this);
	}

	handleClick(e, locationID) {
		e.preventDefault();

		this.getData(locationID);
	}
	// ASYNC - Intermediary step since handleClick has to be a function and not an object
	getData = async (locationID) => {
		const twitData = await getTrendingOnTwitter(locationID);
		let tweets = parseTwitterData(twitData);
		// console.log('tweets: ', tweets);
		this.props.onTweetSearch(tweets);
	};

	render(props) {
		return (
			<div className="wiki-tweets-wrapper">
				<button
					id="twitterButton"
					onClick={(e) => {
						this.handleClick(e, this.props.locationID);
					}}
				>
					Get Wikipedia results for Top Trending Tweets
				</button>
			</div>
		);
	}
}

export default WikiTweets;
