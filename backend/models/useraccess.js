module.exports = function (sequelize, DataTypes) {
    let useraccess = sequelize.define('useraccess', {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },

        moduleid: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'moduleid',
            // autoIncrement: true,
            // primaryKey: true,
            // allowNull: false
        },
        ModuleidDescription: {
            type: DataTypes.STRING(250),
            field: 'ModuleidDescription',

        },

        employeeid: {
            type: DataTypes.STRING(250),
            field: 'employeeid',
        },

        view: {
            type: DataTypes.BOOLEAN,
            field: 'view',
        },

        Edit: {
            type: DataTypes.BOOLEAN,
            field: 'Edit',
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
            tableName: 'useraccess'
        })


    return useraccess

}