import React from 'react';

function Card(props) {
	let { cards } = props;

	let renderCards = () => {
		return cards.map((el) => {
			return <div className="card-wrapper">{el.text}</div>;
		});
	};
	return <div className="cards-container">{renderCards()}</div>;
}

export default Card;
