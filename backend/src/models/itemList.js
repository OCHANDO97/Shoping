module.exports = (sequelize, DataTypes) => {
    const itemList = sequelize.define(
        "listas_con_productos", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
              },
        }, 
        {
            timestamps: false,
          }
    );

    itemList.associate = (models) => {
        
    }

    return itemList;
}