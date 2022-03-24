module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    "OHEM",
    {
      empID: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        field: 'empID',
        // autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: "firstName",
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: "lastName",
      },
      jobTitle: {
        type: DataTypes.STRING(50),
        field: "jobTitle",
      },
      dept: {
        type: DataTypes.STRING(50),
        field: "dept",
      },
      branch: {
        type: DataTypes.STRING(50),
        field: "branch",
      },

      U_U_UserName: {
        type: DataTypes.STRING(50),
        field: "U_U_UserName",
      },
      U_U_UserPWD: {
        type: DataTypes.STRING(50),
        field: "U_U_UserPWD",
      },
      U_userpassC: {
        type: DataTypes.STRING(50),
        field: "U_userpassC",
      },
      U_usernameC: {
        type: DataTypes.STRING(50),
        field: "U_usernameC",
      }
    },
    {
      tableName: "OHEM",
    }
  );


  User.checkLogin = function (email, password) {
    // console.log("email", typeof email, "pass", typeof password);

    return new Promise((resolve, reject) => {
      User.findOne({ where: { U_usernameC: email, U_userpassC: password } }).then(result => {
        // console.log(result)

        // console.log("CHekkkkk"+result.U_U_UserPWD);
        if (!result) {
          return reject('Email not registred!')
        }
        // console.log("REsult Data");
        resolve(result)

      }).catch(reject)
    })
  }
  return User;
};


