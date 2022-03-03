module.exports = function (sequelize, DataTypes) {
    let Monthly_shedule = sequelize.define(
      "MonthlyShedule",
      {
        id: {
          type: DataTypes.INTEGER(11).UNSIGNED,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        Month: {
          type: DataTypes.STRING(250),
          field: "Month",
          
        },
        Year: {
            type: DataTypes.STRING(250),
            field: "Year",
            
          },


          SheduleNo: {
            type: DataTypes.STRING(250),
            field: "SheduleNo",
            
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
        tableName: "monthlyscedule",
      }
    );
  
   
  
    return Monthly_shedule;
  };
  