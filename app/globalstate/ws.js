const connection = { server: null, accessToken: null, user_ids: [], mailData: {}, mailConvos: {}, chats: {}, current_user: null };

function getMailFromMessageID(message_id, folder = 'all', subcateg = 'all') {
    if(folder === 'all') {
        for(let fold of Object.keys(connection.mailData)) {
            if(!connection.mailData[folder][subcateg]) return null;
            for(let mail of connection.mailData[fold][subcateg]) {
                if(mail.message_id === message_id) {
                    return mail;
                }
            }
        }
    } else if (folder && Object.keys(connection.mailData).includes(folder)) {
        if(!connection.mailData[folder][subcateg]) return null;
        for(let mail of connection.mailData[folder][subcateg]) {
            if(mail.message_id === message_id) {
                return mail;
            }
        }
    }
}

export {
    connection, getMailFromMessageID
}