module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        value:{
            type:DataTypes.INTEGER
        }
      },
      {
        timestamps:false,
      }
    );
    Child.associate = (models)=>{
        models.Child.belongsTo(models.Factory);
    };

    return Child;
  } 