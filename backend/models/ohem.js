module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define(
    "OHEM",
    {
      empID: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        field: 'empID',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      U_U_UserName: {
        type: DataTypes.STRING(50),
        field: "U_U_UserName",
      },
      U_U_UserPWD: {
        type: DataTypes.STRING(50),
        field: "U_U_UserPWD",
      }
    },
    {
      tableName: "OHEM",
    }
  );


  User.checkLogin = function (email, password) {
    console.log("email", typeof email, "pass", typeof password);

    return new Promise((resolve, reject) => {
      User.findOne({ where: { U_U_UserName: email, U_U_UserPWD: password } }).then(result => {
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


