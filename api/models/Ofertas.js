'use strict';

module.exports = (sequelize, DataTypes) => {
 
  const Ofertas = sequelize.define('ofertas', {
    tupers_id_tupers: DataTypes.INTEGER,
    usuarios_id_usuarios: DataTypes.INTEGER,
    comentario: DataTypes.TEXT,
    respuesta: DataTypes.INTEGER,
    trueque_id_punt: DataTypes.INTEGER,
    metodo_pago: DataTypes.INTEGER,
    comentario_cambio: DataTypes.STRING,
    puntuacion: DataTypes.INTEGER,
    id_taper_contraoferta: DataTypes.INTEGER
  }, { tableName: 'ofertas', timestamps: false});
  
  return Ofertas;
  
};