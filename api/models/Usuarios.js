'use strict';

module.exports = (sequelize, DataTypes) => {
 
  const Usuario = sequelize.define('usuarios', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    fotoURL: DataTypes.STRING,
    id_ranking: DataTypes.INTEGER,
    tickets: DataTypes.INTEGER
  }, { tableName: 'usuarios', timestamps: false});
  
  return Usuario;
  
};