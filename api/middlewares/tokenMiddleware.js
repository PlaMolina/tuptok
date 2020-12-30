const jsonwebtoken = require('jsonwebtoken');
const Config = require('../config/config.js');
const modelo = require('../models/index.js');
const { secretKey } = Config;

const verifyToken = (req, res, next) => {
    const tokenWeb = req.headers.authorization || '';
    if(tokenWeb !== null && tokenWeb !== undefined && tokenWeb.trim().replace(/\s/g,'') !== ""){
            findToken(tokenWeb)
                .then(user => {
                    if(authenticate(user.token)){
                        destroyToken(user.usuarios_id_usuarios, user.token)
                        .then(token => res.json({ ok: true, data: "Exito al borrar token." }))
                        .catch(err => res.json({ ok: false, error: "Error al borrar token." }));
                    }
                    next();
                })
                .catch(err => res.json({ ok: false, error: "No se encuentra token" }));
    }else{
        res.json({ok: false, error:"Falta token"});
    }
}

const authenticate = (token) => {
    let result = false;
	jsonwebtoken.verify(token, secretKey, (error, decoded) => {
		if (!error) {
            const { expiredAt } = decoded;
			if (expiredAt < new Date().getTime()) {
				result = true;
			}
        }
    });
    return result;
};

const findToken = (tokenWeb) => {
    return new Promise((resolve, reject) => {
        modelo.token_usuario.findOne({attributes: ['token', 'usuarios_id_usuarios'],where: {token: tokenWeb}})
        .then(data => data.get({ plain: true }))
        .then(item =>  { resolve(item) })
        .catch(err => reject({ ok: false, error: "Error al borrar el token" }));
    })
}

const destroyToken = (idUsuario, token) => {
    return new Promise((resolve, reject) => {
        modelo.token_usuario.destroy({ where: { usuarios_id_usuarios: idUsuario, token } })
        .then(item =>  { resolve(item) })
        .catch(err => reject({ ok: false, error: "Error al borrar el token" }));
    })
}

module.exports = {verifyToken, destroyToken} ;