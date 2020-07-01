import React from 'react';

// Need to require the image for Parcel to pre-load in the bundler
// const cardImg = require('../images/cardImage.png');

function Card(props) {
	let { cards } = props;

	console.log('<Card /> cards: ', cards);

	let renderCards = () => {
		return cards.map((card) => {
			let imageClassList = 'card-image';
			if (card.imgSrc === '') {
				imageClassList = imageClassList + ' hide-image';
			}
			return (
				<div key={card.id} className="card-wrapper">
					<img className={imageClassList} src={card.imgSrc} alt="title image" />
					<h2>{card.title}</h2>
					<a href={card.url} target="_blank">
						{card.url}
					</a>
				</div>
			);
		});
	};
	return <div className="cards-container">{renderCards()}</div>;
}

export default Card;
