module.exports = function (sequelize, DataTypes) {
  let CategoryMaster = sequelize.define(
    "CategoryMaster",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(250),
        field: "category",
        unique : true
      },

      // usrId: {
      //     type: DataTypes.INTEGER(11).UNSIGNED,
      //     field: 'usr_id'
      // },
      createdBy: {
        type: DataTypes.STRING(50),
        field: "created_by",
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
      tableName: "CategoryMaster",
    }
  );

  CategoryMaster.associate = function (models) {
    CategoryMaster.hasMany(models.InstrumentMaster, {
      foreignKey: "categoryId",
    });
    CategoryMaster.hasMany(models.EquipmentMaster, {
      foreignKey: "categoryId",
    });
    CategoryMaster.hasMany(models.GaugesMaster, { foreignKey: "categoryId" });
  };

  return CategoryMaster;
};
