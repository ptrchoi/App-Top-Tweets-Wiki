import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './Components/Header';
import Inputs from './Components/Inputs';
import CardGrid from './Components/CardGrid';

// Style sheets
import './styles/index.scss';
import './styles/base/app.scss';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cardCount: 4
		};
	}
	render() {
		return (
			<div className="app-container">
				<Header />
				<Inputs />
				<CardGrid cardCount={this.state.cardCount} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
