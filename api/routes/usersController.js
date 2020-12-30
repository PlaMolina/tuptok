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
        cb(null, 'uploads/users')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    },
    
});

const upload = multer({ storage: storage }).single('file');

router.put('/foto', (req, res, next) => {
    const token = req.headers.authorization || '';
    let user = decoderUserId(token);
    selectById(user.id)
        .then(async userDB => {
            if(userDB.fotoURL !== undefined && userDB.fotoURL !== null){
                try{
                    await unlinkAsync("uploads/users/"+userDB.fotoURL);
                }catch(err){
                    console.log("Error al borrar la foto: "+err);
                }
            }
        })
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        modelo.usuarios.update({ fotoURL: req.file.filename }, { where: { id: user.id } })
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

//devuelve todas los Usuarios
router.get('/', (req, res, next) => {
    modelo.usuarios.findAll()
        .then(lista => res.json({ ok: true, resp: lista }))
        .catch(err => res.json({ ok: false, error: "Error al devolver los usuarios" }));
});

//devuelve un Usuarios
router.get('/:id', (req, res, next) => {
    let idUser = req.params.id;
    selectById(idUser)
        .then(user => res.json({ ok: true, resp: user }))
        .catch(err => res.json({ ok: false, error: "Error al devolver el usuario" }));
});

//actualiza ranking
router.put('/ranking/:id', (req, res, next) => {
    modelo.usuarios.update({ id_ranking: req.body.id_ranking }, { where: { id: req.params.id } })
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "Error al actualizar el ranking" }));
});

//actualiza tickets

router.put('/tickets/:id', (req, res, next) => {
    modelo.usuarios.update({ tickets: req.body.tickets }, { where: { id: req.params.id } })
        .then(item => res.json({ ok: true, resp: item }))
        .catch(err => res.json({ ok: false, error: "Error al actualizar los tickets" }));
});

//intercambia tickets

router.put('/ticketsUpdate/:id2', (req, res, next) => {
    const token = req.headers.authorization || '';
    let userToken = decoderUserId(token);
    selectById(req.params.id2)
        .then(user => {
            let operacion = user.tickets - req.body.tickets;
            if (operacion >= 0) {
                modelo.usuarios.update({ tickets: operacion }, { where: { id: user.id } })
                    .then(item => {
                        selectById(userToken.id)
                            .then(user2 => {
                                modelo.usuarios.update({ tickets: user2.tickets + req.body.tickets }, { where: { id: user2.id } })
                                    .then(item2 => res.json({ ok: true, resp: { item, item2 } }))
                                    .catch(err => res.json({ ok: false, error: "Error al intercambiar tickets" }));
                            })
                    })
                    .catch(err => res.json({ ok: false, error: err }));
                } else {
                    res.json({ok:false, error:'Falta de tickets'})
                }
            });
});

router.delete("/logout", (req, res, next) => {
    const token = req.headers.authorization || '';
    let userToken = decoderUserId(token);
    modelo.token_usuario.destroy({ where: { usuarios_id_usuarios: userToken.id, token } })
        .then(item => res.json({ ok: true, resp: "Exito al hacer logout." }))
        .catch(err => res.json({ ok: false, error: "Error al hacer logout." }));
});

const selectById = (idUser) => {
    return new Promise((resolve, reject) => {
        modelo.usuarios.findByPk(idUser)
            .then(lista => { resolve(lista) })
            .catch(err => reject({ ok: false, error: err }));
    })
}

module.exports = router;