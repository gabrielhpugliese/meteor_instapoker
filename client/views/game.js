Template.game.isAdmin = function() {
    var gameId = Session.get('gameId'), 
        currentGame = Games.findOne({_id : gameId});
    return currentGame && currentGame.admin === Meteor.userId();
}

Template.game.currentGame = function () {
    var gameId = Session.get('gameId'), 
        currentGame = Games.findOne({_id : gameId});
    return currentGame;
}

Template.game.events({
    'click #deal-cards' : function() {
        var table = document.getElementById('table');
        clearTable(table);
        deck = new Deck();
        deck.shuffle();
        dealCardsToPlayers();
    },
    'click #call' : function() {
        if (typeof deck === 'undefined') {
            alert('Must deal cards first!');
            return;            
        }
        if (!deck.flopped) {
            var flop = document.getElementById('flop');
            deck.flopped = true;
            addCard(flop, deck);
            addCard(flop, deck);
            addCard(flop, deck);
        } else if (!deck.turned) {
            var turn = document.getElementById('turn');
            deck.turned = true;
            addCard(turn, deck);
        } else if (!deck.rivered) {
            var river = document.getElementById('river');
            deck.rivered = true;
            addCard(river, deck);
        }
    }
});

function clearTable(table) {
    var groups = table.getElementsByClassName('card-group');
    _.each(groups, function(group) {
        group.innerHTML = '';
    });
}

function addCard(base, deck) {
    var li = document.createElement('li');
    li.className = 'card-li';
    li.appendChild(deck.draw().createView());
    base.appendChild(li);
}

function appendCard(base, card) {
    var li = document.createElement('li');
    li.className = 'card-li';
    li.appendChild(card.createView());
    base.appendChild(li);
}

function dealCardsToPlayers() {
    var gameId = Session.get('gameId'), currentGame = Games.findOne({
        _id : gameId
    }), players = currentGame.players;

    _.each(players, function(cards, player) {
        players[player] = [deck.draw()];
    });
    _.each(players, function(cards, player) {
        players[player].push(deck.draw());
    });
    Games.update({
        _id : gameId
    }, {
        $set : {
            players : players
        },
        $inc : {
            round: 1
        }
    });
}

Template.player.created = function() {
    Deps.autorun(function(c) {
        var gameId = Session.get('gameId'), currentGame = Games.findOne({
            _id : gameId
        });

        if (!currentGame || _.isEmpty(currentGame.players))
            return;

        var cards = currentGame.players[Meteor.userId()], 
            base = document.getElementById('base');
        _.each(cards, function(card) {
            card = new Card(card.deck, card.value, card.suit);
            appendCard(base, card);
        });
    });
}

Template.player.events({
    'click #back': function () {
        var base = document.getElementById('base'),
            back = document.getElementById('back');
            
        back.style.display = 'none';
        base.style.display = 'block';
        Meteor.setTimeout(function () {
            base.style.display = 'none';
            back.style.display = 'block';
        }, 3000);
    }
});
