Router.route('/', function () {
  this.layout('layout');
	this.render('Home');
});

Router.route('/api/put/call', function () {

  console.log(this.request)

  data = this.request.body;
  sid = this.request.body.AccountSid;

  userAccountId = Meteor.call('getUserAccountId', sid);

  // NEED TO Check for exisiting id

  data.userAccountId = userAccountId
  Meteor.call('newCallRecord', data);

  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "text/xml");
  var xml = '<Response><Hangup/></Response>';
  this.response.end(xml);

}, {where: 'server'});

Router.route('/api/incoming/', { where: 'server' })
  .get(function () {
    this.response.end('Ok\n');
  })
  .post(function () {
    Meteor.call('routeIncomingCall', this.request.body);
  	this.response.statusCode = 200;
  	this.response.setHeader("Content-Type", "text/xml");
    var xml = '<Response><Dial timeout="30" record="true" action="http://record.meteor.com/api/put/call"><Sip>sip:+13155798850@68.64.80.34</Sip></Dial><Hangup/></Response>';
    this.response.end(xml);
  })
  .put(function () {
    // PUT /webhooks/stripe
  })