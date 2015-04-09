
Template.callList.rendered = function () {
	Session.setDefault({
		"selected": "null",
		"playing": false
	});
};

Template.callList.helpers({
	callList: function () {
		return Calls.find({ "RecordingDuration": { $exists: true }}, {sort: {createdAt: -1}});
	},
	log: function () {
		console.log(this);
	},
    selected: function () {
    	var selected = Session.get("selected");
    	var lineId = this._id;

    	var playing = "blue mdi-av-play-arrow";
    	var stopped = "red mdi-av-stop";

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
    			"myClass": "not-selected"
    		}
		}
    }
});


Template.callList.events({
	'ended audio': function () {
		console.log("Ended");
	},
	'playing': function () {
		Materialize.toast("Woot");
	},
	'click a.play': function (event) {
		event.preventDefault();

		if (Session.get("playing")) {
			callRecording.pause();
			Session.set({
				"playing": false,
				"selected": "null"
			});
			callRecording = new Audio(event.currentTarget.href)
			callRecording.play();
			Session.set({
				"playing": true,
				"selected": this._id
			});
		} else {
			Session.set({
				"playing": true,
				"selected": this._id
			});
			callRecording = new Audio(event.currentTarget.href)
			// console.log(callRecording)
			callRecording.play();
			};
	},
	'click a.stop': function (event) {
		event.preventDefault();

		Session.set({
			"playing": false,
			"selected": "null"
		});
		callRecording.pause();
	}
});