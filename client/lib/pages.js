Meteor.pages({
	'/': {to: 'index'},
	'/game': {to: 'game', before: [loggedIn, createGame]},
	'/game/:_id': {to: 'game', before: [loggedIn, checkGameExistence]},
	'.': 'notFound'
});

function createGame () {
	var gameId = Games.insert({'players': {}, 'admin': Meteor.userId()}),
		newGamePath = Meteor.gamePath() + '/' + gameId;
	Session.set('gameId', gameId);
	
	console.debug('Game created: ' + gameId);
	this.redirect(newGamePath);
}

function checkGameExistence () {
	var gameId = this.params._id;
	Session.set('gameId', gameId);
}

function loggedIn () {
	if (!Meteor.userId()) {
		this.redirect(Meteor.indexPath());
		this.done();		
	}
}
