module.exports = function(sequelize, DataTypes) {
    let EquipmentMaster = sequelize.define('EquipmentMaster', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        // code: {
        //     type: DataTypes.STRING(250),
        //     field: 'code',
        //     unique : true
        // },
        shortName: {
            type: DataTypes.STRING(250),
            field: 'shortName',
            unique : true
        },
        EquipmentName: {
            type: DataTypes.STRING(250),
            field: 'EquipmentName',
          
        },
        
        categoryId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'categoryId'
        },
        typeId: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'type'
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
            tableName:'EquipmentMaster'
        })

        EquipmentMaster.associate = function(models) {
            EquipmentMaster.belongsTo(models.CategoryMaster, { foreignKey: 'categoryId' })
            EquipmentMaster.belongsTo(models.TypeMaster, { foreignKey: 'type' })
        }


        return EquipmentMaster
    }