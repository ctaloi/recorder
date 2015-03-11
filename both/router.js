Router.route('/', function () {
  this.layout('layout');
	this.render('Home');
});

Router.route('/api/put/call', function () {
  // console.log(this.request)
  data = this.request.body;
  sid = this.request.body.AccountSid;

  userAccountId = Meteor.call('getUserAccountId', sid);
  data.userAccountId = userAccountId
  Meteor.call('newCallRecord', data);

  this.response.statusCode = 200;
  this.response.setHeader("Content-Type", "text/xml");
  var xml = '<Response><Hangup/></Response>';
  this.response.end(xml);

}, {where: 'server'});

Router.route('/api/in/record/:sipToNumber/:sipToIp', { where: 'server' })
  .get(function () {
    this.response.end('Ok\n');
  })
  .post(function () {
    console.log('----------------------');
    console.log("SIP REQ for CALL RECORDING TO: ", this.params.sipToNumber, this.params.sipToIp);

    rootUrl = Meteor.absoluteUrl();
    console.log(rootUrl);

    Meteor.call('routeIncomingCall', this.request.body);
    this.response.statusCode = 200;
  	this.response.setHeader("Content-Type", "text/xml");
    var xml = '<Response><Dial timeout="30" record="true" action="'+rootUrl+'api/put/call"><Sip>sip:+'+this.params.sipToNumber+'@'+this.params.sipToIp+'</Sip></Dial><Hangup/></Response>';
    this.response.end(xml);
  })
  .put(function () {
    // PUT /webhooks/stripe
  })