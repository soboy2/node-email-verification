var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: "****",
    pass: "****"
  }
});

var rand, mailOptions, host, link;

module.exports = function(app, root) {

  app.get('/send', function(req, res) {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link="http://" + host + "/verify?id=" + rand;
      mailOptions = {
      to : req.query.to,
      subject : "Please confirm your Email account",
      text : "Hello, <br> Please Click on the link to verify your email. <br><a href="+link+">Click here to verify</a>"
    };

    console.log(mailOptions);

    smtpTransport.sendMail(mailOptions, function(error, response) {
      if(error) {
        console.log(error);
        res.end("error");
      } else {
        console.log("Message sent: " + response.message);
        res.end("sent");
      }
    });
  });

  app.get('/verify', function(req, res) {
    console.log(req.protocol + "://" + req.get('host'));

    if((req.protocol + "://" + req.get('host')) == ("http://" + host)){

      console.log("Domain is matched. Information is from Authentic email");

      if(req.query.id==rand) {

        console.log("email is verified");
        res.end("<h1>Email " + mailOptions.to + " has been Successfully verified");

      } else {

        console.log("email is not verified");
        res.end("<h1> Bad request</h1>");

      }

    } else {

      res.end("<h1> Request is from unknown source");

    }
  });

  app.get('/', function(req, res) {
    res.sendFile(path.join(root, 'public/views/', 'index.html'));
  });

};
