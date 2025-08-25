import "../crypt/bundle2";

import { connection } from "../globalstate";

let unAuthQueue = [];
let authQueue = [];

const URL = endpoint => 'https://sso.sayutel.com/' + endpoint;

let sessionCreated = 0;

const {
    generateKeys, encrypt, decrypt,
} = window.Ecc;

function startSession(retry = 0, initResolve) {
    let [privateKey, publicKey] = generateKeys();
    if(!connection.public_key && (sessionCreated === 0 || (retry && sessionCreated === 1))) {
        sessionCreated = 1;
        let resolveFn = undefined;
        let prom = undefined;
        if(initResolve) {
            resolveFn = initResolve;
        } else {
            prom = new Promise(resolve => resolveFn = resolve);
        };
        fetch(URL('session'), {method: 'POST', credentials: 'include', body: publicKey}).then(res => {
            if(res.ok) {
                connection.private_key = privateKey;
                    res.text().then(v => {
                        connection.public_key = v;
                        sessionCreated = 2;
                    }).then(() => {
                        resolveFn();
                    });
            } else {
                startSession(retry + 1, resolveFn);
            }
        })
        return prom;
    } else {
        return new Promise(resolve => resolve());
    };
}

function _sessionCheck(promise) {
    let res;
    let prom = new Promise(resolve => res = resolve);
    startSession().then(() => promise().then(v => res(v)));
    return prom;
}

function loginForToken(user = 0, retry = 0) {
    return _sessionCheck(() => fetch(URL(`mail/${user}/access`), {method: 'GET', credentials: 'include'}).then(res => {
        if(res.ok) {
            return res.text().then(v => {
                let data = JSON.parse(decrypt(v, connection.private_key));
                return data;
            })
        } else {

        }
    }))
}

export {
    startSession, loginForToken
}