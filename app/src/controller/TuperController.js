import axios from "axios";
const api_url = 'https://heroku-foodies-lovers-app.herokuapp.com';

export default class TuperController {

    static getAll = (token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
                'Host': 'Host'
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/tupers", obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static getOne = (idTuper, token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
                'Host': 'Host'
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/tupers/" + idTuper, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static insertOne = async (tuper, token) => {
        await axios.post(api_url+ "/tupers", tuper, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
                'Host': 'Host',
            }
        })
        .then((res) => res)
        .catch((err) => console.log(err))   
    }

    static getUrlFoto = (foto) => {
        return api_url+"/img/tupers/"+foto;
    }

    static removeOne = (idTuper, token) => {
        let obj = {
            method: "DELETE",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
                'Host': 'Host'
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/tupers/" + idTuper, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static updateFoto = async(foto,idTuper,token) => {
        await axios.put(api_url+ "/tupers/foto/"+idTuper, foto, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
            }
        })
        .then((res) => {return res})
        .catch((err) => console.log(err))  
    }

    static updateInfo = (tuper,idTuper,token) => {
        let obj = {
            method: "put",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }),
            body: JSON.stringify(tuper)
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/tupers/" + idTuper, obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static getMyTuppers = (idUser, token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
                'Host': 'Host'
            })
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/tupers/userTuper/"+idUser, obj)
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