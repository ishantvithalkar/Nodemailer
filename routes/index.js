var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname,path.extname(file.originalname)) + Date.now()+path.extname(file.originalname));
  }
});
 
var upload = multer({ storage: storage });
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MAIL' });
});

//var cpUpload = upload.fields([{name:'file',maxCount:10}]);

router.post('/mail',upload.single('file'),function(req, res , next){
    var to = req.body.receiver;
    var subject = req.body.subject;
    var message = req.body.message;
    var nodemailer = require('nodemailer');
    
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user:  'ishantvithalkar@gmail.com',
            pass: '1Bamhazarkam!'
        }
});

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Ishant Vithalkar <ishantvithalkar@gmail.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: message, // plaintext body
    attachments: [{
            filename : req.file['filename'],
            path : req.file['path']
    }]
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
 res.redirect('/');  
 res.end();   
});

module.exports = router;