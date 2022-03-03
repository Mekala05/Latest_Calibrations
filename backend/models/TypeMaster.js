module.exports = function(sequelize, DataTypes) {
    let TypeMaster = sequelize.define('TypeMaster', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(250),
            field: 'type',
            unique : true
           
        },
        categoryId: {
            type: DataTypes.STRING(250),
            field: 'categoryId'
        },
        shortName: {
            type: DataTypes.STRING(250),
            field: 'shortName',
            unique : true

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
            tableName:'TypeMaster1'
        })

        // GaugesMaster.associate = function(models) {
        //     GaugesMaster.belongsTo(models.CategoryMaster, { foreignKey: 'categoryId' })
        //     GaugesMaster.belongsTo(models.TypeMaster, { foreignKey: 'typeId' })
        // }


        return TypeMaster

        
        
    }