module.exports = (sequelize, DataTypes) => {
    const Factory = sequelize.define('Factory', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name:DataTypes.STRING,
        lower:DataTypes.INTEGER,
        upper:DataTypes.INTEGER,
     },
     {
      timestamps:false,
    }
    );

    Factory.associate = (models)=>{
        models.Factory.hasMany(models.Child);
    };

    return Factory;
  }