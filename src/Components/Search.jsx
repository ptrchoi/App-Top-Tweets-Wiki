import React from 'react';
import $ from 'jquery';
import Autosuggest from 'react-autosuggest';

const TEMP_MAX = 4;

// const getSuggestions = (value) => {};

// Tells Autosuggest what to do with suggestion value
// const getSuggestionValue = (suggestion) => {
// 	console.log('getSuggestionValue - suggestion: ', suggestion);
// 	return suggestion;
// };

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
// ,
// function(data) {
// 	if (data) {
// 		// console.log('getSearchSuggestions() - data[1]: ', data[1]);

// 		if (typeof data[1] === 'undefined') {
// 			return;
// 		}
// 		self.setState({
// 			suggestions: data[1]
// 		});
// 	}
// }

const getWikiImg = (str, callback) => {
	// Call Wikipedia API with title search for images
	$.getJSON(
		'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&piprop=original|thumbnail&pithumbsize=100&pilimit=1&titles=' +
			str +
			'&callback=?',
		function(data) {
			let wikiStr = JSON.stringify(data);
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
			console.log('getWikiImage() - imageURL: ', imageURL);
			callback(imageURL);
		}
	);
};
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
		this.getSearchResults = this.getSearchResults.bind(this);
		this.setCardContent = this.setCardContent.bind(this);
		this.getWikiImages = this.getWikiImages.bind(this);
		this.updateContent = this.updateContent.bind(this);
	}
	// Upon Autosuggest's onChange event => update value
	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};
	// Automatically called with input change; Call Wikipedia API to get search suggestions => update suggestions array
	onSuggestionsFetchRequested = async ({ value }) => {
		// console.log('onSuggestionsFetchRequested() - value: ', value);
		const suggestions = await getWikiSuggstions(value);

		this.setState({
			suggestions: suggestions[1]
		});
	};

	// Automatically called to clear out suggestions array
	onSuggestionsClearRequested = () => {
		// console.log('onSuggestionsClearRequested()');

		this.setState({
			suggestions: []
		});
	};

	// Tells Autosuggest what to do with suggestion value
	handleSuggestion(suggestion) {
		// console.log('handleSuggestion - suggestion: ', suggestion);
		this.getSearchResults(suggestion);
		return suggestion;
	}

	// Calls Wikipedia API with suggestion => call setCardContent with updated data array
	getSearchResults = (suggestion) => {
		// console.log('getSearchResults() - suggestion: ', suggestion);

		let self = this;

		$.getJSON(
			'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
				suggestion +
				'&limit=' +
				TEMP_MAX +
				'&namespace=0&callback=?',
			function(data) {
				console.log('getSearchResults() - data: ', data);
				// self.setState({
				// 	searchResults: data[1]
				// });

				// Strips down to just the name
				// let myArr = [];

				// for (let i = 0; i < TEMP_MAX; i++) {
				// 	myArr[i] = data[1][i];
				// }
				// self.setCardContent(myArr);
				// self.setCardContent(data);
				self.getWikiImages(data);
			}
		);
	};

	getWikiImages = (wikiData) => {
		let myArr = [];

		for (let i = 0; i < wikiData.length; i++) {
			console.log('getWikiImages() - for loop "i": ', i);
			console.log('getWikiImages() - for loop "wikiData[1][i]": ', wikiData[1][i]);

			// Get the "title" of each result
			let tempImgObj = {
				title: wikiData[1][i],
				imgSrc: ''
			};

			// Passes in a callback as the 2nd parameter, operating on the returned image url
			getWikiImg(wikiData[1][i], (imgUrl) => {
				console.log('inside CALLBACK,imgUrl: ', imgUrl);
				tempImgObj.imgSrc = imgUrl;
				myArr[i] = tempImgObj;
			});
		}
		console.log('getWikiImages() - myArr: ', myArr);
		this.setState({
			imgArr: myArr
		});
		this.setCardContent(wikiData);
	};

	setCardContent = (data) => {
		let contentArray = [];
		let { imgArr } = this.state;

		console.log('setCardContent() imgArr: ', imgArr);
		console.log('setCardContent() data: ', data);
		for (let i = 0; i < data.length; i++) {
			console.log('setCardContent() loop to display imgArr[i]: ', imgArr[i]);
			// console.log('setCardContent() loop to display imgArr[i].imgSrc: ', imgArr[i].imgSrc);
			// console.log('setCardContent() loop to display data[1][i]: ', data[1][i]);

			let tempContentObj = {
				id: 'card' + i,
				title: data[1][i],
				imgSrc: imgArr[i].imgSrc,
				text: 'text goes here',
				url: data[3][i]
			};

			contentArray[i] = tempContentObj;
		}
		this.updateContent(contentArray);
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
