module.exports = function (sequelize, DataTypes) {
    let OUDP = sequelize.define(
        "OUDP",
        {
            id: {
                type: DataTypes.INTEGER(11).UNSIGNED,
                field: "id",
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            Name: {
                type: DataTypes.STRING(50),
                field: "Name",
            },
            Code: {
                type: DataTypes.STRING(50),
                field: "Code",
            },

            created_By: {
                type: DataTypes.STRING(50),
                field: "created_By",
            },
            updatedBy: {
                type: DataTypes.STRING(50),
                field: "updated_by",
            },
            deletedBy: {
                type: DataTypes.STRING(50),
                field: "deleted_by",
            },
            deleteStatus: {
                type: DataTypes.BOOLEAN,
                field: "delete_status",
                defaultValue: false,
            },


        },
        {
            timestamps: true,
            tableName: "OUDP",
        }
    );



    return OUDP;
};
