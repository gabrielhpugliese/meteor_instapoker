Template.index.events({
	'submit form#game-start': function () {
		return false;
	},
	'click #create-game' : function () {
		Meteor.router.go(Meteor.gamePath());
	},
	'click #join-game' : function () {
		var gameId = document.querySelector('#game-id').value,
			joinGamePath = Meteor.gamePath() + '/' + gameId;
		Meteor.router.go(joinGamePath);
	}
})
