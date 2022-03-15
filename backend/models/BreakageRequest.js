module.exports = function (sequelize, DataTypes) {
    let BreakageRequest = sequelize.define(
      "BreakageRequest",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        date: {
          type: DataTypes.STRING(250),
          field: "date",
          
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
         
          Employee: {
            type: DataTypes.STRING(250),
            field: "Employee",
            
          },

          BreakageNo: {
            type: DataTypes.STRING(250),
            field: "BreakageNo",
            
          },
          RefNo: {
            type: DataTypes.STRING(250),
            field: "RefNo",
            
          },
        
          BreakageReason: {
            type: DataTypes.STRING(250),
            field: "BreakageReason",
            
          },
        //   Type: {
        //     type: DataTypes.STRING(250),
        //     field: "Type",
            
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
        tableName: "Breakage_Request",
      }
    );
  
    
  
    return BreakageRequest;
  };
  