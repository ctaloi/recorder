Calls = new Mongo.Collection("calls");
Calls.before.insert(function (doc) {
	doc.createdAt = Date.now();
});