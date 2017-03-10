console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
// Setting up a user stream
var stream = T.stream('user');


//Antime someone follows me
stream.on('direct_message', directMessage);
// stream.on('tweet', tweetEvent);

function directMessage(eventMsg) {
	// var fs = require('fs');
	// var json = JSON.stringify(eventMsg, null, 2);
	// fs.writeFile("direct.json", json);
	var msgFrom = eventMsg.direct_message.sender_id;
	var r = Math.floor(Math.random() * 100);
	var reply = "thank you for messaging me #test" + r;
	var recipient = eventMsg.direct_message.recipient.screen_name;
	if(recipient === 'gstganit'){
	 	directReply(msgFrom, reply);
	}

};

	function directReply(from,txt) {
		var reply = { user_id: from, text: txt };
		T.post('direct_messages/new', reply, gotData);
		function gotData(err, data, response) {
			// var tweets = data.statuses;
			// for (var i = 0; i < tweets.length; i++){
			if (err) {
				console.log("Something went wrong");
			} else {
				console.log("It worked");
			}
			// console.log(data);
		};

	};

function tweetEvent(eventMsg) {
	// var fs = require('fs');
	// var json = JSON.stringify(eventMsg,null,2);
	// fs.writeFile("tweet.json",json);
	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var tweetFrom = eventMsg.user.screen_name;
	console.log(replyto + ' ' + tweetFrom);

	if (replyto === 'gstganit') {
		var newtweet = '@' + tweetFrom + ' thank you for tweeting me! #testingsparshik';
		tweetIt(newtweet);
	}

}

function followed(eventMsg) {
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' do you like GST');
}

//setInterval(tweetIt, 1000 * 20);

function tweetIt(txt) {

	// var r = Math.floor(Math.random() * 100);

	var tweets = { status: txt };

	T.post('statuses/update', tweets, gotData)

	function gotData(err, data, response) {
		// var tweets = data.statuses;
		// for (var i = 0; i < tweets.length; i++){
		if (err) {
			console.log("Something went wrong");
		} else {
			console.log("It worked");
		}
		// console.log(data);
	};
};



