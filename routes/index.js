var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'anonbomb' });
});

router.post('/send', function(req, res, next) {
  var comment = req.body.textbox;
  var npid = req.body.hi;
  var locationa = req.body.loc;
  
  console.log(npid)

User.findOne({pid:npid}, function (err, user){
  console.log("made it!")
      var mydate = new Date().toString();
    console.log(mydate)
  var n = mydate.search("GM");
  var newdate = mydate.substring(3, (n-1));
        user.postss.push({value: comment, created: newdate, location:locationa });
        user.save();
res.redirect("/thanks")
  
});

});

router.get('/thanks', function(req, res, next) {

  res.render('thanks');
  
});

router.get('/id/:id/:loc?', function(req, res, next) {
  var location = req.params.loc;
  var newloc;
  console.log(location)
  User.findOne({pid:req.params.id}, function(err, user) {
      console.log(user);
      if (user==null) {
          User.findOne({sid:req.params.id}, function(err, user1) {
            console.log(user1);
            if (user1==null) {
              res.render('404');
            } else {
              if (location == "sc") {
          newloc = "via&nbsp;Snapchat"
        } else if (location == "is") {
          newloc = "via&nbsp;Instagram"
        } else if (location == "fb") {
          newloc = "via&nbsp;Facebook"
        } else if (location == "ti") {
          newloc = "via&nbsp;Tinder"
        } else if (location == undefined || location == null) {
          newloc = ""
        } else {
          newloc = "via&nbsp;{[unknown.location]}"
        }
              res.render('strange', { data:user1, newloc:newloc });
            }
          });
      } else {
        user.postss.reverse();
        console.log("yay")
        console.log(user.postss)
        if (user.postss.length<1) {
          console.log("empty")
          var msg="nothing here yet..."
        } else {
         console.log("full")
         var msg=null
        }
        
           res.render('me', { data:user, what:msg});
      }
  });
});

router.get('/newid', function(req,res,next){
    
    var text = "";
    var text1 = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    for (var i = 0; i < 5; i++)
    text1 += possible.charAt(Math.floor(Math.random() * possible.length));
    
    

    var newid = new User({
        
        pid: text,
        sid: text1,
       
    });
    newid.save();
    res.render('links', {pid:text, sid:text1});
});

function reverseString(str) {
    // Step 1. Use the split() method to return a new array
    var splitString = str.split(""); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]
 
    // Step 2. Use the reverse() method to reverse the new created array
    var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]
 
    // Step 3. Use the join() method to join all elements of the array into a string
    var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"
    
    //Step 4. Return the reversed string
    return joinArray; // "olleh"
}

module.exports = router;
