Meteor.publish("Users", function () {
	return Meteor.users.find({});
});