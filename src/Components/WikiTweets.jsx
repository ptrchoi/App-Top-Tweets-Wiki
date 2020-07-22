// Libs
import React from 'react';
import $ from 'jquery';

// Modules
import Location from './Location';

/* Local Functions
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
		locationID = 2487956; //default to SF
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

// Grab relevant Twitter data and clean it up
// 	- Remove leading #
//	- Add space to Mixed case strings (ie. BlackLivesMatter => Black Lives Matter)
//  - Get associated URL
function fixTwitterData(data) {
	let cleanedData = [];
	let rawTweets = data[0].trends;

	//Clean up twitter results
	for (let i = 0; i < rawTweets.length; i++) {
		let titleOnly = rawTweets[i].name;
		let url = rawTweets[i].url; // Twitter url associated to title

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
		cleanedData[i] = {
			title: titleOnly,
			url: url
		};
	}
	return cleanedData;
}

/* WikiTweets Component
----------------------------------------------------------- */
class WikiTweets extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			locationID: 1,
			locationName: ''
		};

		this.handleClick = this.handleClick.bind(this);
		this.pauseInput = this.pauseInput.bind(this);
		this.handleLocSelection = this.handleLocSelection.bind(this);
		this.getData = this.getData.bind(this);
	}

	// Handle Tweet-to-Wiki button click
	handleClick(e, tweetsReady) {
		e.preventDefault();

		// Prevent button click events while loading
		this.pauseInput(tweetsReady);
		this.getData(this.state.locationID);
	}

	// Disable/Enable button input while waiting for Async results to load
	pauseInput(pause) {
		$('#twitterButton').prop('disabled', pause);
	}

	// Handle location updates from <Location> component
	handleLocSelection(locationID, locationName) {
		this.setState({
			locationID: locationID,
			locationName: locationName
		});
	}

	// ASYNC - Intermediary step since handleClick has to be a function and not an object
	getData = async (locationID) => {
		const twitData = await getTrendingOnTwitter(locationID);
		let tweets = fixTwitterData(twitData);

		// Notify parent of tweet search content update
		this.props.onTweetSearch(tweets);
	};

	render(props) {
		let { tweetsReady } = this.props;

		// Default button class styling and msg
		let btnClassList = 'main-button';
		let msg = 'SEARCH';

		// Modified button class styling and msg (while loading)
		if (!tweetsReady) {
			btnClassList += ' main-button--inactive';
		}
		return (
			<div className="wiki-tweets-wrapper">
				<p className="description-text">
					Find out what's trending on <span className="text-span text-span--twit">Twitter</span> and learn
					more from <span className="text-span text-span--wiki"> Wikipedia</span>.
					<br /> <br />
					Simply select a city and click SEARCH to view Top Tweets and Wikis.
				</p>
				<Location onLocSelection={this.handleLocSelection} />
				<button
					id="twitterButton"
					className={btnClassList}
					onClick={(e) => {
						this.handleClick(e, tweetsReady);
					}}
				>
					{msg} <br />
					<span id="cityName">{this.state.locationName}</span>
				</button>
			</div>
		);
	}
}

export default WikiTweets;
