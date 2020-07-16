// Libs
import React from 'react';

// 'map' through card array returning card obj content formatted in card layout/class styling
function Card(props) {
	let { cards } = props;

	let renderCards = () => {
		return cards.map((card) => {
			let imageClassList = 'card-image';
			let twitIconClassList = 'fab fa-twitter link-icon';

			// Hide wiki image, twitter link icon if either has no data
			if (card.imgSrc === '') {
				imageClassList = imageClassList + ' hide';
			}
			if (card.twitUrl === '') {
				twitIconClassList = twitIconClassList + ' hide';
			}

			return (
				<div key={card.id} className="card-wrapper masonry-item">
					<img className={imageClassList} src={card.imgSrc} alt="thumbnail" />
					<h2>{card.title}</h2>
					<a href={card.twitUrl} target="_blank">
						<i className={twitIconClassList} />
					</a>
					<a href={card.wikiUrl} target="_blank">
						<i className="fab fa-wikipedia-w link-icon" />
					</a>
				</div>
			);
		});
	};
	return <div className="cards-container">{renderCards()}</div>;
}

export default Card;
