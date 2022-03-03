module.exports = function(sequelize, DataTypes) {
    let CalibrationReport = sequelize.define('CalibrationReport', {

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
            field: 'InstrumentCode'
        },
        InstrumentName:{
            type: DataTypes.STRING(250),
            field: 'InstrumentName'
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
            field: 'masterspecification'
        },
        CurrentLocation:{
            type: DataTypes.STRING(250),
            field: 'CurrentLocation'
        },
        MxLifeTime:{
            type: DataTypes.STRING(250),
            field: 'MxLifeTime'
        },

        MxLifeTimeNumber:{
            type: DataTypes.STRING(250),
            field: 'MxLifeTimeNumber'
        },

        date:{
            type: DataTypes.STRING(250),
            field: 'date'
        },
        Location:{
            type: DataTypes.STRING(250),
            field: 'Location'
        },
        file:{
            type: DataTypes.STRING(250),
            field: 'file'
        },
        active:{
            type: DataTypes.STRING(250),
            field: 'active'
        },
        
        amccheckbox:{
            type: DataTypes.BOOLEAN,
            field: 'amccheckbox'
        },
        description: {
            type: DataTypes.BOOLEAN,
            field: 'description'
        },
        specification: {
            type: DataTypes.STRING(250),
            field: 'specification'
        },
        observation:{
            type: DataTypes.STRING(250),
            field: 'observation'
        },
        remark:{
            type: DataTypes.STRING(250),
            field: 'remark'
        },

        fileErrorDiscription:{
            type: DataTypes.STRING(250),
            field: 'fileErrorDiscription'
        },

        InstrumentRefferenceCode:{
            type: DataTypes.STRING(250),
            field: 'InstrumentRefferenceCode'
        },
        SAPRefferenceCode:{
            type: DataTypes.STRING(250),
            field: 'SAPRefferenceCode'
        },
        Department:{
            type: DataTypes.STRING(250),
            field: 'Department'
        },

        dueDate:{
            type: DataTypes.STRING(250),
            field: 'dueDate'
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
            tableName:'CalibrationReport'
        })
        
        return CalibrationReport
    }