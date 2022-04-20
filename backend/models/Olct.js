module.exports = function (sequelize, DataTypes) {
  let OLCT = sequelize.define(
    "OLCT",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Code: {
        type: DataTypes.STRING(250),
        field: "Code",

      },
      Location: {
        type: DataTypes.STRING(250),
        field: "Location",

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
      tableName: "OLCT",
    }
  );



  return OLCT;
};
