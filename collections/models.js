Games = new Meteor.Collection('games');

Games.allow({
    insert: function (userId, doc) {
        return (userId && doc.admin === userId);
    },
    update: function (userId, doc, fields, modifier) {
        // check if modifier is only modifying the userId.
        var docKeys = _.keys(doc.players),
            modifierKeys = _.keys(modifier.$set.players),
            newKeys = _.difference(modifierKeys, docKeys);
            
        return (userId &&
                ((_.isEqual(fields, ['players']) && _.isEqual(newKeys[0], userId))
                || doc.admin === userId));
    },
    remove: function (userId, doc) {
        return (userId && userId === doc.admin);
    }
});
