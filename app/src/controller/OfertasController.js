const api_url = 'https://heroku-foodies-lovers-app.herokuapp.com';

export default class OfertasController {

    static insertOne = (oferta,token) => {
        let obj = {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }),
            body: JSON.stringify(oferta)
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ofertas", obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static getMyOfertas = (idUser,token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ofertas/user/"+idUser, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    // Comentario para pla, comeme los huevos
    static getMyOffers = (idUser, token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ofertas/offers/"+idUser, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static responderOferta = (idOferta, respuesta, token) => {
        let obj = {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }),
            body: JSON.stringify({respuesta: respuesta})
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ofertas/change/"+idOferta, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static comentarPuntuarTrueque = (idOferta, croqueta, token) => {
        let obj = {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }),
            body: JSON.stringify(croqueta)
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ofertas/response/"+idOferta, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static getMyComentarios = (idUser, token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ofertas/opinions/"+idUser, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }
}