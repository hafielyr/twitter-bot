var Twitter = require('twitter');


var config = require('./config.js');

var T = new Twitter(config);


var stream = T.stream('user')

function down() {
  stream = T.stream('user');
stream.on('direct_message', function (eventMsg) {
  var dm = eventMsg.direct_message.text;
  let tweet = {
    status: dm
  }
  T.post('statuses/update', tweet, function(err, data, response) {       
    if(err){

      console.log(err[0].message);

    }
    else{
      console.log("success");
      

    }

  });
}) 
}
down();
//search tweet
/*
var params = {

  q: '"cari tiket","Cari tiket" -filter:retweets',

  count: 20,

  result_type: 'mixed',

  lang: 'id'

}
T.get('search/tweets', params, function(err, data, response) {

  if(!err){
    for(let i = 0; i < data.statuses.length; i++){
     
      //favorite tweet
      //let id = { id: data.statuses[i].id_str }
      //T.post('favorites/create', id, function(err, response){

      //mention tweet
      var screenName=data.statuses[i].user.screen_name;
      let tweet = {
        status: '@'+screenName+' halo, kamu bisa cek tiket yang kamu cari di tiket.com'
      }
      T.post('statuses/update', tweet, function(err, data, response) {       
        if(err){

          console.log(err[0].message);

        }
        else{

          let username = response.user.screen_name;

          let tweetId = response.id_str;

          console.log('Replied: ', `https://twitter.com/${username}/status/${tweetId}`)

        }

      });

    }

  } else {

    console.log(err);

  }

})
*/
function send_twitter_dm(username, message){
  T.post('direct_messages/new', {
    screen_name: username,
    text: message
  }, 
  function(err, data, response){
    if (err){
      console.log('Error!');
      console.log(err);
    }
  });  
}