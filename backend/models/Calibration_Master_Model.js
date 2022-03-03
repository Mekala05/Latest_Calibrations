module.exports = function(sequelize, DataTypes) {
    let CalibrationMaster = sequelize.define('Calibration_Master', {

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

        Location:{
            type: DataTypes.STRING(250),
            field: 'Location'
        },

        SAPRefferenceCode:{
            type: DataTypes.STRING(250),
            field: 'SAPRefferenceCode'
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

        InstrumentRefferenceCode:{
            type: DataTypes.STRING(250),
            field: 'InstrumentRefferenceCode'
        },

        date:{
            type: DataTypes.STRING(250),
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
        
        return CalibrationMaster
    }