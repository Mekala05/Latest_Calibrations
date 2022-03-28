const { ImageAttachment } = require(".")

module.exports = function (sequelize, DataTypes) {
    let ImageAttachment = sequelize.define('ImageAttachment', {

        instrumentCode: {
            type: DataTypes.STRING(250),
            field: 'instrumentCode',
        },
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
            tableName: 'ImageAttachment'
        })


    return ImageAttachment



}