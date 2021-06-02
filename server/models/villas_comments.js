const villas_comments = (sequelize, DataTypes) => {
  const Villas_comments = sequelize.define('villas_comments', {
    vico_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vico_comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    vico_created_on: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    vico_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vico_villa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'villas',
        key: 'villa_id'
      }
    },
    vico_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'villas_comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "villas_comments_pkey",
        unique: true,
        fields: [
          { name: "vico_id" },
        ]
      },
    ]
  });
  
  Villas_comments.associate = models => {
    Villas_comments.belongsTo(models.Villas,{foreignKey: 'vico_villa_id'});
    Villas_comments.belongsTo(models.Users,{foreignKey: 'vico_user_id'});
  };
  
  return Villas_comments
};
export default villas_comments;