'use strict'
const jwt = require('jsonwebtoken')
const PassportLocalStrategy = require('passport-local').Strategy
const { User } = require('./../../models')
const config = require('./../../config')

module.exports = new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password
    }
    console.log("front end" + "  " + userData.email);
    console.log("front end" + "  " + userData.password);
    User.checkLogin(userData.email, userData.password).then(result => {
        console.log("result", result);
        if (result.deleteStatus) {
            return done("enter valid credentials")
        } else {
            const token = jwt.sign({ sub: result.id }, config.JWT_SECRET, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 24) })
            return done(null, token, { name: result.U_usernameC, userRole: result.userRole, logRole: result.logRole, id: result.empID, unit: result.unit, department: result.department })

        }


    }).catch(err => {
        return done(err)
    })
})
