'use strict'
const PassportLocalStrategy = require('passport-local').Strategy;
const { User } = require('./../../models');

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, callback) => {
    console.log("wwwwwww"+email);
    const userData = {

        email: email.toLowerCase(),
        password: password,
        name: req.body.name,
        userRole:req.body.userRole,
        // department: (req.body.department)?req.body.department.trim():'',
        // unit:(req.body.unit)?req.body.unit.trim():'',
       
    }
   

   
    User.create(userData).then(result => {
        callback({success : true, data: result})
    }).catch(function(err) {
        callback({ success : false, data : err, message : err.message})
    })
})