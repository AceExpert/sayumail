import "../encrypter/bundle2";

import { loginForToken, authorize } from "./login";

import { connection } from "../globalstate/ws";

class EmailSender {

    constructor(url) {
        this.connUrl = url;
        this.accessToken = null;
        this.promises = {
            sendQueue: [],
            newChannel: null,
            auth: null,
            custom: [],
        }
        this.eventListeners = {
            'newMail': [],
            'authorized': [],
        }
        this.mailData = {}
        this.hbTimer = null;
        this.hbSendTimer = null;
        this.currentKey = null;
        this.privKey = null;
        this.authorized = false;
        this.sessionToken = null;
        this.closeConnection = this.closeConnection.bind(this);
    }
    
    static checkLogin() {
        let res = null;
        let prom = new Promise(resolv => res = resolv);
        if(connection.user_ids?.length) {
            res(connection.user_ids)
        }
        authorize().then(v => {
            if(v) {
                connection.user_ids.push(...v);
                res(connection.user_ids);
            } else {
                res(null);
            }
        })
        return prom;
    }

    static start(...args) {
        return new EmailSender(...args);
    }

    connect(userIndex) {
        this.userIndex = userIndex;
        this.ws = new WebSocket(this.connUrl);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.begin(this.userIndex);
    }

    begin(userIndex) {
        this.openChannel().then(() => {
            this.login(userIndex).then(err => {
                if(!err) {
                    this.authorize().then(() => {
                        this.fetchMails("inbox", "all")
                    })
                } else {
                    window.location = "https://accounts.sayutel.com/login?continue=" + encodeURI(window.location.href);
                }
            })
        })
    }

    onOpen() {
        let info;
        while(info = this.promises.sendQueue.shift()) {
            this.send(info[0]);
            info[1]();
        };
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
        this.ws.close()
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
                            for(let authCb of this.eventListeners['authorized']) {
                                try {
                                    authCb(this.authorized)
                                } catch (e) {}
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
            if(!connection.mailData[data.folder]) {
                connection.mailData[data.folder] = {'all': []}
            }
            for(let i = 0; i < data.count; i++) {
                if(data.category === 'all') {
                    connection.mailData[data.folder]['all'][data.offset + i] = data.mails[i]
                }
            }
            this.clearCustomPromise(data.fetch_id, data.mails)
        }
        if(data.event === 1) {
            if (data.category) {
                connection.mailData[data.folder][data.category].unshift(data.mail);
            }

            connection.mailData[data.folder]['all'].unshift(data.mail);


            for(let cb of this.eventListeners.newMail) {
                if(cb.folder === data.folder && (cb.category === data.category || cb.category === 'all')) {
                    try {
                        cb.callback(data.mail);
                    } catch (e) {

                    }
                }
            }
        }
    }

    addEventListener(event, cb) {
        if(this.authorized && event === 'authorized') {
            cb(true);
        }
        this.eventListeners[event].push(cb);
    }

    removeEventListener(event, cb) {
        this.eventListeners[event] = this.eventListeners[event].filter(callback => callback !== cb);
    }

    onNewMail({folder, category, id = Math.random()}, callback) {
        this.eventListeners.newMail.push({
            folder, category, id, callback
        })
        return id;
    }

    removeNewMail(id, callback) {
        for(let i = 0; i < this.eventListeners.newMail.length; i++) {
            if(id) {
                if (this.eventListeners.newMail[i].id === id) {
                    this.eventListeners.newMail.splice(i, 1);
                    break;
                }
            } else if (callback) {
                if (this.eventListeners.newMail[i].callback === callback) {
                    this.eventListeners.newMail.splice(i, 1);
                }
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
        this.promises.sendQueue = [];
        this.authorized = false;
        if(this.hbSendTimer) {
            clearInterval(this.hbSendTimer);
            this.hbSendTimer = null;
        }
        if(this.hbTimer) {
            clearTimeout(this.hbTimer);
            this.hbTimer = null;
        }
        this.onEnd();
    };

    onError(err) {
        this.ws.close();
    }

    onEnd() {
        this.connect(this.userIndex);
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

    login(userIndex) {
        if(!this.accessToken && connection.accessToken) {
            this.accessToken = connection.accessToken
        }
        if(!this.accessToken) {
            return loginForToken(userIndex).then(v => {
                if(!v.error) {
                    this.accessToken = v.token;
                    connection.accessToken = v.token;
                    return v.error
                } else {
                    return v.error
                }
            })
        } else return new Promise(resolve => resolve(0))
    }

    authorize() {
        return ecc.encrypt(JSON.stringify({action: 1, token: this.accessToken}), this.currentKey).then(
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
        if(connection.mailData[folder]?.[category]?.length) {
            for(let i = 0; i < limit; i++) {
                let mail = connection.mailData[folder][category][offset + i];
                if(!mail) {
                    break;
                } else {
                    mails[i] = mail
                }
                i++;
            }
        }
        return mails.length? (new Promise(resolve => resolve(mails))) : null;
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
        if(this.ws.readyState != WebSocket.OPEN) {
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

function startServer(userIndex = 0, params = {}) {
    if(!connection.user_ids.length) {
        return EmailSender.checkLogin().then(v => {
            if(v?.length) {
                if(userIndex > (v.length - 1)) {
                    window.location = "https://mail.sayutel.com/u/0/" + (params.folder ?? 'inbox');
                } else {
                    try {
                        if(connection.server) {
                            connection.server.onEnd = () => {};
                            connection.server.ws.close();
                        }
                    } catch (e) {

                    }
                    connection.server = EmailSender.start("wss://mail.sayutel.com:3008/mail");
                    connection.server.connect(userIndex);
                    return v
                }
            } else {
                window.location = "https://accounts.sayutel.com/login?continue=" + encodeURI(window.location.href);
            }
        })
    } else {
        return new Promise(resolve => resolve(connection.user_ids));
    }
}

export {EmailSender, startServer}