Template.callList.helpers({
	callList: function () {
		return Calls.find({}, {sort: {createdAt: -1}});
	}
});