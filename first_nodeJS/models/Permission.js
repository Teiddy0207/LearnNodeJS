module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define('Permission', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'permissions', 
    timestamps: false 
  });

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'role_permissions',
      foreignKey: 'permission_id',
      otherKey: 'role_id',
      timestamps: false
    });
  };

  return Permission;
};
