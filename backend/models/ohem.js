module.exports = function (sequelize, DataTypes) {
    let ohem = sequelize.define(
      "ohem",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
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
        tableName: "OHEM",
      }
    );
  
    
  
    return ohem;
  };
  