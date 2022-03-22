const { Model } = require('sequelize');
const Sequelize = require('sequelize');
const op = require('sequelize').op;
const { dbConfig, dbConfigTest } = require('../startup')
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)

let models = {};

// models.User = require("./user.js")(sequelize, Sequelize)
models.User = require("./ohem.js")(sequelize, Sequelize)
models.CategoryMaster = require("./CategoryMaster.js")(sequelize, Sequelize)
models.TypeMaster = require("./TypeMaster.js")(sequelize, Sequelize)
models.EquipmentMaster = require("./EquipmentMaster.js")(sequelize, Sequelize)
models.GaugesMaster = require("./GaugesMaster.js")(sequelize, Sequelize)
models.InstrumentMaster = require("./InstrumentMaster.js")(sequelize, Sequelize)
models.MakeMaster = require("./MakeMaster.js")(sequelize, Sequelize)
models.TypeMaster = require("./TypeMaster.js")(sequelize, Sequelize)
models.CalibrationMaster_1 = require("./Calibration_Master_Model_1")(sequelize, Sequelize)
models.CalibrationRequest = require("./CalibrationRequestType")(sequelize, Sequelize)
models.CalibrationEntiresRequest = require("./CalibrationEntriesRequest")(sequelize, Sequelize)
models.RaiseDC = require("./RaiseDC")(sequelize, Sequelize)
models.CalibrationEntry = require("./CalibrationEntry")(sequelize, Sequelize)
models.CalibrationRequestType = require("./CalibrationRequestType")(sequelize, Sequelize)
models.CalibrationLocationMaster = require("./CalibrationLocationMaster")(sequelize, Sequelize)
models.BreakageDetails = require("./BreakageDetails")(sequelize, Sequelize)
models.IssueReturn = require("./IssueReturn")(sequelize, Sequelize)
models.Return = require("./Return")(sequelize, Sequelize)
models.BreakageRequest = require("./BreakageRequest")(sequelize, Sequelize)
models.BreakageListDetails = require("./BreakageListDetails")(sequelize, Sequelize)
models.ReturnList = require("./ReturnList")(sequelize, Sequelize)
models.ScrapApproval = require("./ScrapApproval")(sequelize, Sequelize)
models.ScrapApprovalList = require("./ScrapApprovalList")(sequelize, Sequelize)
models.calibrationtype = require("./calibrationtype")(sequelize, Sequelize)
models.Olct = require("./Olct")(sequelize,Sequelize)
models.oitm = require("./oitm")(sequelize,Sequelize)
models.odep = require("./odep")(sequelize,Sequelize)
models.ohem = require("./ohem")(sequelize,Sequelize)
models.OCRD = require("./OCRD")(sequelize,Sequelize)
models.OMAC = require("./OMAC")(sequelize,Sequelize)
models.CalibrationMasterList = require("./CalibrationMasterList")(sequelize,Sequelize)
models.monthly_shedule= require("./monthly_shedule")(sequelize,Sequelize)
models.CalibrationReport = require("./CalibrationReport")(sequelize,Sequelize)
models.CalibrationMasterListReport = require("./CalibrationMasterListReport")(sequelize,Sequelize)






models.User.sync();
// models.User.sync();
models.CategoryMaster.sync();
models.TypeMaster.sync();
models.EquipmentMaster.sync();
models.GaugesMaster.sync();
models.InstrumentMaster.sync();
models.MakeMaster.sync();
models.TypeMaster.sync();
models.CalibrationMaster_1.sync();
models.CalibrationRequest.sync();
models.CalibrationEntiresRequest.sync();
models.CalibrationEntry.sync();
models.CalibrationRequestType.sync();
models.CalibrationLocationMaster.sync();
models.BreakageDetails.sync();
models.IssueReturn.sync();
models.Return.sync();
models.BreakageRequest.sync();
models.BreakageListDetails.sync();
models.ReturnList.sync();
models.ScrapApproval.sync();
models.ScrapApprovalList.sync();
models.calibrationtype.sync();
models.Olct.sync();
models.oitm.sync();
models.odep.sync();
models.ohem.sync();
models.OCRD.sync();
models.OMAC.sync();
models.CalibrationMasterList.sync();
models.monthly_shedule.sync();
models.CalibrationReport.sync();
models.CalibrationMasterListReport.sync();
models.RaiseDC.sync();










Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models)
    }
})


models.sequelize = sequelize
models.Sequelize = Sequelize



module.exports = models;