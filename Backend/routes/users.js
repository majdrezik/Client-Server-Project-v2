const router = require('express').Router();
const { encrypt, decrypt } = require('../crypto');
var Recaptcha = require('express-recaptcha').RecaptchaV2;
var recaptcha = new Recaptcha('6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe', '6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe');
var Request = require("request");
let PromoCode = require('../models/PromoCode.model');
let User = require('../models/user.model');
var nodemailer = require('nodemailer');
var valdiation = require('../validations.js')
var activations= []
var resetPasswords= []
var emailChange= []
//commit


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/activate').get((req, res) => {
  try {
  const firstname = decrypt(req.query.a);
  const lastname = decrypt(req.query.b);
  const email = decrypt(req.query.c);
  const password = req.query.d
  const promocode = decrypt(req.query.e);
  const code = decrypt(req.query.f);
  var index= -1;//activations.indexOf({email, code});
  for(var i=0; i< activations.length; i++){
    if(activations[i].email==email && activations[i].code==code){
      index = i;
      break;
    }
  }
  console.log(activations)
  if(index<0)
  {
    res.send("Link has been expired, please try again");
    return;
  }
  activations.splice(index,1);
  const newUser = new User({
      Name: firstname,
      FamilyName: lastname,
      Email: email,
      Password: password,
      PromoCode: promocode
  });
  console.log(newUser);
  newUser.save()
  .then(() => {
    res.send("Your account Have created succefully!!")
    })
  .catch(err => res.send('Error: ' + err));
  }catch (error) {
    console.log(error);
    res.send("Link has been expired, please try again");
  }


});


router.route('/confirmemail').get((req, res) => {
  try {
  const oldEmail = decrypt(req.query.a);
  const code = decrypt(req.query.b);
  const newEmail = decrypt(req.query.c);
  var index= -1;
  for(var i=0; i< emailChange.length; i++){
    if(emailChange[i].email==oldEmail && emailChange[i].code==code){
      index = i;
      break;
    }
  }
  console.log(emailChange)
  if(index<0)
  {
    res.send("Link has been expired, please try again");
    return;
  }
  emailChange.splice(index,1);
 
 


  User.updateOne({Email:oldEmail}, {$set:{Email:newEmail}}, function(err, result) {
    if (err)
    {
      console.log(err);
      res.send("Cant Update Email, please try again");

    }
    else{

      console.log(result);
      res.send("Your Email Has been Updated successfully!!")
      var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
    });
    var mailOptions = {
        from: 'csprojecttest@hotmail.com',
        to: newEmail,
        subject: "Email Updated",
        text: "Your Email has been updated!!",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    }
  });


  }catch (error) {
    console.log(error);
    res.send("Link has been expired, please try again");
  }


});

router.route('/update-password').post((req, res) => {
  try {
  const email = decrypt(req.query.a);
  const code = decrypt(req.query.b);
  valditateresult = valdiation.ValidatePassword(req.body.password);
  if (valditateresult != "") {
    res.send(valditateresult);
    return;
  }
  password= encrypt(req.body.password);
  var index= -1;//activations.indexOf({email, code});
  for(var i=0; i< resetPasswords.length; i++){
    if( resetPasswords[i]!=null && resetPasswords[i].email==email && resetPasswords[i].code==code){
      index = i;
      break;
    }
  }
  console.log(resetPasswords)
  if(index<0)
  {
    res.send("Link has been expired, please try again");
    return;
  }
  resetPasswords.splice(index,1);


  User.updateOne({Email:email}, {$set:{Password:password}}, function(err, result) {
    if (err)
    {
      console.log(err);
      res.send("Cant Reset Password, please try again");

    }
    else{

      console.log(result);
      res.send("Your Password Has been Updated successfully!!")
      var transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
    });
    var mailOptions = {
        from: 'csprojecttest@hotmail.com',
        to: email,
        subject: "Password Updated",
        text: "Your Password has been updated!!",
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    }
  });
}catch(error){
  console.log("error: " + error);
  res.send("Please try again later");
}

});

router.route('/updatepofileemail').post((req, res) => {
  const email=req.body.Email;
  const newEmail=req.body.newEmail;
  validateRes = valdiation.ValidateEmail(newEmail);
  if(validateRes!="")
  {
    res.send(validateRes);
    return;
  }
  
  const encryptedEmail= encrypt(email);
  const encryptednewEmail= encrypt(newEmail);
  const code = Math.floor(Math.random() * (99999 - 10000) + 10000)+""
  const encryptedCode= encrypt(code)
  var index= -1;//activations.indexOf({email, code});
  for(var i=0; i< emailChange.length; i++){
    if(emailChange[i].email==email ){
      index = i;
      break;
    }
  }
  if(index!=-1){
    emailChange.splice(index,1);
  }
  emailChange.push({email,code})

  var link="http://localhost:3000/update-email?a="+encryptedEmail+"&b="+encryptedCode+"&c="+encryptednewEmail;
  res.send('Email Change Confirmation mail was sent. Please check your mail address');


  var transporter = nodemailer.createTransport({
      service: 'outlook',
      auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
  });
  var mailOptions = {
      from: 'csprojecttest@hotmail.com',
      to: email,
      subject: "Update Email",
      text: "Please Click in the link below to Confirm updating email\n"+link,
  };
  transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
          console.log(error);
      } else {
          console.log('Email sent: ' + info.response);
      }
  });

  var mailOptions1 = {
    from: 'csprojecttest@hotmail.com',
    to: newEmail,
    subject: "Update Email",
    text: "Please Click in the link below to Confirm updating email\n"+link,
};
transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

});


router.route('/updatepofiledetails').post((req, res) => {
  const email=req.body.Email;
  console.log(email)
  try {
    User.updateOne({Email:email}, {$set:{
      Name:req.body.Name ,
      FamilyName:req.body.FamilyName ,
      City:req.body.City ,
      PhoneNumber:req.body.PhoneNumber ,
      Street:req.body.Street ,
      ZipCode:req.body.ZipCode ,
      Country: req.body.Country
    }}, function(err, result) {
      if (err)
      {
        console.log(err);
        res.send("Cant Update Profile, please try again");
      }
      else{
  
        console.log(result);
        res.send("Your Profile Has been Updated successfully!!")
        var transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
      });
      var mailOptions = {
          from: 'csprojecttest@hotmail.com',
          to: email,
          subject: "Profile Updated",
          text: "Your Profile has been updated!!",
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
      });
  
      }
    });

  }
  catch(error){
    console.log(error)
  }
});

router.route('/updatepofilepassword').post((req, res) => {
  try {
  email = req.body.email;
  oldPassword= req.body.oldPassword;
  newPassword= req.body.newPassword;
  rePassword= req.body.rePassword;

  if(rePassword!=newPassword){
    res.send("Password and rePassword are not match");
    return;
  }

  valditateresult = valdiation.ValidatePassword(newPassword);
  if (valditateresult != "") {
    res.send(valditateresult);
    return;
  }

  User.find({})//{Email: email, Password: password}
  .then((users => { 
    user ={}
    for (var index = 0; index < users.length; ++index) {
        var temp = users[index];
        if(temp.Email == email){
          user=temp
          break;
        }
    }
    if(user.Password!= encrypt(oldPassword)){
      res.send("Old Password are not correct!!");
      return;
    }
    encryptedpass=encrypt(newPassword);
    User.updateOne({Email:email}, {$set:{Password:encryptedpass}}, function(err, result) {
      if (err)
      {
        console.log(err);
        res.send("Cant Update Password, please try again");
  
      }
      else{
  
        console.log(result);
        res.send("Your Password Has been Updated successfully!!")
        var transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
      });
      var mailOptions = {
          from: 'csprojecttest@hotmail.com',
          to: email,
          subject: "Password Updated",
          text: "Your Password has been updated!!",
      };
      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
          } else {
              console.log('Email sent: ' + info.response);
          }
      });
  
      }
    });
  

  }))
  .catch(err => {res.status(400).json('Error: ' + err); console.log(err)});
}
catch(error){
console.log(error)
}
}
  );

router.route('/reset-password').post((req, res) => {
  const email = req.body.email;
  var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
  recaptcha_url += "secret=" + '6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe' + "&";
  recaptcha_url += "response=" + req.body.recaptcha ;
  Request(recaptcha_url, function(error, resp, body) {
      body = JSON.parse(body);
      if(body.success !== undefined && !body.success && req.body.recaptcha== null) {
        res.send("Recaptcha Error!!! " +body.success )
      }
      else{

        User.find({Email: email})//{Email: email, Password: password}
        .then((users => { 
            if(users.length<1){
              res.send('Email not found!!');
            }else{ 
        const encryptedEmail= encrypt(email)
        const code = Math.floor(Math.random() * (99999 - 10000) + 10000)+""
        const encryptedCode= encrypt(code)
        var index= -1;//activations.indexOf({email, code});
        for(var i=0; i< resetPasswords.length; i++){
          if(resetPasswords[i].email==email ){
            index = i;
            break;
          }
        }
        if(index!=-1){
          res.send('an email is already has been sended to you email, please check inbox');
          return;
        }
        resetPasswords.push({email,code})

        var link="http://localhost:3000/update-password?a="+encryptedEmail+"&b="+encryptedCode;


            res.send('Reset Password Confirmation mail was sent. Please check your mail address');
            var transporter = nodemailer.createTransport({
                service: 'outlook',
                auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
            });
            var mailOptions = {
                from: 'csprojecttest@hotmail.com',
                to: email,
                subject: "Reset Password",
                text: "Please Click in the link below to reset your password\n"+link,
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
          }}));
      }});
});

router.route('/add').post((req, res) => {
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const email = req.body.email;
  const password = req.body.password;
  const repassword = req.body.repassword;
  const promocode = req.body.promocode;

  var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
  recaptcha_url += "secret=" + '6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe' + "&";
  recaptcha_url += "response=" + req.body.recaptcha ;
  Request(recaptcha_url, function(error, resp, body) {
      body = JSON.parse(body);
      if(body.success !== undefined && !body.success && req.body.recaptcha== null) {
        res.send("Recaptcha Error!!! " +body.success )
      }
      else{

  User.find({Email: email})//{Email: email, Password: password}
  .then((users => { 
      if(users.length>0){
        res.send('This Email is already in the system');
      }else{ 
          PromoCode.find({promoCode: promocode})//{Email: email, Password: password}
          .then((promos => { 
              if(promocode!="" &&promos.length<1){
                res.send('Promo Code are Incorrect!!!');
              }else{
                valditateresult = valdiation.validateSignup(firstname, lastname, email, password, repassword);
                if (valditateresult != "") {
                  res.send(valditateresult);
                  return;
                }
            const encryptedName= encrypt(firstname)
            const encryptedFamilyName= encrypt(lastname)
            const encryptedPassword= encrypt(password)
            const encryptedPromoCode= encrypt(promocode)

            const encryptedEmail= encrypt(email)
            const code = Math.floor(Math.random() * (99999 - 10000) + 10000)+""
            const encryptedCode= encrypt(code)
            var index= -1;//activations.indexOf({email, code});
            for(var i=0; i< activations.length; i++){
              if(activations[i].email==email ){
                index = i;
                break;
              }
            }
            if(index!=-1){
              res.send('an Confirmation email is already has been sended to you email, please check inbox');
              return;
            }
            activations.push({email,code})

            var link="http://localhost:3000/activate?a="+encryptedName+"&b="+encryptedFamilyName+"&c="+encryptedEmail+"&d="+encryptedPassword+"&e="+encryptedPromoCode +"&f="+encryptedCode;


                res.send('Confirmation mail was sent. Please check your mail address');
                var transporter = nodemailer.createTransport({
                    service: 'outlook',
                    auth: { user: 'csprojecttest@hotmail.com', pass: 'test1234project' }
                });
                var mailOptions = {
                    from: 'csprojecttest@hotmail.com',
                    to: email,
                    subject: "Registration",
                    text: "Hello "+firstname+" "+ lastname+", Please Click in the link below to activate your account\n"+link,
                    //"<a href='"+link+"'> Click Here </a>\n or copy this link to your browser: " + link,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
              }
            })
            );
          }
        }
        ));
        }
      })
    });

//    } }}}));
//     }));
//   });
// });

router.route('/getuser').post((req, res) => {
  const email = req.body.email.toLowerCase();
  const password = encrypt(req.body.password);
  console.log(email + " " + password);
  var recaptcha_url = "https://www.google.com/recaptcha/api/siteverify?";
  recaptcha_url += "secret=" + '6LdZEOUZAAAAABOhim6Lc8XSEb34nczBkgB2LeOe' + "&";
  recaptcha_url += "response=" + req.body.recaptcha ;
  Request(recaptcha_url, function(error, resp, body) {
      body = JSON.parse(body);
      if(body.success !== undefined && !body.success && (req.body.recaptcha== null||req.body.recaptcha==0)) {
        res.send("Recaptcha Error!!! " +body.success )

      }
      else{
  User.find()//{Email: email, Password: password}
  .then((users => { 
    user ={}
    for (var index = 0; index < users.length; ++index) {
        var temp = users[index];
        if(temp.Email == email && temp.Password == password){
          user=temp
          break;
        }
    }
    res.json(user);
    //console.log("x"+user)
  }))
  .catch(err => {res.status(400).json('Error: ' + err); console.log(err)});
    }
  });
});

module.exports = router;