Meteor.methods({
  newCallRecord: function (callRecord) {
    Calls.insert(callRecord);
  },
  routeIncomingCall: function (callRecord) {
  	console.log("New Call - Return XML");
  },
  getUserAccountId: function (sid) {
  	userAccount = Meteor.users.findOne({"profile.AccountSid": sid})
    if(typeof userAccount === 'undefined'){
      console.log("Yep, No match")
      return "No User";
    }
    else {
  	return userAccount._id;
    }
  }
});
