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

User.findOne({pid:npid}, function (err, user){
  console.log("made it!")
        user.postss.push({value: comment, created: new Date() });
        user.save();
res.redirect("/thanks")
  
});

});

router.get('/thanks', function(req, res, next) {

  res.render('thanks');
  
});

router.get('/id/:id', function(req, res, next) {
  User.findOne({pid:req.params.id}, function(err, user) {
      console.log(user);
      if (user==null) {
          User.findOne({sid:req.params.id}, function(err, user1) {
            console.log(user1);
            if (user1==null) {
              res.render('404');
            } else {
              res.render('strange', { data:user1 });
            }
          });
      } else {
           res.render('me', { data:user });
      }
  });
});

router.get('/newid', function(req,res,next){
    
    var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    

    var newid = new User({
        
        pid: text,
        sid: reverseString(text),
       
    });
    newid.save();
    res.render('links', {pid:text, sid:reverseString(text)});
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
