import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './Components/Header';
import Inputs from './Components/Inputs';
import CardGrid from './Components/CardGrid';

// Style sheets
import './styles/index.scss';
import './styles/base/app.scss';

// Need to require the image for Parcel to pre-load in the bundler
const cardImg = require('./images/cardImage.png');
// TEMP FOR TESTING ONLY!!!
const testArray = [
	{
		id: 0,
		title: 'card #1 from App.jsx',
		imgSrc: cardImg
	},
	{
		id: 1,
		title: 'card #2 from App.jsx',
		imgSrc: cardImg
	},
	{
		id: 2,
		title: 'card #3 from App.jsx',
		imgSrc: cardImg
	},
	{
		id: 3,
		title: 'card #4 from App.jsx',
		imgSrc: cardImg
	},
	{
		id: 4,
		title: 'card #5 from App.jsx',
		imgSrc: cardImg
	}
];

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cardCount: 4,
			cardContent: [],
			locationID: 1 // WOEID
		};

		this.handleTweetSearch = this.handleTweetSearch.bind(this);
		this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
		this.handleLocationUpdate = this.handleLocationUpdate.bind(this);
	}
	// Initialize card content upon Mounting
	componentDidMount() {
		this.handleSearchUpdate(testArray);
		// this.handleLocationUpdate();
	}
	handleTweetSearch(msg) {
		console.log('App.jsx - handleTweetSearch() - msg: ', msg);
	}
	// Pass content updates from Inputs>Search comp to CardGrid comp
	handleSearchUpdate(contentArr) {
		// console.log('App.jsx - handleSearchUpdate() - arr: ', contentArr);
		// console.log('App.jsx - handleSearchUpdate() - cardCount: ', contentArr.length);

		this.setState({
			cardCount: contentArr.length,
			cardContent: contentArr
		});
	}
	// Pass WOEID from location to Twitter API
	handleLocationUpdate(locationID) {
		console.log('App.jsx - handleLocationUpdate() - locationID: ', locationID);

		this.setState({
			locationID: locationID
		});
	}
	render() {
		const { cardCount, cardContent, locationID } = this.state;
		return (
			<div className="app-container">
				<Header />
				<Inputs
					onTweetSearch={this.handleTweetSearch}
					locationID={locationID}
					onLocation={this.handleLocationUpdate}
					onSearch={this.handleSearchUpdate}
				/>
				<CardGrid cardCount={cardCount} cardContent={cardContent} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
