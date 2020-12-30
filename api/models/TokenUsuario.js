'use strict';

module.exports = (sequelize, DataTypes) => {
 
  const Token = sequelize.define('token_usuario', {
    token: DataTypes.STRING,
    time: DataTypes.INTEGER,
    usuarios_id_usuarios: DataTypes.INTEGER,
    
  }, { tableName: 'token_usuario', timestamps: false});
  
  return Token;
  
};