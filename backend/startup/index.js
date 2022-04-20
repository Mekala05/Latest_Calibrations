const config = require("./../config");
// var configure = require('../startup/query');
// var sequelize = require("sequelize");
var sql = require("mssql");


let configExport = {};


configExport.dbConfig = {
  'username': "sa",
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
  },
}

module.exports = configExport
