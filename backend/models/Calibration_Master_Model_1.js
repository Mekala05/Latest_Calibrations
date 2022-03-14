const CalibrationLocationMaster = require("./CalibrationLocationMaster")

module.exports = function(sequelize, DataTypes) {
    let CalibrationMaster1 = sequelize.define('CalibrationMaster_1', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category:{
            type: DataTypes.STRING(250),
            field: 'category'
        },
        type:{
            type: DataTypes.STRING(250),
            field: 'type'
        },
        MasterType:{
            type: DataTypes.STRING(250),
            field: 'MasterType'
        },
        InstrumentCode:{
            type: DataTypes.STRING(250),
            field: 'InstrumentRefferenceCode'
        },
        InstrumentName:{
            type: DataTypes.STRING(250),
            field: 'InstrumentName',
            // unique : true
        },
        make:{
            type: DataTypes.STRING(250),
            field: 'make'
        },
        range:{
            type: DataTypes.STRING(250),
            field: 'range'
        },
        masterspecification:{
            type: DataTypes.STRING(250),
            field: 'masterspecification',
            // unique : true
            
        },
        SAPRefferenceCode:{
            type: DataTypes.STRING(250),
            field: 'SAPRefferenceCode'
        },

        Location:{
            type: DataTypes.STRING(250),
            field: 'Location'
        },

        CurrentLocation:{
            type: DataTypes.STRING(250),
            field: 'CurrentLocation'
        },

        Department:{
            type: DataTypes.STRING(250),
            field: 'Department '
        },

        date:{
            type: DataTypes.DATE,
            field: 'date'
        },
        MxLifeTime:{
            type: DataTypes.STRING(250),
            field: 'MxLifeTime'
        },
        MxLifeTimeNumber:{
            type: DataTypes.STRING(250),
            field: 'MxLifeTimeNumber'
        },
        file:{
            type: DataTypes.STRING(250),
            field: 'file'
        },
        headerImage: {
            type: DataTypes.STRING(250),
            field: 'headerImage'
        },
        active:{
            type: DataTypes.BOOLEAN,
            field: 'active'
        },
        amccheckbox:{
            type: DataTypes.BOOLEAN,
            field: 'amccheckbox'
        },

         
        dueDate:{
            type: DataTypes.DATE,
            field: 'dueDate'
        }, 

        Description: {
            type: DataTypes.STRING(250),
            field: 'Description',
            // unique : true
        },
        Specification: {
            type: DataTypes.STRING(250),
            field: 'Specification',
            // unique : true
        },

        InstrumentRefferenceCode:{
            type: DataTypes.STRING(250),
            field: 'InstrumentRefferenceCode'
        },
        Observation:{
            type: DataTypes.STRING(250),
            field: 'Observation',
            // unique : true
        },
        Remark:{
            type: DataTypes.STRING(250),
            field: 'Remark',
            // unique : true
        },
        fileErrorDiscription:{
            type: DataTypes.STRING(250),
            field: 'fileErrorDiscription'
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
    },
        {
            timestamps:true,
            tableName:'Calibration_Master'
        })
        // CalibrationLocationMaster.belongsTo(cali, {foreignKey: 'user_id'})
        return CalibrationMaster1
    }