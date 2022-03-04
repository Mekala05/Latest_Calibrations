const config = require("./../config");
// var sql = require("mssql");

let configExport = {};


configExport.dbConfig = {
    'username': "calibration_test",
    'password': "p@ssw0rd",
    'database': "Test_16_Dec",
    host: 'localhost',
    port: 1433,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,
        validateBulkLoadParameters: true,
        useUTC: false,
        dateFirst: 1,
      },
    },
    define: {
        timestamps: false
    }
}



module.exports = configExport