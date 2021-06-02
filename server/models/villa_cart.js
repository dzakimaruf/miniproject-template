const villa_cart = (sequelize, DataTypes) => {
  const Villa_cart = sequelize.define('villa_cart', {
    vica_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vica_cretaed_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    vica_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    vica_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'villa_cart',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "villa_cart_pkey",
        unique: true,
        fields: [
          { name: "vica_id" },
        ]
      },
    ]
  });
 Villa_cart.associate = models => {
  Villa_cart.hasMany(models.Line_items,{foreignKey: 'lite_vica_id', onDelete: 'CASCADE'});
  Villa_cart.belongsTo(models.Users,{foreignKey: 'vica_user_id'});
  };
  return Villa_cart
};
export default villa_cart;