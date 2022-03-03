module.exports = function (sequelize, DataTypes) {
    let CalibrationMasterList = sequelize.define(
      "CalibrationMasterList",
      {
       
    
        InstrumentCode: {
            type: DataTypes.STRING(250),
            field: "InstrumentCode",
            
          },
          InstrumentName: {
            type: DataTypes.STRING(250),
            field: "InstrumentName",
    
          },
          Location: {
            type: DataTypes.STRING(250),
            field: "Location",
            
          },


          Department: {
            type: DataTypes.STRING(250),
            field: "Department",
            
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
        tableName: "Calibration_Master_List",
      }
    );
  
    
  
    return CalibrationMasterList;
  };
  