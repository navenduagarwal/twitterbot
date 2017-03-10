console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

tweetIt();

function tweetIt(){
var params = { status: 'hello world!' };

T.post('statuses/update', params, gotData)

// console.log(config);
// T.get('search/tweets',params , gotData);

function gotData(err, data, response) {
	// var tweets = data.statuses;
	// for (var i = 0; i < tweets.length; i++){
		if(err){
			console.log("Something went wrong");
				} else {
			console.log("It worked");
				}
		  console.log(data);
		};

	}
	// }

// var stream = T.stream('statuses/filter', { track: '#apple', language: 'en' })

// stream.on('tweet', function (tweet) {
//   console.log(tweet)
// })

// stream.on('direct_message', function (directMsg) {
//   //...
// })