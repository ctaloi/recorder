Router.route('/', function () {
  this.layout('layout');
	this.render('Home');
});

Router.route('/api/twiml/hangup', function () {
  data = this.request.body;
  sid = this.request.body.AccountSid;

  userAccount = Meteor.call('getUserAccountId', sid);

  // NEED TO Check for exisiting id

  data.userAccountId = userAccount._id
  Meteor.call('newCallRecord', data);

  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "text/xml");
  var xml = '<Response><Hangup/></Response>';
  this.response.end(xml);

}, {where: 'server'});

Router.route('/api/twiml/record', { where: 'server' })
  .get(function () {
    this.response.end('Ok\n');
  })
  .post(function () {
    Meteor.call('newCall', this.request.body);
  	this.response.statusCode = 200;
  	this.response.setHeader("Content-Type", "text/xml");
    var xml = '<Response><Dial timeout="30" record="true" action="http://ctaloi.ngrok.com/api/twiml/hangup"><Sip>sip:+13155798850@68.64.80.34</Sip></Dial><Hangup/></Response>';
    this.response.end(xml);
  })
  .put(function () {
    // PUT /webhooks/stripe
  })