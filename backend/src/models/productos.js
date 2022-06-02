module.exports = (sequelize, DataTypes) => {
  const productos = sequelize.define(
    "productos", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: false,
      primaryKey: true
    },
    nombreProducto: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
    {
      timestamps: false,
    }
  );

  productos.associate = (models) => {
    models.productos.belongsTo(models.categorias), {
      foreignKey: 'categorias_id'
    }
  };

  productos.associate = (models) => {
    models.productos.belongsToMany(models.listaProductos, {
      through: models.itemList,

    });
  }

  return productos;
};