module.exports = function (sequelize, DataTypes) {
  let BreakageDetails = sequelize.define(
    "BreakageDetails",
    {
      id: {
        type: DataTypes.INTEGER(11).UNSIGNED,
        field: "id",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      BreakageNo: {
        type: DataTypes.STRING(250),
        field: "BreakageNo",
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
      HistoryDetails: {
        type: DataTypes.STRING(250),
        field: "HistoryDetails",

      },
      BreakageReason: {
        type: DataTypes.STRING(250),
        field: "BreakageReason",

      },
      Type: {
        type: DataTypes.STRING(250),
        field: "Type",

      },
      calibrationtype: {
        type: DataTypes.STRING(250),
        field: "calibrationtype",

      },
      Remark: {
        type: DataTypes.STRING(250),
        field: "Remark",

      },
      Calibrationlocation: {
        type: DataTypes.STRING(250),
        field: "Calibrationlocation",

      },
      // FileUpload: {
      //   type: DataTypes.STRING(250),
      //   field: "FileUpload",

      // },
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
      tableName: "BreakageDetails",
    }
  );



  return BreakageDetails;
};
