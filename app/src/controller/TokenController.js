import jwtDecode from 'jwt-decode';
const api_url = 'https://heroku-foodies-lovers-app.herokuapp.com';
export default class TokenController {

    static authenticateToken = (token) => {
        let obj = {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token,
                'Host': 'Host'
            }),
        };
        return new Promise(
            (resolve, reject) => {
                fetch(api_url + "/ranking", obj)
                    .then(data => data.json())
                    .then(datos => {
                        resolve(datos);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
    }

    static getIdUser = (token) => {
        let decode = jwtDecode(token);
        return decode.id;
    }

}