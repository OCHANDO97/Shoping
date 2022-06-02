module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "usuarios",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(160),
        allowNull: false,
      },
    },
    
  );
  
  user.associate = (models) => {
    models.usuarios.hasMany(models.listaProductos)
}
  return user;
};
