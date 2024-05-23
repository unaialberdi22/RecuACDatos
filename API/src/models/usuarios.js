'use strict';
export default (sequelize, DataTypes) => {
    const Usuarios = sequelize.define('usuarios', {
        email: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contrasena: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
      }, {
        tableName: 'usuarios',
        timestamps: false
      });

      
      return Usuarios
}

