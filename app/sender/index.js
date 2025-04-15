import "../encrypter/bundle2";

const connection = { server: null }

class EmailSender extends WebSocket {

    constructor(url, onEnd, onOpen) {
        super(url);
        this.connUrl = url;
        this.promises = {
            sendQueue: [],
            newChannel: null,
            auth: null,
            custom: [],
        }
        this.eventListeners = {
            'newMail': []
        }
        this.mailData = {}
        this.onEnd = onEnd;
        this.onOpenCB = onOpen;
        this.hbTimer = null;
        this.hbSendTimer = null;
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
        this.hbSendTimer = setInterval(() => {
            try {
                this.send(".");
            } catch {
                clearInterval(this.hbSendTimer);
                this.hbSendTimer = null;
            }
        }, 120000);
    }

    closeConnection() {
        this.close()
    }

    onMessage(msg) {
        if(this.authorized && this.hbTimer) {
            clearTimeout(this.hbTimer);
            this.hbTimer = setTimeout(this.closeConnection, 150000)
        }
        try {
            let data = JSON.parse(msg.data);
            if(data['chan']) {
                this.currentKey = Buffer.from(JSON.parse(ecc.decryptS1(data.chan)));
                this.promises.newChannel?.();
                this.promises.newChannel = null;
            } else if (data['en']) {
                ecc.decrypt(data.en, this.privKey).then(
                    d => {
                        let fdata = JSON.parse(d);
                        if(Object.keys(fdata).includes("auth")) {
                            this.authorized = fdata.auth;
                            this.promises.auth?.(fdata.auth);
                            this.promises.auth = null;
                            if(this.authorized) {
                                this.sessionToken = fdata.token;
                                this.hbTimer = setTimeout(this.closeConnection, 150000)
                            }
                        } else {
                            this.onData(fdata);
                        }
                    }
                )
            };
        } catch (e) {
            //console.error(e)
        }
    }

    onData(data) {
        if(Object.keys(data).includes('resp')) {
            this.clearCustomPromise(data.resp, data)
        }
        if(Object.keys(data).includes('mails')) {
            if(!this.mailData[data.folder]) {
                this.mailData[data.folder] = {'all': []}
            }
            for(let i = 0; i < data.count; i++) {
                if(data.category === 'all') {
                    this.mailData[data.folder]['all'][data.offset + i] = data.mails[i]
                }
            }
            this.clearCustomPromise(data.fetch_id, data.mails)
        }
        if(data.event === 1) {
            this.mailData[data.folder].unshift(data.mail);

            for(let cb of this.eventListeners.newMail) {
                if(cb.folder === data.folder && (cb.category === data.category || cb.category === 'all')) {
                    cb.callback(data.mail);
                    break;
                }
            }
        }
    }

    onNewMail({folder, category, id = Math.random()}, callback) {
        this.eventListeners.newMail.push({
            folder, category, id, callback
        })
        return id;
    }

    removeNewMail(id) {
        for(let i = 0; i < this.eventListeners.newMail.length; i++) {
            if(this.eventListeners.newMail[i].id === id) {
                this.eventListeners.newMail.splice(i, 1);
                break;
            }
        }
    }

    clearCustomPromise(nid, data) {
        let i = 0;
        for(let [id, res] of this.promises.custom) {
            if(id === nid) {
                res(data);
                this.promises.custom.splice(i, 1);
                break;
            }
            i++;
        }
    }

    onClose() {
        this.promises.auth = null;
        this.promises.newChannel = null;
        this.promises.newMail = null;
        this.authorized = false;
        if(this.hbSendTimer) {
            clearInterval(this.hbSendTimer);
            this.hbSendTimer = null;
        }
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

    getMailFromCache(folder, category, limit, offset) {
        let mails = []
        if(this.mailData[folder]?.[category]) {
            for(let i = 0; i < limit; i++) {
                let mail = this.mailData[folder][category][offset + i];
                if(!mail) {
                    break;
                } else {
                    mails[i] = mail
                }
                i++;
            }
        }
        return mails.length? new Promise(resolve => resolve(mails)) : null;
    }

    fetchMails(folder, category, limit = 50, offset = 0, id = Math.random().toString()) {
        return this.getMailFromCache(folder, category, limit, offset) || ecc.encrypt(JSON.stringify({action: 3, data: {folder, category, limit, offset, id}}), this.currentKey).then(
            enc => {
                let res;
                let prom = new Promise(resolve => res = resolve);
                this.sendData({'en': enc});
                this.promises.custom.push([id, res])
                return prom
            }
        )
    }

    sendData(data) {
        let fdata = JSON.stringify(data);
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
                this.promises.custom.push([data.id, res])
                return prom
            }
        )
    }
}

export {EmailSender, connection}