module.exports = function (sequelize, DataTypes) {
  let odep = sequelize.define(
    "odep",
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
      Name: {
        type: DataTypes.STRING(250),
        field: "Name",

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
  // odep.associate = function (models) {
  //   odep.hasMany(models.Dept, { foreignKey: 'Code', as: 'Dept_Code' });

  // CategoryMaster.hasMany(models.InstrumentMaster, {
  //   foreignKey: "categoryId",
  // });
  // CategoryMaster.hasMany(models.EquipmentMaster, {
  //   foreignKey: "categoryId",
  // });
  // CategoryMaster.hasMany(models.GaugesMaster, { foreignKey: "categoryId" });
  // };
  // Team.belongsToMany(Department, { through: 'users_teams'});




  return odep;
};
