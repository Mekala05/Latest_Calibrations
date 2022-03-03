const express = require('express')
const router = express.Router()
const passport = require('passport')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
var bcrypt = require('bcrypt')
const { User } = require('./../models')
const config = require('./../config')
var nodemail = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
const { Op } = require('sequelize')
const ohem = require('../models/ohem')

function sendError(res, err) {
    var result = {
        "success": false,
        "error": err,
    };
    return res.json(result);
}

function sendSuccess(res, result) {
    var finalResult = {
        "success": true,
        "data": result,
    };
    return res.json(finalResult);
}

function sendMail(data, callback) {

    var transporter = nodemail.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'vijayalakshmi.s@indusnovateur.com',
            pass: 'Strong@098'
        }
    }));

    var mailOptions = {
        from: 'vijayalakshmi.s@indusnovateur.com',
        to: 'vijayalakshmi.s@indusnovateur.com',
        // subject : 'CEO Approved',
        subject: data.subject,
        html: data.html

    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(false);
        } else {
            callback(true);
        }
    })
}



router.put('/userUpdate/:revid/:usrid', (req, res) => {
    return new Promise((resolve, reject) => {
        // req.body.reviewerApproval= "initiate"
        data = {
            active: true,
        }
        User.update(data, { where: { id: req.params.revid } }).then(function (result) {
            User.update({ userRole: "reviewer" }, { where: { id: req.params.usrid } }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/login', (req, res, next) => {
    



    return passport.authenticate('local-login', (err, token, user) => {
        // console.log(token);

        if (err) {

            return res.send({
                success: false,
                message: err,
                error: err
            })
        }
        if (!token) {
            return res.send({
                success: false,
                message: 'Please enter credentials!!',
                error: 'Please enter credentials!!'
            })
        }
        return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user
        })

    })(req, res, next)
})

router.post('/resend', (req, res, next) => {
    User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user && !user.emailConfirmed) {
            sendMail({
                to: req.body.email,
                subject: 'Email Confirmation',
                html: 'Hello ' + req.body.name + '! Welcome to Paasmer! Your token is:\n\n' + user.emailConfirmationToken + '\n\n' +
                    'Or you can click this link to validate your email: <a href="http://192.168.1.108:3000/api/user/validate?token=' + user.emailConfirmationToken + '"> Click here </a>'
            }, (status) => {
                if (!status) {
                    return res.json({
                        success: false,
                        message: 'Failed to send mail.',
                        errors: { "error": "Failed to send mail." }
                    })
                }
                return res.status(200).json({
                    success: true
                })
            })
        }
        else {
            return res.json({
                success: false,
                message: 'User not found or already is validated.'
            })
        }
    }).catch(function (err) {
        sendError(res, err);
    });
})

function signupProcess(req, res, next) {
    return passport.authenticate('local-signup', (result) => {
        console.log("singup"+result);


        if (result == null) {
            return res.json({
                success: false,
                message: 'Please fill all the details!'
            })
        }
        if (!result.success) {
            if (result.message != null) {
                return res.json({
                    success: false,
                    message: result.message
                })
            } else {
                return res.json({
                    success: false,
                    message: "Unknown error occurred!"
                })
            }
        }

        crypto.randomBytes(20, (err, buf) => {
            if (err) {
                return next(err)
            }
            const token = buf.toString('hex');
            var domainRef = 'localhost:3000';
            var domainName = 'http://' + domainRef + '/api/user/validate?token=' + token

            // User.update({emailConfirmationToken: token},{where: {email:"chandru2316.ironman@gmail.com"}}).then((myres) => {
            // sendMail({
            //     to: req.body.email,
            //     subject: 'Email Confirmation',
            //     html: 'Hello ' + req.body.name + '!\n\n Welcome to Paasmer!\n\n Your token is: ' + token/* + '. Or you can click this link to validate your email. ' + domainName*/

            // }, (status) => {
            //     if (!status) {
            //         return res.json({
            //             success: false,
            //             message: 'Failed to send mail.',
            //             errors: {}
            //         })
            //     }
            // })
            return res.status(200).json({
                success: true,
                message: 'You have successfully signed up! Please verify your email before logging in.',
                errors: {}
            })
            // }).catch(next)
        })
    })(req, res, next)
}

router.post('/signup', (req, res, next) => {
    if (req.body.name == '' || req.body.name == null || !req.body.name) {
        return res.json({
            success: false,
            message: "Please enter name!!",
        })
    } else if (req.body.name.length < 3) {
        return res.json({
            success: false,
            message: "Name required minimun three characters!!",
        })
    } else if (req.body.email == null || req.body.email == "") {
        return res.json({
            success: false,
            message: "Please enter email!!",
        })
    } else if (req.body.password == null || req.body.password.length < 4) {
        return res.json({
            success: false,
            message: "Password requires atleast four characters!!",
        })
    }

    signupProcess(req, res, next);

})
router.get('/userdetails', (req, res) => {
    return new Promise((resolve, reject) => {
        User.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})






router.post('/forgot', (req, res, next) => {
    let email = req.body.email;
    return new Promise((resolve, reject) => {
        User.findOne({ where: { email: email } }).then(user => {
            if (!user) {
                return res.json({
                    success: false,
                    message: 'No account with that email address.',
                    errors: { "error": "No account with that email address." }
                })
            }
            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var toStringDate = tomorrow.toString();
            return User.update({ passwordResetToken: crypto.randomBytes(20).toString('hex'), passwordResetExpires: toStringDate }, { where: { email: req.body.email } }).then(function () {
                User.findOne({ where: { email: email } }).then(updatedUser => {
                    sendMail({
                        to: 'vijayalakshmi.s@indusnovateur.com',
                        subject: 'Password Reset',
                        html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Your reset token is: <br><br>' + updatedUser.passwordResetToken + '<br><br>' +
                            'If you did not request this, please ignore this email and your password will remain unchanged. <br>' +
                            'Your token will expire at ' + updatedUser.passwordResetExpires + '.'
                    }, (status) => {
                        if (!status) {
                            return res.json({
                                success: false,
                                message: 'Failed to send mail.',
                                errors: { "error": "Failed to send mail." }
                            })
                        }
                        return res.json({
                            success: true,
                            message: 'Reset token sent! Please check your email.',
                            errors: {}
                        })
                    })
                });
            }).catch(function (err) {
                sendError(res, err);
            });
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})

router.post('/validate', (req, res, next) => {
    try {
        User.update({ emailConfirmed: true }, { where: { emailConfirmationToken: req.body.token } }).then(result => {
            if (result) {
                User.findOne({ where: { emailConfirmationToken: req.body.token } }).then(result1 => {

                    if (result1) {
                        User.validateEmail(result1.email).then(result3 => {
                            return res.json({ success: true, message: 'token is vefied' })
                        })
                    }
                    else {
                        return res.json({ success: false, message: 'worng token' })
                    }
                })
            }
            else {
                return res.json({ success: false, message: 'wrong token' })
            }
        })
    }
    catch (err) {
        sendError(res, err);
    }
})

router.get('/validate', (req, res, next) => {
    User.validateEmail(req.query.token).then((result, reason) => {
        if (result) {
            res.end('Email successfully validated. You can now continue to login.')
        } else {
            res.end('Validation code has expired or is not valid. ' + reason)
        }
    }).catch(function (err) {
        sendError(res, err);
    });
})

// router.get('/test',(req,res)=>{
//     console.log("11111111");
//     res.send("test");
//     console.log("2222222");

// })
async function encryptPwd(pwd) {
    bcrypt.hash(pwd, 8, async (err, hash) => {
        return await hash;
        // console.log(hash);

    })
}

router.put('/resetchk', async (req, res) => {
    // return new Promise(async (resolve, reject) => {
    await User.findOne({ where: { passwordResetToken: req.body.token } }).then(async function (result) {

        console.log(result.passwordResetExpires)
        expDate = new Date(result.passwordResetExpires)
        if (expDate > new Date()) {
            console.log("valid")
            console.log(req.body);
            await User.update({
                password: bcrypt.hashSync(req.body.password, 8, async (err, hash) => {
                    return await hash;

                })
            }, { where: { id: result.id } }).then(function (userResult) {
                sendSuccess(res, userResult);
            }).catch(function (err) {
                sendError(res, err);
            });
        } else {
            data = {
                msg: "Token Expired!"
            }
            console.log("invalid");
            sendError(res, data);

        }
        // sendSuccess(res, result);
    }).catch(function (err) {
        sendError(res, err);
    });
    // })  
})


router.post('/changepassword', (req, res, next) => {
    User.changePassword(req.body.token, req.body.newPassword).then(result => {
        if (result) {
            res.json({
                success: true,
                message: 'Password successfully changed.',
                errors: {}
            })
        } else {
            res.json({
                success: false,
                message: 'Invalid token.',
                errors: {}
            })
        }
    }).catch(function (err) {
        sendError(res, err);
    });
})

router.put('/delete/:id', (req, res) => {
    return new Promise((resolve, reject) => {
        req.body.email = ""
        User.update(req.body, { where: { id: req.params.id } }).then(function (result) {
            sendSuccess(res, result);
        }).catch(function (err) {
            sendError(res, err);
        });
    })
})


router.get('/view', (req, res) => {
    return new Promise((resolve, reject) => {
        TypeMaster.findAll({ where: {deleteStatus: false }  }).then(function (result) {
                sendSuccess(res, result);
            }).catch(function (err) {
                sendError(res, err);
            });
        })  
   
})


// router.get('/viewemail', (req, res) => {
//     return new Promise((resolve, reject) => {
//         ohem.findAll({
//             attributes: ['Email'],
//         }).then(function (result) {
//                 sendSuccess(res, result);
//             }).catch(function (err) {
//                 sendError(res, err);
//             });
//         })  
   
// })


module.exports = router;

