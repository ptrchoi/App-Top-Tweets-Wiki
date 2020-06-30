import React from 'react';

class WikiTweets extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		console.log('twitterButton - clicked!');
		this.props.onTweetSearch('button clicked');
	}

	render(props) {
		console.log('WikiTweets - props.location: ', this.props.location);
		return (
			<div className="wiki-tweets-wrapper">
				<button id="twitterButton" onClick={this.handleClick}>
					Get Wikipedia results for Top Trending Tweets
				</button>
			</div>
		);
	}
}

export default WikiTweets;
