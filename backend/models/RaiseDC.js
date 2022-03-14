module.exports = function(sequelize, DataTypes) {
    let RaiseDC = sequelize.define('RaiseDC', {
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
        RequestType:{
            type: DataTypes.STRING(250),
            field: 'RequestType'
        },

        calibrationtype:{
            type: DataTypes.STRING(250),
            field: 'calibrationtype'
        },

        BreakageNo:{
            type: DataTypes.STRING(250),
            field: 'BreakageNo'
        },
        refno: {
            type: DataTypes.STRING(11),
            field: 'refno',
        },

        InstrumentName:{
            type: DataTypes.STRING(250),
            field: 'InstrumentName'
        },
        InstrumentCode:{
            type: DataTypes.STRING(250),
            field: 'InstrumentCode'
        },
        
        LPIdentification:{
            type: DataTypes.STRING(250),
            field: 'LPIdentification'
        },
        Party:{
            type: DataTypes.STRING(250),
            field: 'party'
        },
    //    Quantity:{
    //         type: DataTypes.STRING(250),
    //         field: 'Quantity'
    //     },

    calibrationlocation:{
        type: DataTypes.STRING(250),
        field: 'calibrationlocation'
    },
        RaiseDc:{
            type: DataTypes.STRING(250),
            field: 'RaiseDc'
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
            tableName:'RaiseDC'
        })
        
        return RaiseDC
    }    