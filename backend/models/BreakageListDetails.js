module.exports = function (sequelize, DataTypes) {
    let BreakageListDetails = sequelize.define(
      "BreakageListDetails",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        Date: {
          type: DataTypes.STRING(250),
          field: "Date",
          
        },
        InstrumentCode: {
            type: DataTypes.STRING(250),
            field: "InstrumentCode",
            
          },
          InstrumentName: {
            type: DataTypes.STRING(250),
            field: "InstrumentName",
            
          },
          DocumentNumber: {
            type: DataTypes.STRING(250),
            field: "DocumentNumber",
            
          },
         
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
        tableName: "Breakage_List_Details",
      }
    );
  
    
  
    return BreakageListDetails;
  };
  