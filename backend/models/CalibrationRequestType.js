module.exports = function (sequelize, DataTypes) {
    let CalibrationRequest = sequelize.define(
      "CalibrationRequest",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        CalibrationRequest: {
          type: DataTypes.STRING(250),
          field: "CalibrationRequest",
          
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
        tableName: "MasterCalRequestType",
      }
    );
  
    
  
    return CalibrationRequest;
  };
  