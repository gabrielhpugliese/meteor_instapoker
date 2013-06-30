Template.index.events({
	'submit form#game-start': function () {
		return false;
	},
	'click #create-game' : function () {
		Meteor.router.go(Meteor.gamePath());
	},
	'click #join-game' : function () {
		var gameId = document.querySelector('#game-id').value,
            game = Games.findOne({_id: gameId}),
            players = game.players,
			gamePath = Meteor.gamePath() + '/' + gameId;
	    
	    players[Meteor.userId()] = [];
	    console.log(players)
	    Games.update({_id: gameId}, {$set: {players: players}});
		Meteor.router.go(gamePath);
	}
})
