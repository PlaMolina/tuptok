const express = require('express');
const router = express.Router();

const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const unlinkAsync = promisify(fs.unlink);
const jsonwebtoken = require('jsonwebtoken');
const Config = require('../config/config.js');
const { secretKey } = Config;
const modelo = require('../models/index.js');

const multer = require('multer');

const decoderUserId = (token) => {
    let user = {};
	jsonwebtoken.verify(token, secretKey, (error, decoded) => {
		if (!error) {
            const { id } = decoded;
            user.id = id;
		}
    });
    return user;
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/tupers')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
    
});
const upload = multer({ storage: storage }).single('file');

//devuelve todas los tupers
router.get('/', (req, res, next) => {
    modelo.usuarios.hasOne(modelo.tupers, {foreignKey: 'id'})
    modelo.tupers.belongsTo(modelo.usuarios, {foreignKey: 'usuarios_id_usuarios'})

    modelo.tupers.findAll({include: [{model: modelo.usuarios, attributes: ['email']}]})
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "Error al devolver los tupers" }));
});

//devuelve un tuper por id
router.get('/:id', (req, res, next) => {
    let idTupers = req.params.id;
    modelo.usuarios.hasOne(modelo.tupers, {foreignKey: 'id'})
    modelo.tupers.belongsTo(modelo.usuarios, {foreignKey: 'usuarios_id_usuarios'})
    modelo.tupers.findByPk(idTupers,{include: [{model: modelo.usuarios, attributes: ['email', 'fotoURL']}]})
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "Error al devolver el tuper" }));
});

//devuelve tupers de un usuario por id
router.get('/userTuper/:id', (req, res, next) => {
    let idUser = req.params.id;
    modelo.tupers.findAll({where: {'usuarios_id_usuarios': idUser}})
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "Error al devolver el tuper" }));
});

//crea tupper
router.post('/', (req, res, next) => {
    const token = req.headers.authorization || '';
    let user = decoderUserId(token);
    
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let dateCooking = new Date();
        modelo.tupers.create({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            urlFoto: req.file.filename,
            longitud: req.body.longitud,
            latitud: req.body.latitud,
            isSold: 0,
            vegan: req.body.vegan,
            vegetarian: req.body.vegetarian,
            hasFrutosSecos: req.body.hasFrutosSecos,
            hasLactosa: req.body.hasLactosa,
            hasGluten: req.body.hasGluten,
            usuarios_id_usuarios: user.id,
            cooking_date: dateCooking.toISOString().split('T')[0],
            valor_tamano: req.body.valor_tamaño,
            ingredientes: req.body.ingredientes
        })
            .then(item => {
                if(item[0] === 0) throw new Error("Error");
                res.json({ok: true, resp: item});
            })
            .catch( async err => {
                await unlinkAsync(req.file.path);
                res.json({ok: false, error: "Error al subir la foto"})
            });
    });
});

//modifica tupper menos foto
router.put('/:id', (req, res, next) => {
    modelo.tupers.update({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        vegan: req.body.vegan,
        vegetarian: req.body.vegetarian,
        hasFrutosSecos: req.body.hasFrutosSecos,
        hasLactosa: req.body.hasLactosa,
        hasGluten: req.body.hasGluten,
        valor_tamano: req.body.valor_tamano,
        ingredientes: req.body.ingredientes
    }, { where: { id: req.params.id } })
        .then(item => {
            console.log(item);
            res.json({ok: true, resp: item});
        })
        .catch( async err => {
            res.json({ok: false, error: "Error al modificar tupper"})
        });
});

// modifica foto tupper
router.put('/foto/:id', (req, res, next) => {
    let idTuper = req.params.id;
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        selectTuperById(idTuper)
        .then(async tuperDB => {
            try{
                await unlinkAsync("uploads/tupers/"+tuperDB.urlFoto);
            }catch(err){
                console.log("Error al borrar la foto: "+err);
            }
        })
        modelo.tupers.update({
            urlFoto: req.file.filename
        }, { where: { id: req.params.id } })
            .then(item => {
                if(item[0] === 0) throw new Error("Error");
                res.json({ok: true, resp: item});
            })
            .catch( async err => {
                await unlinkAsync(req.file.path);
                res.json({ok: false, error: "Error al subir la foto"})
            });
    });
});


//borra tupper
router.delete('/:id', (req, res, next) => {
    modelo.tupers.destroy({ where: { id: req.params.id } })
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "Error al borrar el tupper" }));
});


//filtra tupper
// router.get('/:id', (req, res, next) => {
//     modelo.tupers.filter({ where: { id: req.params.id } })
//         .then(data => res.json(data))
//         .catch(err => res.json({ ok: false, error: err }));
// });

const selectTuperById = (idTuper) => {
    return new Promise((resolve, reject) => {
        modelo.tupers.findByPk(idTuper)
            .then(lista => { resolve(lista) })
            .catch(err => reject({ ok: false, error: err }));
    })
}


module.exports = router;