const express = require('express');
const router = express.Router();
const md5 = require('md5');
const modelo = require('../models/index.js');
const jsonwebtoken = require('jsonwebtoken');
const Config = require('../config/config.js');
const { secretKey, expiredAfter } = Config;

//Mira si el login del usuario es correcto y devuelve un token
router.post('/login', (req, res, next) => {
    modelo.usuarios.findAll({attributes: ['id', 'fotoURL'],where: {email: req.body.email, password: md5(req.body.password)}})
        .then(data => {
            creaToken(data[0].id, data[0].fotoURL)
            .then(token => res.json({ok: true,token: token.token}))
        })
        .catch(err => res.json({ok: false, error: "Los datos de usuario no concuerdan."}));
});

// registro del usuario devuelve token
router.post('/register', (req, res, next) => {
    let userToInsert = {email: req.body.email, password: md5(req.body.password), phone: req.body.phone, fotoURL: null, id_ranking: 1, tickets: 5};
    modelo.usuarios.create(userToInsert)
        .then(item => {
            creaToken(item.id, null)
            .then(token => res.json({ok: true, token: token.token}))
        })
        .catch(err => res.json({ ok: false, error: "El usuario ya existe o datos incorrectos." }));
});
// TODO: ChangePassword
router.put('/changepassword/:id', (req, res, next) => {
    modelo.usuarios.update({ password: req.body.password }, { where: { id: req.params.id } })
        .then(item => res.json({ ok: true, data: item }))
        .catch(err => res.json({ ok: false, error: err }));
});

const creaToken = (idUsuario, foto_url) => {
    return new Promise((resolve, reject) => {
        let tokenString =jsonwebtoken.sign(
			{
				expiredAt: new Date().getTime() + expiredAfter,
				id: idUsuario,
			},
			secretKey
		);

        let paramToken = {token: tokenString, time:120, usuarios_id_usuarios: idUsuario};
        modelo.token_usuario.create(paramToken)
            .then(lista => { resolve(lista) })
            .catch(err => reject({ ok: false, error: "No se ha podido crear el token" }));
    })
}

module.exports = router;
module.exports.creaToken = creaToken;