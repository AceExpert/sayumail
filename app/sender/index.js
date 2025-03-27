import ecc from "eccrypto";

import { publicKey, symm, symmRev } from "../constants";

export default class EmailSender extends WebSocket {

    constructor(url) {
        super(url);
        this.connUrl = url;
        this.promises = {
            sendQueue: [],
            newChannel: null,
            auth: null,
            newMail: null,
        }
        this.hbTimer = null;
        this.currentKey = null;
        this.privKey = null;
        this.authorized = false;
        this.sessionToken = null;
        super.onopen = this.onOpen.bind(this);
        super.onmessage = this.onMessage.bind(this);
        super.onclose = this.onClose.bind(this);
        super.onerror = this.onError.bind(this);
        this.closeConnection = this.closeConnection.bind(this);
    }

    static start(url) {
        return new EmailSender(url);
    }

    onOpen() {
        let info;
        while(info = this.promises.sendQueue.shift()) {
            this.send(info[0]);
            info[1]();
        };
    }

    closeConnection() {
        this.close()
    }

    onMessage(msg) {
        if(this.authorized && this.hbTimer) {
            clearTimeout(this.hbTimer);
            this.hbTimer = setTimeout(this.closeConnection, 70000)
        }
        try {
            let data = JSON.parse(msg);
            if('chan' in data) {
                this.currentKey = Buffer.from(JSON.parse(this.decryptS1(data.chan)));
                this.promises.newChannel?.();
                this.promises.newChannel = null;
            } else if ('en' in data) {
                this.decrypt(data.en, this.privKey).then(
                    d => {
                        let fdata = JSON.parse(d);
                        if('auth' in fdata) {
                            this.authorized = fdata.auth;
                            this.promises.auth?.(fdata.auth);
                            this.promises.auth = null;
                            if(this.authorized) {
                                this.sessionToken = fdata.token;
                                this.hbTimer = setTimeout(this.closeConnection, 70000)
                            }
                        } else {
                            this.onData(fdata);
                        }
                    }
                )
            };
        } catch (e) {
            console.error(e)
        }
    }

    onData(data) {
        
    }

    onClose() {
        this.promises.auth = null;
        this.promises.newChannel = null;
        this.promises.newMail = null;
        this.authorized = false;
        if(this.hbTimer) {
            clearTimeout(this.hbTimer);
            this.hbTimer = null;
        }
        super(this.connUrl);
    };

    onError(err) {
        this.close();
    }

    openChannel() {
        this.privKey = ecc.generatePrivate();
        let pubkey = ecc.getPublic(this.privKey);
        return this.encrypt(JSON.stringify({"action": 0, "key": [...pubkey]}), publicKey).then(enc => {
            let res;
            let prom = new Promise(resolve => res = resolve); 
            this.sendData({'en': enc});
            this.promises.newChannel = res;
            return prom
        })
    }

    encrypt(data, key) {
        return ecc.encrypt(key, Buffer.from(data)).then(encrypted => {
            let d = JSON.stringify(Object.keys(encrypted).map(k => [...encrypted[k]]));
            let d1 = [...d];
            [...d].forEach((l, i) => d1[i] = symm[l]);
            d1 = d1.join("");
            return d1;
        })
    }

    decryptS1(data) {
        let ck1 = [...data];
        [...data].forEach((l, i) => ck1[i] = symmRev[l]);
        return ck1.join("");
    }

    decryptS2(data, key) {
        let encOpt = JSON.parse(data);
        let fd = {
            iv: Buffer.from(encOpt[0]),
            ephemPublicKey: Buffer.from(encOpt[1]),
            ciphertext: Buffer.from(encOpt[2]),
            mac: Buffer.from(encOpt[3])
        }
        return ecc.decrypt(key, fd).then(decrypted => decrypted.toString());
    }

    decrypt(data, key) {
        return this.decryptS2(this.decryptS1(data), key)
    }

    authorize(user, pswd) {
        this.encrypt(JSON.stringify({action: 1, user, pswd}), this.currentKey).then(
            enc => {
                let res;
                let prom = new Promise(resolve => res = resolve);
                this.sendData({'en': enc});
                this.promises.auth = res;
                return prom
            }
        )
    }

    sendData(data) {
        let res;
        let promise = new Promise(resolve => res = resolve);
        if(this.readyState != WebSocket.OPEN) {
            this.promises.sendQueue.push([JSON.stringify(data), res]);
        } else {
            this.send(data);
            res();
        }
        return promise;
    }

    sendMail(data) {

    }

}