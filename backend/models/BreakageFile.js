const { BreakageFile } = require(".")

module.exports = function (sequelize, DataTypes) {
    let BreakageFile = sequelize.define('BreakageFile', {
        breakageNo: {
            type: DataTypes.STRING(250),
            field: 'breakageNo',
        },
        InstrumentCode: {
            type: DataTypes.STRING(250),
            field: 'InstrumentCode',
        },
        // instrumentName: {
        //     type: DataTypes.STRING(250),
        //     field: 'instrumentName',
        // },
        // ErrorReferenceCode: {
        //     type: DataTypes.STRING(250),
        //     field: 'ErrorReferenceCode'
        // },
        filename: {
            type: DataTypes.STRING(250),
            field: 'filename',
        },
        filepath: {
            type: DataTypes.STRING(250),
            field: 'filepath',
        },
        type: {
            type: DataTypes.STRING(250),
            field: 'type',
        },
        active: {
            type: DataTypes.BOOLEAN,
            field: 'active'
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
            timestamps: true,
            tableName: 'BreakageFile'
        })


    return BreakageFile

}