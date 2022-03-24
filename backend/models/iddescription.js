const { iddiscription } = require(".")

module.exports = function (sequelize, DataTypes) {
    let iddescription = sequelize.define('iddiscription', {

        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        moduleId: {
            type: DataTypes.STRING(250),
            field: 'moduleId',
        },
        moduleDescription: {
            type: DataTypes.STRING(250),
            field: 'moduleDescription'
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
            tableName: 'iddescription'
        })


    return iddescription



}