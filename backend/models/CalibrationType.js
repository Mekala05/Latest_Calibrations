module.exports = function (sequelize, DataTypes) {
    let Calibrationtype = sequelize.define(
      "Calibrationtype",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        calibrationtype: {
          type: DataTypes.STRING(250),
          field: "calibrationtype",
          
        },
        // CardCode: {
        //   type: DataTypes.STRING(250),
        //   field: "CardCode",
          
        // },
        // CardType: {
        //     type: DataTypes.STRING(250),
        //     field: "CardType",
            
        //   },
  
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
        tableName: "Calibrationtype",
      }
    );
  
    
  
    return Calibrationtype;
  };
  