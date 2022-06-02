module.exports = (sequelize, DataTypes) => {
    const category = sequelize.define(
        "categorias",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            primaryKey: true
          },
          nombreCategory: {
            type: DataTypes.STRING(40),
            allowNull: false,
          },
         },
         {
            timestamps: false, //indica que no queremos los campos createDATE y update
          }
    );

    category.associate = (models) => {
        models.categorias.hasMany(models.productos)
    }

    return category;
}