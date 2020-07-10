// Libs
import React from 'react';

// Components
import Card from './Card';

function CardGrid(props) {
	let { cardCount, cardContent, contentType } = props;

	// Banner/title content assigned based on content updates sent from Parent
	// contentTypes = 'clear' || 'loading' || 'search' || 'tweets'
	// If loading, add classes for animations
	let title = '';
	let spinnerClass = 'spinning-anim';
	let titleClass = 'title';

	if (contentType === 'search') title = 'Search Results Found on Wikipedia';
	else if (contentType === 'tweets') title = 'Top Trending Tweet Topics Found on Wikipedia';
	else if (contentType === 'loading') {
		title = 'Searching Wikipedia';
		titleClass += '--animate';
		spinnerClass += '--show';
	}

	return (
		<div className="cardgrid-container">
			<div className="cardgrid-header">
				<div className={spinnerClass} />
				<div className={titleClass}>{title}</div>
			</div>
			<div className="cardgrid-wrapper masonry">
				<Card cards={cardContent} />
			</div>
		</div>
	);
}

export default CardGrid;
