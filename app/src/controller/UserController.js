import axios from "axios";
const api_url = 'https://heroku-foodies-lovers-app.herokuapp.com/';

export default class UserController {

    static logout = (token) => {
        let obj = {
            method: "DELETE",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token,
                'Host': 'Host'
            })
        };
        return new Promise((resolve, reject) => {
            fetch(api_url + "users/logout", obj)
                .then(resp => resp.json())
                .then(resp => resolve(resp))
                .catch(error => reject(error))
        })
    }

    static getUser = (id, token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            })
        };
        return new Promise((resolve, reject) => {
            fetch(api_url + "users/" + id, obj)
                .then(resp => resp.json())
                .then(resp => resolve(resp))
                .catch(error => reject(error))
        })
    }

    static getUrlFoto = (foto) => {
        return api_url + "img/users/" + foto;
    }

    static insertOneFoto = async(fotoUser, token) => {
        await axios.put(api_url + "users/foto", fotoUser, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            .then((res) => res)
            .catch((err) => console.log(err))
    }

    static updatePhone = (phone, token) => {
        let obj = {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }),
            body: JSON.stringify({ phone: phone })
        };
        return new Promise((resolve, reject) => {
            fetch(api_url + "users/updatePhone", obj)
                .then(resp => resp.json())
                .then(resp => resolve(resp))
                .catch(error => reject(error))
        });
    }
}