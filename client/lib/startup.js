Meteor.startup(function () {
    window.gamesSub = Meteor.subscribe('games');
});
