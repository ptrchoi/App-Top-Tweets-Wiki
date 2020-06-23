import React from 'react';

// Need to require the image for Parcel to pre-load in the bundler
// const cardImg = require('../images/cardImage.png');

function Card(props) {
	let { cards } = props;

	let renderCards = () => {
		return cards.map((card) => {
			return (
				<div className="card-wrapper">
					<img className="card-image" src={card.imgSrc} alt="" />
					<h2>{card.title}</h2>
					<p>{card.url}</p>
					<a href={card.url} target="_blank" />
				</div>
			);
		});
	};
	return <div className="cards-container">{renderCards()}</div>;
}

export default Card;
