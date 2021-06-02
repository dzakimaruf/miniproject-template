const villas_images = (sequelize, DataTypes) => {
  const Villas_images = sequelize.define('villas_images', {
    viim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    viim_filename: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    viim_filesize: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    viim_filetype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    viim_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    viim_villa_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'villas',
        key: 'villa_id'
      }
    }
  }, {
    sequelize,
    tableName: 'villas_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "villas_images_pkey",
        unique: true,
        fields: [
          { name: "viim_id" },
        ]
      },
    ]
  });
  
  return Villas_images
};
export default villas_images; 