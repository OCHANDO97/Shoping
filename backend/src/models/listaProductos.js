module.exports = (sequelize, DataTypes) => {

    const listaProduct = sequelize.define(
        'listaProducto', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },
              nombreLista: {
                type: DataTypes.STRING(50),
                allowNull: false,
              },
                         
        },{
            timestamps: false,
          },);

     listaProduct.associate = (models) => {
         models.listaProductos.belongsTo(models.usuarios), {
            foreignKey: 'usuarios_id'
        }
     }
     listaProduct.associate = (models) => {
        models.listaProductos.belongsToMany(models.productos, {
            through: models.itemList,

       });
    }


    return listaProduct;


}