var express = require('express')
const router = express.Router()

var upload = require("../file_Upload");
// const { Op } = require("sequelize");

// router.use('/auth', require('./user'))
router.use('/auth', require('./ohem'))

router.use('/ohem', require('./ohem'))
// router.use('/ohem', require('./user'))
router.use('/category', require('./CategoryMaster'))
// router.use('/header', require('./upload'))
// router.use('/attachment', require('./upload'))

router.use('/type', require('./TypeMaster'))
router.use('/make', require('./MakeMaster'))
router.use('/instrument', require('./InstrumentMaster'))
router.use('/equipment', require('./EquipmentMaster'))
router.use('/gauges', require('./GaugesMaster'))
router.use('/master', require('./master'))
router.use('/calibrationmaster', require('./Calibration_Master'))
router.use('/header', require('./Calibration_Master'))
router.use('/attachment', require('./Calibration_Master'))


router.use('/monthlyReport', require('./Monthly_report'))
router.use('/CalibrationRequest', require('./CalibrationEntiresRequest'))
router.use('/RaiseDC', require('./RaiseDC'))

router.use('/CalibrationEntry', require('./CalibrationEntry'))
router.use('/CalibrationRequestType', require('./calibrationRequestType'))
router.use('/CalibrationLocationMaster', require('./CalibrationLocationMaster'))
router.use('/BreakageDetails', require('./BreakageDetails'))
router.use('/IssueReturn', require('./IssueReturn'))
router.use('/Return', require('./Return'))
router.use('/BreakageRequest', require('./BreakageRequest'))
router.use('/BreakageListDetails', require('./BreakageListDetails'))
router.use('/ReturnList', require('./ReturnList'))
router.use('/ScrapApproval', require('./ScrapApproval'))
router.use('/ScrapApprovalList', require('./ScrapApprovalList'))
router.use('/calibrationtype', require('./calibrationtype'))
router.use('/CalibrationMasterList', require('./CalibrationMasterList'))
router.use('/CalibrationReport', require('./CalibrationReport'))
router.use('/CalibrationMasterListReport', require('./CalibrationMasterListReport'))
router.use('/useraccess', require('./useraccess'))
router.use('/iddescription', require('./iddescription'))




module.exports = router;
