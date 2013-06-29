Template.game.isAdmin = function () {
	var gameId = Session.get('gameId'),
		currentGame = Games.findOne({_id: gameId});
	return currentGame && currentGame.admin === Meteor.userId();
}

Template.game.events({
	'click #deal-cards': function () {
		
	}
})
