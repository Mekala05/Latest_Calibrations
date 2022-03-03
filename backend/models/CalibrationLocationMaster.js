module.exports = function(sequelize, DataTypes) {
    let CalibrationLocationMaster = sequelize.define('CalibrationLocationMaster', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        BranchUnit: {
            type: DataTypes.STRING(250),
            field: 'BranchUnit',
            
        },
        Division: {
            type: DataTypes.STRING(250),
            field: 'Division',
            
        },
        Department: {
            type: DataTypes.STRING(250),
            field: 'Department',
           
        },
        
        ShortName: {
            type: DataTypes.STRING(250),
            field: 'ShortName',
           
        },
       
        createdBy: {
            type: DataTypes.STRING(50),
            field: 'created_by'
        },
        updatedBy: {
            type: DataTypes.STRING(50),
            field: 'updated_by'
        },
        deletedBy: {
            type: DataTypes.STRING(50),
            field: 'deleted_by'
        },
        deleteStatus:
        {
            type: DataTypes.BOOLEAN,
            field: 'delete_status', 
            defaultValue: false
        },
    },
        {
            timestamps:true,
            tableName:'CalibrtionLocationMaster'
        })

        // CalibrationLocationMaster.associate = function(models) {
        //     CalibrationLocationMaster.belongsTo( models.CategoryMaster, { foreignKey: 'categoryId' })
        //     CalibrationLocationMaster.belongsTo(models.TypeMaster, { foreignKey: 'typeId' })
        // }


        return CalibrationLocationMaster
    }