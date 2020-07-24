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
	}

	// Check if body height is greater than window height (ie. scrollable)
	updateScrollState() {
		console.log('updateScrollState');
		let pageScroll = 'none';
		if ($('body').height() > $(window).height()) pageScroll = 'scrollable';

		this.setState({
			pageScroll: pageScroll
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

		// let scrollIconClasses = 'fas fa-angle-double-down page-icon';
		// let scrollIconClasses = 'fas fa-chevron-down page-icon';
		let scrollIconClasses = 'fas fa-long-arrow-alt-down page-icon';

		console.log('pageScroll: ', pageScroll);
		if (pageScroll === 'none') scrollIconClasses += ' hidden';

		return (
			<div className="app-container">
				<Header />
				{/* <i className="fas fa-chevron-down page-icon" /> */}
				<i className={scrollIconClasses} />
				<Search onSearch={this.handleSearchUpdate} />
				<CardGrid cardCount={cardCount} cardContent={cardContent} contentType={contentType} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
