// today = 1428984000000
// yesterday = today - 86400000
// Calls.find({createdAt: {$gte:yesterday, $lt:today}}).fetch()
Template.callList.helpers({
	callList: function () {
		var date1 = new Date(Session.get("date1")).valueOf();
		var date2 = new Date(Session.get("date2")).valueOf();

		// var filterDate = Session.get("filterDate");
		// var filterPrevDay = filterDate - 86400000;
		// return Calls.find({ "RecordingDuration": { $exists: true }, }, {sort: {createdAt: -1}});
		// console.log("Greater Then: " + date2 + " and less then: " + date1);

		// callList engOrders = _.sortBy(query, "date_modified").reverse();

		return {
			calls: Calls.find({createdAt: {$gt:date2, $lte:date1}}, {sort: {createdAt: -1}}),
			"date1": moment(date1).format(),
			"date2": moment(date2).format()
		}
	},

    selected: function () {
    	var selected = Session.get("selected");
    	var lineId = this._id;

    	var playing = "white grey-text mdi-av-play-arrow";
    	var stopped = "blue mdi-av-stop";

    	// If our line is selected we highlight the line and set the class
    	if (lineId == selected) {
    		return {
    			"statusIcon": stopped,
    			"playerState": "stop",
    			"myClass": "selected"
    			}
    	} else {
    		return {
    			"statusIcon": playing,
    			"playerState": "play",
    			"myClass": ""
    		}
		}
    }
});

var startPlay = function (resource, id) {
	analytics.track("Played Audio")
	myAudio = new Audio(resource);
	myAudio.addEventListener('ended', stopPlay);
	myAudio.addEventListener('play',
		Session.set({
			"playing": true,
			"selected": id,
		}))
	myAudio.play();
};

var stopPlay = function() {
	analytics.track("Stopped Audio")
	Session.set({
		"playing": false,
		"selected": null,
	});
};

Template.callList.events({
	'click a.play': function (event) {
		event.preventDefault();
		// If something is playing already - pause it
		if (Session.get("playing")) {
			myAudio.pause();
			stopPlay();
		}
		resource = event.currentTarget.href
		startPlay(resource, this._id);
	},
	'click a.stop': function (event) {
		event.preventDefault();
		myAudio.pause();
		stopPlay();
	}
});