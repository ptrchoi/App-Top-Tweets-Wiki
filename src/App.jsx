// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import regeneratorRuntime from 'regenerator-runtime'; // Standalone runtime for Regenerator-compiled generator and async functions.

// Components
import Header from './Components/Header';
import Search from './Components/Search';
import CardGrid from './Components/CardGrid';

// Style sheets
import './styles/index.scss';
import './styles/base/app.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cardCount: 0,
			cardContent: [],
			contentType: 'clear',
			pageScroll: 'none'
		};

		this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
		this.updateScrollState = this.updateScrollState.bind(this);
	}

	componentDidMount() {
		// Set ResizeObserver to watch for Element ('body') resizing and update the scrolling state.
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				// each entry is an instance of ResizeObserverEntry
				// console.log('ResizeObserver el->height: ', entry.contentRect.height);
				this.updateScrollState();
			}
		});
		observer.observe(document.querySelector('body'));

		// Listen for scroll events to check for top or bottom of page reached
		const that = this;
		window.addEventListener('scroll', function(e) {
			if ($(document).height() === $(window).height() + window.scrollY) {
				that.updateScrollState('scroll end');
			} else {
				that.updateScrollState();
			}
		});
	}

	updateScrollState(scrollState = 'none') {
		// If "scroll end" then update state, else...
		// Check if body height is greater than window height (ie. scrollable)
		if (scrollState !== 'scroll end' && $('body').height() > $(window).height()) scrollState = 'scrollable';

		this.setState({
			pageScroll: scrollState
		});
	}

	// Content updates from Inputs>Search component (passed to CardGrid component)
	handleSearchUpdate(contentArr, contentType) {
		this.setState({
			cardCount: contentArr.length,
			cardContent: contentArr,
			contentType: contentType
		});
	}

	render() {
		const { cardCount, cardContent, contentType, pageScroll } = this.state;

		// let scrollIconClasses = 'fas fa-angle-double-down scroll-icon';
		// let scrollIconClasses = 'fas fa-chevron-down scroll-icon';
		// let scrollIconClasses = 'fas fa-long-arrow-alt-down scroll-icon';
		let scrollIconClasses = 'fas fa-angle-down scroll-icon';

		// Check pageScroll state for offscreen content, hide/show scroll icons accordingly
		if (pageScroll === 'none') scrollIconClasses += ' hidden';
		else if (pageScroll === 'scroll end') scrollIconClasses = 'fas fa-angle-up scroll-icon';

		const leftIcon = scrollIconClasses + ' scroll-icon--left';
		const rightIcon = scrollIconClasses + ' scroll-icon--right';

		return (
			<div className="app-container">
				<Header />
				<i className={leftIcon} />
				<i className={rightIcon} />
				<Search onSearch={this.handleSearchUpdate} />
				<CardGrid cardCount={cardCount} cardContent={cardContent} contentType={contentType} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
