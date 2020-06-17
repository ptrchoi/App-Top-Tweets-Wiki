import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Header from './Components/Header';
import Inputs from './Components/Inputs';
import CardGrid from './Components/CardGrid';

// Style sheets
import './styles/index.scss';

class App extends React.Component {
	render() {
		return (
			<div className="app-container">
				<Header />
				<Inputs />
				<CardGrid />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
export default App;
