'use strict';

module.exports = (sequelize, DataTypes) => {
 
  const Tupers = sequelize.define('tupers', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    urlFoto: DataTypes.STRING,
    longitud: DataTypes.DECIMAL(11,8),
    latitud: DataTypes.DECIMAL(11,8),
    isSold: DataTypes.BOOLEAN,
    vegan: DataTypes.BOOLEAN,
    vegetarian: DataTypes.BOOLEAN,
    hasFrutosSecos: DataTypes.BOOLEAN,
    hasLactosa: DataTypes.BOOLEAN,
    hasGluten: DataTypes.BOOLEAN,
    usuarios_id_usuarios: DataTypes.INTEGER,
    cooking_date: DataTypes.DATE,
    valor_tamano: DataTypes.INTEGER,
    ingredientes: DataTypes.TEXT
  }, { tableName: 'tupers', timestamps: false});
  
  return Tupers;
  
};