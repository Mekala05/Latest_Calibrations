module.exports = function(sequelize, DataTypes) {
    let GaugesMaster = sequelize.define('GaugesMaster', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        shortName: {
            type: DataTypes.STRING(250),
            field: 'shortName',
            unique : true
        },
        code: {
            type: DataTypes.STRING(250),
            field: 'code',
            unique : true
        },
        GaugeName: {
            type: DataTypes.STRING(250),
            field: 'GaugeName'
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
            tableName:'GaugesMaster1'
        })

        GaugesMaster.associate = function(models) {
            GaugesMaster.belongsTo(models.CategoryMaster, { foreignKey: 'categoryId' })
            GaugesMaster.belongsTo(models.TypeMaster, { foreignKey: 'typeId' })
        }


        return GaugesMaster
    }