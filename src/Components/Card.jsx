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
				<div key={card.id} className="card-wrapper masonry-brick">
					<a href={card.url} target="_blank">
						<img className={imageClassList} src={card.imgSrc} alt="title image" />
						<h2>{card.title}</h2>
						{/* {card.url} */}
						<p id="loadingText">{card.text}</p>
					</a>
				</div>
			);
		});
	};
	return <div className="cards-container">{renderCards()}</div>;
}

export default Card;
