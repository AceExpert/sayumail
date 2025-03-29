import {} from "../encrypter/bundle2";

class EmailSender extends WebSocket {

    constructor(url, onEnd, onOpen) {
        super(url);
        this.connUrl = url;
        this.promises = {
            sendQueue: [],
            newChannel: null,
            auth: null,
            newMail: null,
        }
        this.onEnd = onEnd;
        this.onOpenCB = onOpen;
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

    static start(...args) {
        return new EmailSender(...args);
    }

    onOpen() {
        let info;
        while(info = this.promises.sendQueue.shift()) {
            this.send(info[0]);
            info[1]();
        };
        this.onOpenCB?.();
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
            let data = JSON.parse(msg.data);
            if(data['chan']) {
                console.log(data);
                this.currentKey = Buffer.from(JSON.parse(ecc.decryptS1(data.chan)));
                this.promises.newChannel?.();
                this.promises.newChannel = null;
            } else if (data['en']) {
                ecc.decrypt(data.en, this.privKey).then(
                    d => {
                        let fdata = JSON.parse(d);
                        console.log(fdata);
                        if(Object.keys(fdata).includes("auth")) {
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
        this.onEnd?.();
    };

    onError(err) {
        this.close();
    }

    openChannel() {
        let newKeys = ecc.generateKeys();
        this.privKey = newKeys[0];
        let pubkey = newKeys[1];
        return ecc.encrypt(JSON.stringify({action: 0, key: [...pubkey]}), publicKey).then(enc => {
            let res;
            let prom = new Promise(resolve => res = resolve); 
            this.sendData({'en': enc});
            this.promises.newChannel = res;
            return prom
        })
    }

    authorize(user, pswd) {
        return ecc.encrypt(JSON.stringify({action: 1, user, pswd}), this.currentKey).then(
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
        let fdata = JSON.stringify(data);
        console.log(fdata)
        let res;
        let promise = new Promise(resolve => res = resolve);
        if(this.readyState != WebSocket.OPEN) {
            this.promises.sendQueue.push([fdata, res]);
        } else {
            this.send(fdata);
            res();
        }
        return promise;
    }

    sendMail(data) {
        ecc.encrypt(JSON.stringify({action: 2, data}), this.currentKey).then(
            enc => {
                let res;
                let prom = new Promise(resolve => res = resolve);
                this.sendData({'en': enc});
                this.promises.newMail = res;
                return prom
            }
        )
    }
}

export {EmailSender}