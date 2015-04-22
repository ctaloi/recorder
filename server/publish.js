var adminUser = process.env.ADMIN_USER;

// Only return calls where the userAccountId matches the current user
Meteor.publish("Calls", function () {
	if (!this.userId) {
		return [];
    }
    if (this.userId === adminUser) {
    	return Calls.find({"RecordingDuration": { $exists: true }});
    }
	currentUser = this.userId;
	currentUserSid = Meteor.users.findOne({_id: currentUser})["profile"]["AccountSid"]
	return Calls.find({
		"AccountSid": currentUserSid,
		"RecordingDuration": { $exists: true },
		"DialCallStatus": "completed" }, {limit:200})
});