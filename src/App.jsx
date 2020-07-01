import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './Components/Header';
import Search from './Components/Search';
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
			cardContent: []
		};

		this.handleSearchUpdate = this.handleSearchUpdate.bind(this);
	}
	// Initialize card content upon Mounting
	componentDidMount() {
		this.handleSearchUpdate(testArray);
		// this.handleLocationUpdate();
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
	render() {
		const { cardCount, cardContent } = this.state;
		return (
			<div className="app-container">
				<Header />
				<Search onSearch={this.handleSearchUpdate} />
				<CardGrid cardCount={cardCount} cardContent={cardContent} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
