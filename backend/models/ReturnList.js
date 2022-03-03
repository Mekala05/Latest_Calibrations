const { ReturnList } = require(".");

module.exports = function (sequelize, DataTypes) {
    let ReturnList = sequelize.define(
      "ReturnList",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        IssueDate: {
          type: DataTypes.DATE,
          field: "IssueDate",
          
        },
        IssueNo: {
            type: DataTypes.STRING(250),
            field: "IssueNo",
            
          },
          InstrumentCode: {
            type: DataTypes.STRING(250),
            field: "InstrumentCode",
            
          },
          InstrumentName: {
            type: DataTypes.STRING(250),
            field: "InstrumentName",
            
          },
          MachineCode: {
            type: DataTypes.STRING(250),
            field: "MachineCode",
            
          },
          Location: {
            type: DataTypes.STRING(250),
            field: "Location",
            
          },
          Quantity: {
            type: DataTypes.STRING(250),
            field: "Quantity",
            
          },
          
          ReturnDate: {
            type: DataTypes.DATE,
            field: "ReturnDate",
            
          },
          ReturnNo: {
            type: DataTypes.STRING(250),
            field: "ReturnNo",
            
          },
          InstrumentDetails: {
            type: DataTypes.STRING(250),
            field: "InstrumentDetails",
            
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
        tableName: "ReturnList",
      }
    );
  
    
  
    return ReturnList;
  };
  