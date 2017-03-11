console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');
var unirest = require('unirest');

var T = new Twit(config);
// Setting up a user stream
var stream = T.stream('user');

startBotConversation();


function startBotConversation() {
	var req = unirest("POST", "https://directline.botframework.com/api/conversations");

	req.headers({
		"content-type": "application/json",
		"authorization": "BotConnector ldcuROgkoG8.cwA.AnM.vQQ-oOyz_WxSIeCZUkd_pdzKS-TEt1lu9H0dnqrsWJ4"
	});

	req.end(function (res) {
		if (res.error) {
			throw new Error(res.error)
		}
		global.token = res.body.token;
		global.convId = res.body.conversationId;
		console.log("token " + global.token + "\n Conv " + global.convId);
		getBotReply();
		startTwitterListener();
	});
};

function startTwitterListener() {
	stream.on('direct_message', directMessage);
	// stream.on('tweet', tweetEvent);
}



function directMessage(eventMsg) {
	// var fs = require('fs');
	// var json = JSON.stringify(eventMsg, null, 2);
	// fs.writeFile("direct.json", json);
	var msgFrom = eventMsg.direct_message.sender_id;
	global.from = eventMsg.direct_message.screen_name;
	// var r = Math.floor(Math.random() * 100);
	// var reply = "thank you for messaging me #test" + r;
	var recipient = eventMsg.direct_message.recipient.screen_name;
	var text = eventMsg.direct_message.text;
	console.log("message " + text);
	if (recipient === 'gstganit') {
		// directReply(msgFrom, reply);
		messageToBot(text);
	}
};

function messageToBot(text) {
	var url = "https://directline.botframework.com/api/conversations/" + global.convId + "/messages"
	var req = unirest("POST", url);
	var authorization = "BotConnector " + global.token;

	req.headers({
		"content-type": "application/json",
		"authorization": authorization
	});

	req.type("json");
		console.log("message inside" + text);
	req.send({
		"text": text,
		"Type": "message",
		"from": global.from
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);
		getBotReply();
	});
}

function getBotReply() {
	var url = "https://directline.botframework.com/api/conversations/" + global.convId + "/messages"
	var req = unirest("GET", url);
	var authorization = "BotConnector " + global.token;
	req.headers({
		"content-type": "application/json",
		"authorization": authorization
	});

	req.end(function (res) {
		if (res.error) throw new Error(res.error);
	var fs = require('fs');
	var json = JSON.stringify(res.body,null,2);
	fs.writeFile("reply.json",json);
	});

}

function directReply(from, txt) {
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

// function tweetEvent(eventMsg) {
// 	// var fs = require('fs');
// 	// var json = JSON.stringify(eventMsg,null,2);
// 	// fs.writeFile("tweet.json",json);
// 	var replyto = eventMsg.in_reply_to_screen_name;
// 	var text = eventMsg.text;
// 	var tweetFrom = eventMsg.user.screen_name;
// 	console.log(replyto + ' ' + tweetFrom);

// 	if (replyto === 'gstganit') {
// 		var newtweet = '@' + tweetFrom + ' thank you for tweeting me! #testingsparshik';
// 		tweetIt(newtweet);
// 	}

// }

// function followed(eventMsg) {
// 	var name = eventMsg.source.name;
// 	var screenName = eventMsg.source.screen_name;
// 	tweetIt('@' + screenName + ' do you like GST');
// }

//setInterval(tweetIt, 1000 * 20);

// function tweetIt(txt) {

// 	// var r = Math.floor(Math.random() * 100);

// 	var tweets = { status: txt };

// 	T.post('statuses/update', tweets, gotData)

// 	function gotData(err, data, response) {
// 		// var tweets = data.statuses;
// 		// for (var i = 0; i < tweets.length; i++){
// 		if (err) {
// 			console.log("Something went wrong");
// 		} else {
// 			console.log("It worked");
// 		}
// 		// console.log(data);
// 	};
// };