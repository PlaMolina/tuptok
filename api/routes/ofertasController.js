const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const modelo = require('../models/index.js');

//devuelve todas los ofertas
router.get('/', (req, res, next) => {
    modelo.ofertas.findAll()
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "No se encuentran las ofertas" }));
});

//devuelve un ofertas por id
router.get('/:id', (req, res, next) => {
    let idOfertas = req.params.id;
    modelo.ofertas.findByPk(idOfertas)
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "No se encuentra la oferta" }));
});

router.get('/offers/:id', (req,res,next)=>{
    let idOfertas = req.params.id;
    modelo.usuarios.hasOne(modelo.tupers, {foreignKey: 'id'})
    modelo.tupers.belongsTo(modelo.usuarios, {foreignKey: 'usuarios_id_usuarios'})
    modelo.tupers.hasOne(modelo.ofertas, {foreignKey: 'id'})
    modelo.ofertas.belongsTo(modelo.tupers, {foreignKey: 'tupers_id_tupers'})
    modelo.ofertas.findAll({where: {"usuarios_id_usuarios": idOfertas}, include: [{model: modelo.tupers, include: {model: modelo.usuarios, attributes: ['email', 'id', 'fotoURL']}}]})
        .then(lista => {res.json({ ok: true, resp: lista })})
        .catch(err => res.json({ ok: false, error: "No se encuentra la oferta" }));
});
//SELECT ofertas.*, tupers.id as tuperID FROM ofertas INNER JOIN tupers ON ofertas.tupers_id_tupers = tupers.id where ofertas.usuarios_id_usuarios = 33;
//devuelve todas las ofertas de un user
router.get('/user/:id', (req, res, next) => {
    let idUsuario = req.params.id;
    modelo.tupers.findAll({attributes: ['id'],where: {'usuarios_id_usuarios': idUsuario}})
        .then(lista => {
            if(lista.length > 0){
                let newArray = lista.map((el) => {return {"tupers_id_tupers":el.dataValues.id}});  
                modelo.usuarios.hasOne(modelo.ofertas, {foreignKey: 'id'})
                modelo.ofertas.belongsTo(modelo.usuarios, {foreignKey: 'usuarios_id_usuarios'})
                modelo.tupers.hasOne(modelo.ofertas, {foreignKey: 'id'})
                modelo.ofertas.belongsTo(modelo.tupers, {foreignKey: 'tupers_id_tupers'})
                modelo.ofertas.findAll({where: {[Op.or]:newArray}, include: [{model: modelo.tupers}, {model: modelo.usuarios, attributes: ['email', 'id', 'fotoURL']}]})
                    .then(lista => res.json({ ok: true, resp: lista }))
                    .catch(err => res.json({ ok: false, error: "No se encuentra la oferta" }));
            }else{
                res.json({ ok: false, resp: "No hay tupers" }) 
            }
        })
        .catch(err => res.json({ ok: false, error: "Error al devolver el tuper" }));
});


//crea un oferta
router.post('/', (req, res, next) => {
    modelo.ofertas.create(req.body)
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "No se puede subir la oferta" }));
});

//borra un oferta
router.delete('/:id', (req, res, next) => {
    modelo.ofertas.destroy({where:{id:req.params.id}})
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "No se puede borrar la oferta" }));
});

//Cambia al estado final a aceptado
router.put('/change/:id', (req, res, next) => {
    modelo.ofertas.update({ respuesta: req.body.respuesta },{where:{id:req.params.id}})
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "No se puede modificar la oferta" }));
});

//Cambia al estado final a aceptado con puntuacion y comentario.
router.put('/response/:id', (req, res, next) => {
    modelo.ofertas.update({ comentario_cambio: req.body.comentario, puntuacion: req.body.puntuacion, final_date: new Date() },{where:{id:req.params.id}})
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "No se puede cambiar el estado" }));
});


module.exports = router;