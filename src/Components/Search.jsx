import React from 'react';
import $ from 'jquery';
import Autosuggest from 'react-autosuggest';

const getSuggestions = (value) => {};

// Tells Autosuggest what to do with suggestion value
// const getSuggestionValue = (suggestion) => {
// 	console.log('getSuggestionValue - suggestion: ', suggestion);
// 	return suggestion;
// };

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
			searchResults: []
		};

		this.onChange = this.onChange.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
		this.handleSuggestion = this.handleSuggestion.bind(this);
		this.getSearchResults = this.getSearchResults.bind(this);
	}
	// Upon Autosuggest's onChange event => update value
	onChange = (event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};
	// Automatically called with input change; Call Wikipedia API to get search suggestions => update suggestions array
	onSuggestionsFetchRequested = ({ value }) => {
		// console.log('onSuggestionsFetchRequested() - value: ', value);

		let numSuggestions = 4;
		let self = this;

		// Call Wikipedia API search with value for suggestions
		$.getJSON(
			'https://en.wikipedia.org/w/api.php?action=opensearch&suggest=true&format=json&search=' +
				value +
				'&limit=' +
				numSuggestions +
				'&namespace=0&callback=?',
			function(data) {
				if (data) {
					// console.log('getSearchSuggestions() - data[1]: ', data[1]);

					if (typeof data[1] === 'undefined') {
						return;
					}
					self.setState({
						suggestions: data[1]
					});
				}
			}
		);
	};
	// Automatically called to clear out suggestions array
	onSuggestionsClearRequested = () => {
		console.log('onSuggestionsClearRequested()');

		this.setState({
			suggestions: []
		});
	};

	// Tells Autosuggest what to do with suggestion value
	handleSuggestion(suggestion) {
		console.log('handleSuggestion - suggestion: ', suggestion);
		this.getSearchResults(suggestion);
		return suggestion;
	}
	getSearchResults = (suggestion) => {
		console.log('getSearchResults() - suggestion: ', suggestion);

		const TEMP_MAX = 4;
		let self = this;

		$.getJSON(
			'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
				suggestion +
				'&limit=' +
				TEMP_MAX +
				'&namespace=0&callback=?',
			function(data) {
				console.log('getWikiSearchResults() - data[1]: ', data[1]);
				self.setState({
					searchResults: data[1]
				});
			}
		);
	};

	setWikiCards(thisArr) {
		console.log('setWikiCards() - stubbed for now');
		// for (let i = 0; i < thisArr.length; i++) {
		// 	if (!thisArr[i]) {
		// 		$('#wikiCard0' + i).hide();
		// 	} else {
		// 		displayWikiCards(thisArr, i);
		// 		$('#wikiCard0' + i).show();
		// 		document.getElementById('img0' + i).setAttribute('alt', 'loading image...');
		// 		getImages(thisArr, i);
		// 	}
		// }
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

// handleInputChange(e) {
// 	console.log('e.target.value: ', e.target.value);
// 	this.getSearchSuggestions(e.target.value);
// }

// dropdownSuggestions(wikiObj, numSuggestions) {
// 	// Test for empty searchBox
// 	if (typeof wikiObj[1] === 'undefined') {
// 		return;
// 	}

// 	let suggestions = [];

// 	for (let i = 0; i < numSuggestions; i++) {
// 		suggestions[i] = wikiObj[1][i];
// 	}
// 	$('#searchBox').autocomplete({
// 		source: suggestions
// 	});
// 	$('#searchBox').on('select', function(event, ui) {});
// }

// 	let suggestions = [];

// 	for (let i = 0; i < numSuggestions; i++) {
// 		suggestions[i] = data[1][i];
// 	}
// 	$('#searchBox').autocomplete({
// 		source: suggestions
// 	});
// 	$('#searchBox').on('select', function(event, ui) {});
// }
// dropdownSuggestions(data, numSuggestions);

{
	/* <input
					type="text"
					id="searchBox"
					onInput={this.handleInputChange}
					placeholder="Or search Wikipedia for anything..."
				/> */
}
