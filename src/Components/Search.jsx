// Libs
import React from 'react';
import $ from 'jquery';
import Autosuggest from 'react-autosuggest';
import { v4 as uuidv4 } from 'uuid';

// Modules
import WikiTweets from './WikiTweets';

// Constants
const MAX_CARDS = 50;
const MAX_SUGGESTIONS = 5;

/* Local Functions
---------------------------------------------------*/
// Get search suggestion results for typed input from Wikipedia API
function getWikiSuggestions(input) {
	const wikiUrl =
		'https://en.wikipedia.org/w/api.php?action=opensearch&suggest=true&format=json&search=' +
		input +
		'&limit=' +
		MAX_SUGGESTIONS +
		'&namespace=0&callback=?';

	return new Promise((resolve, reject) => {
		$.getJSON({
			url: wikiUrl,
			success: resolve,
			error: reject
		});
	});
}

// Get search results from Wikipedia API for given string
function getWikiSearchResults(searchStr, numOfResults = 1) {
	const wikiSearchUrl =
		'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
		searchStr +
		'&limit=' +
		numOfResults +
		'&namespace=0&callback=?';

	return new Promise((resolve, reject) => {
		$.getJSON({
			url: wikiSearchUrl,
			success: resolve,
			error: reject
		});
	});
}

// Get image data related to given string from Wikipedia API
function getWikiImg(str) {
	const wikiImgUrl =
		'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=600&pilimit=1&titles=' +
		str +
		'&callback=?';

	return new Promise((resolve, reject) => {
		$.getJSON({
			url: wikiImgUrl,
			success: resolve,
			error: reject
		});
	});
}

// Format Wikipedia image Data into a simple url
function cleanUpImgData(imgData) {
	let wikiStr = JSON.stringify(imgData);
	let n = wikiStr.search('"original":');
	let start = wikiStr.indexOf('"http') + 1;
	let end = wikiStr.indexOf('"', start);
	let length = end - start;
	let imageURL = '';

	if (n === -1) {
		start = 0;
	}
	if (start <= 1) {
		imageURL = '';
	} else {
		imageURL = wikiStr.substr(start, length);
	}

	return imageURL;
}

// getSuggestionValue() automatically called by Autosuggest: this req'd function teaches Autosuggest what the input value should be when a suggestion value is highlighted.
// Here, we're simply passing the suggestion string back as the input value.
const handleSuggestion = (suggestion) => {
	return suggestion;
};

// Automatically called by Autosuggest: Tells Autosuggest how to render suggestions
const renderSuggestion = (suggestion) => {
	return <div className="renderSuggestionDiv">{suggestion}</div>;
};

/* Search Component
---------------------------------------------------*/
class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			suggestions: [],
			tweetsReady: true
		};

		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
		this.suggestionToWikiSearch = this.suggestionToWikiSearch.bind(this);
		this.handleTweetSearch = this.handleTweetSearch.bind(this);
		this.tweetsToWikiSearch = this.tweetsToWikiSearch.bind(this);
		this.getWikiData = this.getWikiData.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.clearContent = this.clearContent.bind(this);
		this.loadingContent = this.loadingContent.bind(this);
	}

	// Automatically called by Autosuggest's onChange event
	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	// Automatically called by Autosuggest's input event;
	// Async call to Wikipedia API to get suggestions for dropdown list
	onSuggestionsFetchRequested = async ({ value }) => {
		const suggestions = await getWikiSuggestions(value);

		this.setState({
			suggestions: suggestions[1]
		});
	};

	// Automatically called by Autosuggest's input clear event
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	// Optional Autosuggest function: called on selection event (mouse/keyboard/touch) from list; suggestion obj comes from Autosuggest's req'd `handleSuggestion()` method.
	onSuggestionSelected = (e, suggestion) => {
		this.suggestionToWikiSearch(suggestion.suggestion); //Pass in only the suggestion obj's suggestion string
	};

	// Async API calls to collect and format data => updates content to pass to parent with contentType='search'
	suggestionToWikiSearch = async (suggestion) => {
		this.clearContent();
		this.loadingContent('wiki'); //Notify parent contentType='loading'
		const searchResults = await getWikiSearchResults(suggestion, MAX_CARDS);
		const wikiData = await this.getWikiData(searchResults, '');

		this.updateContent(wikiData, 'search'); //Notify parent contentType='search'
	};

	// Handles Tweet-to-Wiki search event from child <WikiTweets />
	handleTweetSearch(tweetsArr) {
		// Set flag to prevent repeated twitter API calls
		this.setState({
			tweetsReady: false
		});

		this.clearContent();
		this.loadingContent('twit');
		this.tweetsToWikiSearch(tweetsArr); //Get Wikipedia results for given tweetsArr
	}

	// Async API calls to search and format Wiki results => updates content to pass to parent with contentType='tweets'
	tweetsToWikiSearch = async (tweetsArr) => {
		let wikiDataForTweets = [];

		// Search for wiki results for each tweet in the tweetsArr
		for (let j = 0; j < tweetsArr.length; j++) {
			// Check if there are any Wikipedia results for the title.
			const searchResult = await getWikiSearchResults(tweetsArr[j].title, 1);

			// If Wikipedia result found, get associated data and wiki image, then add data object to array;
			// Else, add Twitter data and empty Wiki data to obj, then add data object to array.
			if (searchResult[3].length > 0) {
				const wikiData = await this.getWikiData(searchResult, tweetsArr[j].url);
				wikiDataForTweets.push(wikiData[0]);
			} else {
				const twitDataOnly = {
					id: uuidv4(),
					title: tweetsArr[j].title,
					imgSrc: '',
					text: '',
					wikiUrl: '',
					twitUrl: tweetsArr[j].url
				};
				wikiDataForTweets.push(twitDataOnly);
			}
		}
		this.updateContent(wikiDataForTweets, 'tweets');
	};

	// Returns array of formatted Wiki data objs with - unique ID's, image data from Wikipedia API if any, and twitterLink if called by twitter data handler (default is empty string)
	getWikiData = async (data, twitterLink = '') => {
		let tempArr = [];

		// data[1] is the index for the resulting search titles
		for (let i = 0; i < data[1].length; i++) {
			let title = data[1][i];

			let wikiDataObj = {
				id: uuidv4(),
				title: title,
				imgSrc: '',
				text: '',
				wikiUrl: data[3][i],
				twitUrl: twitterLink
			};

			const imgData = await getWikiImg(title);
			wikiDataObj.imgSrc = cleanUpImgData(imgData);
			tempArr[i] = wikiDataObj;
		}
		return tempArr;
	};

	// Notify parent component of new card content
	// contentType = 'clear' || 'loading' || 'search' || 'tweets'
	updateContent(contentArr, contentType) {
		this.props.onSearch(contentArr, contentType);

		// Update 'tweetsReady' status to re-enable Wiki-tweet button
		if (contentType === 'tweets') {
			this.setState({
				tweetsReady: true
			});
		}
	}

	// Clears card contents
	clearContent() {
		this.updateContent([], 'clear');
	}

	// Notify parent component of loading event with content type
	loadingContent(loadingType) {
		let loadingContent = 'loadingWiki';

		if (loadingType === 'twit') loadingContent = 'loadingTwit';

		this.updateContent([], loadingContent);
	}

	render() {
		let { value, suggestions } = this.state;

		// Required by Autosuggest
		// type=search is optional, defaults to type=text
		const inputProps = {
			placeholder: 'or SEARCH any topic from Wikipedia ...',
			value,
			onChange: this.onChange,
			type: 'search'
		};

		return (
			<div className="inputs-wrapper">
				<WikiTweets onTweetSearch={this.handleTweetSearch} tweetsReady={this.state.tweetsReady} />

				<div className="search-wrapper centered-h">
					<i className="fas fa-search search-icon" />
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						onSuggestionSelected={this.onSuggestionSelected}
						getSuggestionValue={handleSuggestion}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
					/>
				</div>
			</div>
		);
	}
}

export default Search;
