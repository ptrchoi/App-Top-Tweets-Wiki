// Libs
import React from 'react';

// Components
import Card from './Card';

function CardGrid(props) {
	let { cardContent, contentType } = props;

	// Update content for title text and classes (ie. show/hide, styles) for animations based on contentType updates.
	// >>	contentTypes = 'clear' || 'loadingTwit' || 'loadingWiki' || 'search' || 'tweets'
	let title = '';
	let spinnerClass = 'spinning-anim';
	let titleClass = 'title';

	switch (contentType) {
		case 'search':
			title = 'Search Results from Wikipedia';
			break;
		case 'tweets':
			title = 'Trending on Twitter';
			break;
		case 'loadingWiki':
			title = 'Searching Wikipedia';
			titleClass += '--animate';
			spinnerClass += '--show';
			break;
		case 'loadingTwit':
			title = 'Searching Twitter and Wikipedia';
			titleClass += '--animate';
			spinnerClass += '--show';
			break;
		default:
			break;
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
