Router.route('/', function () {
	this.render('Home');
});

Router.route('/api/twilio/action', function () {
  console.log(this.request);
  Calls.insert(this.request.body);
  this.response.end('Ok from server\n');
}, {where: 'server'});

Router.route('/api/twiml', { where: 'server' })
  .get(function () {
    this.response.end('Ok\n');
  })
  .post(function () {
  	this.response.statusCode = 200;
  	this.response.setHeader("Content-Type", "text/xml");
    var xml = '<Response><Dial timeout="30" record="true" action="http://recorder.meteor.com/api/twilio/action"><Sip>sip:+13155794444@68.64.80.34</Sip></Dial></Response>';
    this.response.end(xml);
  })
  .put(function () {
    // PUT /webhooks/stripe
  })