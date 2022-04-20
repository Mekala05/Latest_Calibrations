const CalibrationLocationMaster = require("./CalibrationLocationMaster")

module.exports = function (sequelize, DataTypes) {
    let EntryError = sequelize.define('EntryError', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        InstrumentCode: {
            type: DataTypes.STRING(250),
            field: 'InstrumentCode'
        },
        InstrumentName: {
            type: DataTypes.STRING(250),
            field: 'InstrumentName',
        },
        active: {
            type: DataTypes.BOOLEAN,
            field: 'active'
        },
        Description: {
            type: DataTypes.STRING(250),
            field: 'Description',
        },
        Specification: {
            type: DataTypes.STRING(250),
            field: 'Specification',
        },
        Observation: {
            type: DataTypes.STRING(250),
            field: 'Observation',
        },
        Remark: {
            type: DataTypes.STRING(250),
            field: 'Remark',
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
            tableName: 'EntryError'
        })
    return EntryError
}