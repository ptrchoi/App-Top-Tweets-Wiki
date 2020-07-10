// Libs
import React from 'react';

// 'map' through card array returning card obj content formatted in card layout/class styling
function Card(props) {
	let { cards } = props;

	let renderCards = () => {
		return cards.map((card) => {
			let imageClassList = 'card-image';
			if (card.imgSrc === '') {
				imageClassList = imageClassList + ' hide-image';
			}
			return (
				<div key={card.id} className="card-wrapper masonry-item">
					<a href={card.url} target="_blank">
						<img className={imageClassList} src={card.imgSrc} alt="title image" />
						<h2>
							{card.title}
							<i className="fas fa-external-link-alt link-icon" />
						</h2>
					</a>
				</div>
			);
		});
	};
	return <div className="cards-container">{renderCards()}</div>;
}

export default Card;
