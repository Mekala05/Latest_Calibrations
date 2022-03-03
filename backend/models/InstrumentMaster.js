module.exports = function(sequelize, DataTypes) {
    let InstrumentMaster = sequelize.define('InstrumentMaster', {

       id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            field: 'id',
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        InstrumentName: {
            type: DataTypes.STRING(250),
            field: 'InstrumentName',
            unique : true
        },
        code: {
            type: DataTypes.STRING(250),
            field: 'code',
            unique : true,
        },
        shortName: {
            type: DataTypes.STRING(250),
            field: 'shortName',
            unique : true
        },
        
        categoryId: {
            type: DataTypes.STRING(250),
            field: 'categoryId'
        },
        typeId: {
            type: DataTypes.STRING(250),
            field: 'typeId'
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
            tableName:'InstrumentMaster'
        })

        InstrumentMaster.associate = function(models) {
            InstrumentMaster.belongsTo( models.CategoryMaster, { foreignKey: 'categoryId' })
            InstrumentMaster.belongsTo(models.TypeMaster, { foreignKey: 'typeId' })
        }


        return InstrumentMaster
    }