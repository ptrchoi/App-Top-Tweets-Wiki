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
		title: 'card #1 from App.jsx',
		imgSrc: cardImg
	},
	{
		title: 'card #2 from App.jsx',
		imgSrc: cardImg
	},
	{
		title: 'card #3 from App.jsx',
		imgSrc: cardImg
	},
	{
		title: 'card #4 from App.jsx',
		imgSrc: cardImg
	},
	{
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
	}
	// Pass content updates from Inputs>Search comp to CardGrid comp
	handleSearchUpdate(contentArr) {
		console.log('App.jsx - handleSearchUpdate() - arr: ', contentArr);
		this.setState({
			cardContent: contentArr
		});
	}
	render() {
		const { cardCount, cardContent } = this.state;
		return (
			<div className="app-container">
				<Header />
				<Inputs onSearch={this.handleSearchUpdate} />
				<CardGrid cardCount={cardCount} cardContent={cardContent} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
