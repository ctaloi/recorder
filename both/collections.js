Calls = new Mongo.Collection("calls");
Calls.before.insert(function (userID, doc) {
	doc.createdAt = Date.now();
});