<template>
	<div class="wrapper">

		<article class="answer-result">
			<h3 class="hidden answer-text">{{ TheAnswer }}</h3>
			<img class="answer" aria-hidden="true" :src="answer" :alt="answerAlt">
			<img class="answer-image" :src="image" alt="imageAlt">
			<p class="answer-comment">{{ AnswerComment }}</p>
		</article>

	</div>
</template>

<script>

import { scoreCheck } from '../js/api';

const yep = require('../assets/yep.svg');
const nope = require('../assets/nope.svg');

export default {
	props: [
		'team'
	],
	methods: {
		displayResult: function(team, won, wonAlt, lost, lostAlt, comment) {
			const JSONresult = team.scoreboard.gameScore.filter((game) => {
				return game.game.awayTeam.City === 'Toronto' || game.game.homeTeam.City === 'Toronto';
			});

			const awayScore = parseInt(JSONresult[0].awayScore);
			const homeScore = parseInt(JSONresult[0].homeScore);

			if (JSONresult[0].game.homeTeam.City === 'Toronto' && homeScore > awayScore || JSONresult[0].game.awayTeam.City === 'Toronto' && awayScore > homeScore) {

				this.answer = yep;
				this.answerAlt = 'Yep, they won';
				this.TheAnswer = 'Yep, they won';

				this.AnswerComment = comment;
				this.image = won;
				this.imageAlt = wonAlt;

			} else {
				this.answer = nope;
				this.answerAlt = 'Nope, they lost';
				this.TheAnswer = 'Nope, they lost';

				this.AnswerComment = 'I\'m so sorry, they lost (sometimes losing is worse than winning)';

				this.image = lost;
				this.imageAlt = lostAlt;
			}
		},
		checkTeam: function () {
			let lost;
			let lostAlt;
			let won;
			let wonAlt;
			let answerComment;

			switch (this.team) {
				case 'jays':
					lost = require('../assets/jays-lost.jpg');
					lostAlt = 'Jays missing a catch because they lost, womp womp';
					won = require('../assets/jays-won.jpg');
					wonAlt = 'sad looking Jays because we are sad there are more games';
					answerComment = 'I\'m so sorry, they won (it means more people on that bandwagon)';

					scoreCheck('/mlb/latest/scoreboard.json', won, wonAlt, lost, lostAlt, answerComment, this.displayResult);

					break;
				
				case 'leafs':
					lost = require('../assets/leafs-lost.jpg');
					lostAlt = 'Leaf missing the puck because they lost, womp womp';
					won = require('../assets/leafs-won.jpg');
					wonAlt = 'sad looking Leafs because we are sad there are more games';
					answerComment = 'I\'m so sorry, they won (this is so rare, everyone will be talking about it)';

					scoreCheck('/nhl/latest/scoreboard.json', won, wonAlt, lost, lostAlt, answerComment, this.displayResult);

					break;
				
				case 'raptors':
					lost = require('../assets/raptors-lost.jpg');
					lostAlt = 'Raptors missing the ball because they lost, womp womp';
					won = require('../assets/raptors-won.jpg');
					wonAlt = 'sad looking Raptors because we are sad there are more games';
					answerComment = 'I\'m so sorry, they won (maybe you can talk about Drake at least?)';

					scoreCheck('/nba/latest/scoreboard.json', won, wonAlt, lost, lostAlt, answerComment, this.displayResult);

					break;

				default:
					console.log('Heather, there is an error in your code. Please shame her.');

			}
		},
	},
	created() {
		this.checkTeam();
	},
	data() {
		return {
			answer: '',
			TheAnswer: '',
			AnswerComment: '',
			answerAlt: '',
			image: '',
			imageAlt: '',
		};
	}
};

</script>

<style scoped lang="scss">

	.answer-result {
		text-align: center;
		.answer {
			margin:4rem auto 2rem;
			width:50%;
			display: block;
		}
		.answer-comment {
			margin-bottom: 6rem;
		}
	}

	@media (max-width: 400px) {
		.answer-result {
			.answer {
				margin:4rem auto 2rem;
				width:40%;
			}
		}
	}

</style>
