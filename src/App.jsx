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
			// each entry is an instance of ResizeObserverEntry
			for (const entry of entries) {
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

	// Check pageScroll state for offscreen content, hide/show scroll icon styles accordingly.// Return array of icons with updates styles.
	getIconStyles(pageScroll) {
		const { contentType } = this.state;
		let iconDown = 'fas fa-angle-down scroll-icon';
		let iconUp = 'fas fa-angle-up scroll-icon';
		let iconLoading = 'hidden';

		if (contentType === 'loadingTwit' || contentType === 'loadingWiki') {
			iconDown = 'hidden';
			iconUp = 'hidden';
			iconLoading = 'spinning-anim';
		} else if (pageScroll === 'none') {
			iconDown = 'hidden';
			iconUp = 'hidden';
		} else if (pageScroll === 'scroll end') {
			iconDown += ' fade-out';
			iconUp += ' fade-in';
		} else {
			iconDown += ' fade-in';
			iconUp += ' fade-out';
		}

		return [ iconDown, iconUp, iconLoading ];
	}

	render() {
		const { cardCount, cardContent, contentType, pageScroll } = this.state;
		const icons = this.getIconStyles(pageScroll);

		return (
			<div className="app-container">
				<i className={icons[0]} />
				<i className={icons[1]} />
				<i className={icons[2]} />
				<Header />
				<Search onSearch={this.handleSearchUpdate} />
				<CardGrid cardCount={cardCount} cardContent={cardContent} contentType={contentType} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
