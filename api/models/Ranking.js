'use strict';

module.exports = (sequelize, DataTypes) => {
 
  const Ranking = sequelize.define('ranking', {
    lim_puntos: DataTypes.INTEGER,
    titulo: DataTypes.STRING
  }, { tableName: 'ranking', timestamps: false});
  
  return Ranking;
  
};