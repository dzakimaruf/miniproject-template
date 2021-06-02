const line_items = (sequelize, DataTypes) => {
  const Line_items = sequelize.define('line_items', {
    lite_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lite_days: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    lite_status: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    lite_order_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    lite_villa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'villas',
        key: 'villa_id'
      },
      unique: "line_items_lite_villa_id_key"
    },
    lite_vica_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'villa_cart',
        key: 'vica_id'
      },
      unique: "line_items_lite_vica_id_key"
    }
  }, {
    sequelize,
    tableName: 'line_items',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "line_items_lite_vica_id_key",
        unique: true,
        fields: [
          { name: "lite_vica_id" },
        ]
      },
      {
        name: "line_items_lite_villa_id_key",
        unique: true,
        fields: [
          { name: "lite_villa_id" },
        ]
      },
      {
        name: "line_items_pkey",
        unique: true,
        fields: [
          { name: "lite_id" },
        ]
      },
    ]
  });
  Line_items.associate = models => {
    Line_items.belongsTo(models.Villas,{foreignKey: 'lite_villa_id'});
    Line_items.belongsTo(models.Villa_cart,{foreignKey: 'lite_vica_id'});
  };
  
  return Line_items
};
export default line_items;
