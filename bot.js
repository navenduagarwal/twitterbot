console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);
// Setting up a user stream
var stream = T.stream('user');


//Antime someone follows me
stream.on('tweet', tweetEvent);


function tweetEvent(eventMsg){
	var fs = require('fs');
	var json = JSON.stringify(eventMsg,null,2);
	fs.writeFile("tweet.json",json);
}

function followed(eventMsg){
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetIt('@' + screenName + ' do you like GST');
}

//setInterval(tweetIt, 1000 * 20);

function tweetIt(txt) {

	// var r = Math.floor(Math.random() * 100);

	var tweets = { status: txt};

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