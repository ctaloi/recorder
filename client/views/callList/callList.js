Template.callList.helpers({
	callList: function () {
		return Calls.find({ "RecordingDuration": { $exists: true }}, {sort: {createdAt: -1}});
	}
});