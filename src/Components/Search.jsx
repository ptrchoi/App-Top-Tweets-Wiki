import React from 'react';
import $ from 'jquery';
import Autosuggest from 'react-autosuggest';

import WikiTweets from './WikiTweets';

const MAX_CARDS = 9;
const MAX_SUGGESTIONS = 5;

/* Functions and API calls
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
function getSearchResults(searchStr, numOfResults = 1) {
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
		'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=100&pilimit=1&titles=' +
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

// Format image Data into a simple url
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

// Tells Autosuggest how to render suggestions (ie. dropdown list)
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
			suggestions: []
		};

		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.handleSuggestion = this.handleSuggestion.bind(this);
		this.suggestionToSearch = this.suggestionToSearch.bind(this);
		this.handleTweetSearch = this.handleTweetSearch.bind(this);
		this.getTwitterResults = this.getTwitterResults.bind(this);
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

	// Automatically called by Autosuggest's input event
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

	// Automatically called by Autosuggest: Tells Autosuggest what to do with suggestion value
	handleSuggestion = (suggestion) => {
		this.suggestionToSearch(suggestion);

		return suggestion;
	};

	// Intermediary step to avoid warnings with Autosuggest render method updates
	// Asynch API calls to collect and format data => updates data
	suggestionToSearch = async (suggestion) => {
		this.clearContent();
		this.loadingContent();
		const searchResults = await getSearchResults(suggestion, MAX_CARDS);
		// console.log('suggestionToSearch - searchResults: ', searchResults);
		const wikiData = await this.getWikiData(searchResults);

		this.updateContent(wikiData);
	};

	handleTweetSearch(tweetsArr) {
		this.clearContent();
		this.loadingContent();
		let wikiTweetsForCards = this.getTwitterResults(tweetsArr);
	}

	getTwitterResults = async (tweetsArr) => {
		let wikiDataForTweets = [];

		// Search for wiki results for each tweet in the tweetsArr
		for (let j = 0; j < tweetsArr.length; j++) {
			const searchResult = await getSearchResults(tweetsArr[j], 1);

			// Check if there are any Wikipedia results for the title.
			// If so, get associated data and wiki image, and add data object to array
			if (searchResult[3].length > 0) {
				const wikiData = await this.getWikiData(searchResult);
				wikiDataForTweets.push(wikiData[0]);
			}
		}
		this.updateContent(wikiDataForTweets);
	};

	// Get image data from Wikipedia API, format and set all wiki data into a new array
	getWikiData = async (data) => {
		let tempArr = [];

		// data[1] is the index for the resulting search titles
		for (let i = 0; i < data[1].length; i++) {
			let wikiDataObj = {
				id: 'card' + i,
				title: data[1][i],
				imgSrc: '',
				text: 'text goes here',
				url: data[3][i]
			};

			const imgData = await getWikiImg(data[1][i]);
			wikiDataObj.imgSrc = cleanUpImgData(imgData);
			tempArr[i] = wikiDataObj;
		}
		return tempArr;
	};

	updateContent(contentArr) {
		// Notify parent component of new card content
		this.props.onSearch(contentArr);
	}

	clearContent() {
		// Clear content (ie. cards)
		this.updateContent([]);
	}
	loadingContent() {
		// Clear content (ie. cards)
		this.updateContent([
			{
				id: 'card0',
				title: 'Loading results...',
				imgSrc: '',
				text: '',
				url: ''
			}
		]);
	}

	render() {
		let { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'search wikipedia here...',
			value,
			onChange: this.onChange
		};

		return (
			<div className="inputs-wrapper">
				<WikiTweets onTweetSearch={this.handleTweetSearch} />

				<div className="search-wrapper">
					<i className="fas fa-search" />
					<Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={this.handleSuggestion}
						highlightFirstSuggestion={true}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
					/>
				</div>
			</div>
		);
	}
}

export default Search;
