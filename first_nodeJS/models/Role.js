module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: 'roles', 
    timestamps: false, 
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      through: 'role_permissions',  
      foreignKey: 'role_id',
      otherKey: 'permission_id',
      timestamps: false
    });
  };

  return Role;
};
