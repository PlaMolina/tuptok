const api_url = 'https://heroku-foodies-lovers-app.herokuapp.com/account';

export default class TuperController {

    static loginUser = (userEmail, password) => {
        let obj = {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': 'Host'
            }),
            body: JSON.stringify({ email: userEmail, password: password })
        };
        return new Promise((resolve, reject) => {
            fetch(api_url + "/login", obj)
                .then(token => token.json())
                .then(token => resolve(token))
                .catch(error => reject(error))
        })
    }

    static registerUser = (emailUser, password, tel) => {
        let obj = {
            method: "POST",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Host': 'Host'
            }),
            body: JSON.stringify({ email: emailUser, password: password, phone: tel })
        };
        return new Promise((resolve, reject) => {
            fetch(api_url + "/register", obj)
                .then(data => data.json())
                .then(token => resolve(token.token))
                .catch(error => reject(error))
        })
    }

    static changePassword = (password, token) => {
        let obj = {
            method: "PUT",
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': token
            }),
            body: JSON.stringify({ password: password })
        };
        return new Promise((resolve, reject) => {
            fetch(api_url + "/changepassword", obj)
                .then(data => data.json())
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }

}