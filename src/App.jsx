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

		// let scrollIcon = 'fas fa-angle-double-down scroll-icon';
		// let scrollIcon = 'fas fa-chevron-down scroll-icon';
		// let scrollIcon = 'fas fa-long-arrow-alt-down scroll-icon';

		// let scrollIcon = 'fas scroll-icon'; // Base class shared styles
		// let leftIconDown = (scrollIcon += ' fa-angle-down scroll-icon--left');
		// let rightIconDown = (scrollIcon += ' fa-angle-down scroll-icon--right');
		// let leftIconUp = (scrollIcon += ' fa-angle-up scroll-icon--left');
		// let rightIconUp = (scrollIcon += ' fa-angle-up scroll-icon--right');

		let leftIconDown,
			rightIconDown,
			leftIconUp,
			rightIconUp = '';

		// Check pageScroll state for offscreen content, hide/show scroll icons accordingly
		// if (pageScroll === 'none') scrollIcon = 'hidden';
		// else
		if (pageScroll === 'none') {
			leftIconDown = 'hidden';
			rightIconDown = 'hidden';
			leftIconUp = 'hidden';
			rightIconUp = 'hidden';
		} else if (pageScroll === 'scroll end') {
			leftIconDown = 'fas fa-angle-down scroll-icon scroll-icon--left fade-out';
			rightIconDown = 'fas fa-angle-down scroll-icon scroll-icon--right fade-out';
			leftIconUp = 'fas fa-angle-up scroll-icon scroll-icon--left fade-in';
			rightIconUp = 'fas fa-angle-up scroll-icon scroll-icon--right fade-in';
		} else {
			leftIconDown = 'fas fa-angle-down scroll-icon scroll-icon--left fade-in';
			rightIconDown = 'fas fa-angle-down scroll-icon scroll-icon--right fade-in';
			leftIconUp = 'fas fa-angle-up scroll-icon scroll-icon--left fade-out';
			rightIconUp = 'fas fa-angle-up scroll-icon scroll-icon--right fade-out';
		}

		// let scrollIcon = 'scroll-icon';
		// let leftIconDown, rightIconDown, leftIconUp, rightIconUp = scrollIcon;

		// if (pageScroll === 'none') scrollIcon = 'hidden';
		// else if (pageScroll === 'scroll end') {
		// 	leftIconDown += ' fade-out';
		// 	rightIconDown += ' fade-out';
		// 	leftIconUp += ' fade-in';
		// 	rightIconUp += ' fade-in';
		// } else {
		// 	leftIconDown += ' fade-in';
		// 	rightIconDown += ' fade-in';
		// 	leftIconUp += ' fade-out';
		// 	rightIconUp += ' fade-out';
		// }

		// console.log('leftIconDown: ', leftIconDown);
		// console.log('rightIconDown: ', rightIconDown);
		// console.log('leftIconUp: ', leftIconUp);
		// console.log('rightIconUp: ', rightIconUp);

		return (
			<div className="app-container">
				<Header />
				<i className={leftIconDown} />
				<i className={leftIconUp} />
				<i className={rightIconDown} />
				<i className={rightIconUp} />
				<Search onSearch={this.handleSearchUpdate} />
				<CardGrid cardCount={cardCount} cardContent={cardContent} contentType={contentType} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
