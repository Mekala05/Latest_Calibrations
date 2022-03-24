const bcrypt = require('bcrypt')


module.exports = function (sequelize, DataTypes) {
    let User = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(250),
            field: 'name'
        },
        email: {
            type: DataTypes.STRING(250),
            field: 'email',
        },
        userRole: {
            type: DataTypes.STRING(250),
            field: 'user_role',
        },
        department: {
            type: DataTypes.STRING(250),
            field: 'department',
        },

        password: {
            type: DataTypes.STRING(250),
            field: 'password'
        },
        passwordResetToken: {
            type: DataTypes.STRING(250),
            field: 'password_reset_token'
        },
        passwordResetExpires: {
            type: DataTypes.STRING(250),
            field: 'password_reset_expires'
        },
        emailConfirmationToken: {
            type: DataTypes.STRING(50),
            field: 'email_confirmation_token'
        },
        emailConfirmed: {
            type: DataTypes.BOOLEAN,
            field: 'email_confirmation',

        },
        active: {
            type: DataTypes.BOOLEAN,
            field: 'active',
            defaultValue: false
        },
        createdBy: {
            type: DataTypes.STRING(50),
            field: 'created_by'
        },
        updatedBy: {
            type: DataTypes.STRING(50),
            field: 'updated_by'
        },
        deletedBy: {
            type: DataTypes.STRING(50),
            field: 'deleted_by'
        },
        deleteStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'delete_status',
            defaultValue: false
        },
        // role: {
        //     type: DataTypes.STRING(50),
        //     allowNull: false
        // },
        // logRole: {
        //     type: DataTypes.STRING(50),
        //     field: 'log_role',
        //     allowNull: false
        // },

    },
        {
            timestamps: true,
            tableName: 'user'
        })


    User.checkLogin = function (email, password) {
        return new Promise((resolve, reject) => {
            console.log("email", typeof email, "pass", typeof password);
            OHEM.findOne({ where: { U_usernameC: email, U_userpassC: password } }).then(result => {
                // console.log("Result Data", result.U_U_UserName);
                // console.log("CHekkkkk",result);
                if (!result) {
                    return reject('Email not registred!')
                }
                resolve(result)
                // bcrypt.compare(password, result.password, (err, matches) => {
                //     // console.log("password"+"  "+password);
                //     // console.log("password"+"  "+result.password);
                //     if (err)
                //         return reject(err)
                //     if (matches === false)
                //         //  console.log(matches);
                //         return reject('Username or password incorrect!!')
                //     // if (!result.emailConfirmed)
                //     //     return reject('Email not verified. Please check your email.')
                //     resolve(result)
                // })


            }).catch(reject)
        })
    }

    // User.afterValidate((user, options) => {
    //     return new Promise((resolve, reject) => {
    //         User.findOne({ where: { email: user.email } }).then(result => {
    //             if (result)
    //                 return reject(new Error('User already exists with that email.'))
    //             resolve(options)
    //         })
    //     })
    // })


    User.beforeCreate((user, options) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 8, (err, hash) => {
                if (err)
                    reject(err)
                user.password = hash
                resolve(options)
            })
        })
    })
    User.beforeUpdate((user, options) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(user.password, 8, (err, hash) => {
                if (err)
                    reject(err)
                user.password = hash
                resolve(options)
            })
        })
    })


    User.validateEmail = function (token) {
        return new Promise((resolve, reject) => {
            try {
                return resolve(true, 'verified sucessfully')
            }

            catch (err) {
                console.log(err);
                return reject(err);
            }
        })
    }


    return User
}