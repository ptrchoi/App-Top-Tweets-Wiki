import React from 'react';
import $ from 'jquery';
import Autosuggest from 'react-autosuggest';

const TEMP_MAX = 4;

/* API Calls/Functions
---------------------------------------------------*/
// Wikipedia API - get search suggestion results for typed input
function getWikiSuggstions(input) {
	const wikiUrl =
		'https://en.wikipedia.org/w/api.php?action=opensearch&suggest=true&format=json&search=' +
		input +
		'&limit=' +
		TEMP_MAX +
		'&namespace=0&callback=?';

	return new Promise((resolve, reject) => {
		$.getJSON({
			url: wikiUrl,
			success: resolve,
			error: reject
		});
	});
}
function getSearchResults(searchStr) {
	// console.log('getSearchResults - searchStr: ', searchStr);

	const wikiSearchUrl =
		'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
		searchStr +
		'&limit=' +
		TEMP_MAX +
		'&namespace=0&callback=?';

	return new Promise((resolve, reject) => {
		$.getJSON({
			url: wikiSearchUrl,
			success: resolve,
			error: reject
		});
	});
}

function getWikiImg(str) {
	// console.log('getWikiImg - str: ', str);

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
	// console.log('cleanUpImgData() - imageURL: ', imageURL);

	return imageURL;
}

// Tells Autosuggest how to render suggestions
const renderSuggestion = (suggestion) => {
	// console.log('renderSuggestion - suggestion: ', suggestion);
	return <div className="renderSuggestionDiv">{suggestion}</div>;
};

/* Search class
-----------------------------------------------------------*/
class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			suggestions: [],
			imgArr: []
		};

		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.handleSuggestion = this.handleSuggestion.bind(this);
		this.suggestionToSearch = this.suggestionToSearch.bind(this);
		// this.getSearchResults = this.getSearchResults.bind(this);
		this.setCardContent = this.setCardContent.bind(this);
		this.getWikiImages = this.getWikiImages.bind(this);
		this.updateContent = this.updateContent.bind(this);
	}

	// Upon Autosuggest's onChange event => update input string value
	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	// Automatically called with input change
	onSuggestionsFetchRequested = async ({ value }) => {
		const suggestions = await getWikiSuggstions(value);

		this.setState({
			suggestions: suggestions[1]
		});
	};

	// Automatically called to clear out suggestions array
	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	// Automatically called by Autosuggest: Tells Autosuggest what to do with suggestion value
	handleSuggestion = (suggestion) => {
		console.log('handleSuggestion - suggestion: ', suggestion);
		this.suggestionToSearch(suggestion);

		return suggestion;
	};

	//Intermediary step to step out of Autosuggest methods
	suggestionToSearch = async (suggestion) => {
		console.log('suggestionToSearch - suggestion: ', suggestion);
		const results = await getSearchResults(suggestion);
		console.log('suggestionToSearch - results: ', results);
		const searchArr = await this.getWikiImages(results);
		console.log('suggestionToSearch - updatedData: ', searchArr);

		this.setCardContent(searchArr);
	};

	getWikiImages = async (wikiData) => {
		let tempArr = [];

		for (let i = 0; i < wikiData.length; i++) {
			// Get the "title" of each result
			let currentTitle = wikiData[1][i];
			let currentUrl = wikiData[3][i];
			console.log('getWikiImages() - for loop "i": ', i, ' "currentTitle": ', currentTitle);
			console.log('wikiData: ', wikiData);

			let tempImgObj = {
				title: currentTitle,
				url: currentUrl,
				imgSrc: ''
			};

			const imgSrc = await getWikiImg(currentTitle);

			let cleanedImgSrc = cleanUpImgData(imgSrc);
			console.log('getWikiImage - imgSrc: ', cleanedImgSrc);
			tempImgObj.imgSrc = cleanedImgSrc;
			tempArr[i] = tempImgObj;
		}
		console.log('getWikiImages() - tempArr: ', tempArr);
		// this.setState({
		// 	imgArr: tempArr
		// });
		// this.setCardContent(wikiData);
		return tempArr;
	};

	setCardContent = (data) => {
		// let contentArray = [];
		// let { imgArr } = this.state;

		// console.log('setCardContent() imgArr: ', imgArr);
		console.log('setCardContent() data: ', data);
		// for (let i = 0; i < data.length; i++) {
		// // 	console.log('setCardContent() loop to display imgArr[i]: ', imgArr[i]);
		// 	// console.log('setCardContent() loop to display imgArr[i].imgSrc: ', imgArr[i].imgSrc);
		// 	// console.log('setCardContent() loop to display data[1][i]: ', data[1][i]);

		// 	let tempContentObj = {
		// 		id: 'card' + i,
		// 		title: data[1][i],
		// 		imgSrc: imgArr[i].imgSrc,
		// 		text: 'text goes here',
		// 		url: data[3][i]
		// 	};

		// 	contentArray[i] = tempContentObj;
		// }
		// this.updateContent(contentArray);
	};

	updateContent(contentArr) {
		this.props.onSearch(contentArr);
	}
	render() {
		let { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'search wikipedia here...',
			value,
			onChange: this.onChange
		};

		return (
			<div className="search-wrapper">
				<i className="fas fa-search" />

				<Autosuggest
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={this.handleSuggestion}
					renderSuggestion={renderSuggestion}
					inputProps={inputProps}
				/>
			</div>
		);
	}
}

export default Search;
