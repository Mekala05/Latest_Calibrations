module.exports = function(sequelize, DataTypes) {
    let CalibrationEntry = sequelize.define('CalibrationEntry', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            field: 'date'
        },

        ScheduleNo:{
            type: DataTypes.STRING(250),
            field: 'ScheduleNo'
        },
        InstrumentCode:{
            type: DataTypes.STRING(250),
            field: 'InstrumentCode'
        },

        InstrumentName:{
            type: DataTypes.STRING(250),
            field: 'InstrumentName'
        },
        // LPIdentification:{
        //     type: DataTypes.STRING(250),
        //     field: 'LPIdentification'
        // },

        partySelection:{
            type: DataTypes.STRING(250),
            field: 'partySelection'
        },
    //    Quantity:{
    //         type: DataTypes.INTEGER(11),
    //         field: 'Quantity'
    //     },
        

        collabrationCost:{
            type: DataTypes.FLOAT(250,2),
            field: 'collabrationCost'
        },
       
        DCDetails:{
            type: DataTypes.STRING(250),
            field: 'DCDetails'
        },

        ReportNo:{
            type: DataTypes.STRING(250),
            field: 'ReportNo'
        },

        ReportDate:{
            type: DataTypes.DATE,
            field: 'ReportDate'
        },
        RequestType:{
            type: DataTypes.STRING(250),
            field: 'RequestType'
        },
        // description: {
        //     type: DataTypes.BOOLEAN,
        //     field: 'description'
        // },

        Description: {
            type: DataTypes.STRING(250),
            field: 'Description'
        },
        Specification: {
            type: DataTypes.STRING(250),
            field: 'Specification'
        },
        Observation:{
            type: DataTypes.STRING(250),
            field: 'Observation'
        },
        Remark:{
            type: DataTypes.STRING(250),
            field: 'Remark'
        },
        status:{
            type: DataTypes.STRING(250),
            field: 'Status'
        },
        option:{
            type: DataTypes.STRING(250),
            field: 'Option'
        },
        ReferenceCode:{
            type: DataTypes.STRING(250),
            field: 'ReferenceCode'
        },
        conditionRemark:{
            type: DataTypes.STRING(500),
            field: 'conditionRemark'
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
            tableName:'CalibrationEntry'
        })
        
        return CalibrationEntry
    }