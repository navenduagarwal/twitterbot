console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

tweetIt();
setInterval(tweetIt,1000*20);

function tweetIt(){

	var r = Math.floor(Math.random()*100);

	var params = { status: 'hello world!' + r };

	T.post('statuses/update', params, gotData)

function gotData(err, data, response) {
	// var tweets = data.statuses;
	// for (var i = 0; i < tweets.length; i++){
		if(err){
			console.log("Something went wrong");
		} else {
			console.log("It worked");
		}
		// console.log(data);
	};

};