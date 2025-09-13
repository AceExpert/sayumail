function getConvos(md) {
    let convos = {};
    let i = 0;
    for(let msg of md) {
        let added = false;
        let added_k = null;
        
        for(let k of Object.keys(convos)) {
            for(let imsg of convos[k]) {
                if(!imsg.message_id && !msg.message_id) continue;
                if((imsg.extras?.in_reply_to?.trim?.() && imsg.extras?.in_reply_to?.trim?.() === msg.message_id) || (imsg.extras?.in_reply_to?.trim?.() && msg.extras?.in_reply_to?.trim?.() && imsg.extras?.in_reply_to?.trim?.() === msg.extras?.in_reply_to?.trim?.())) {
                    added = true;
                    if(added_k !== null) {
                        convos[added_k] = [...(convos[added_k]), ...(convos[k])];
                        delete convos[k];
                    } else {
                        convos[k].push(msg);
                        added_k = k;
                    }
                    break;
                }
            }
        }
        if(!added) convos[msg.message_id] = [msg];
        i++;
    }
    return convos;
}

function sortConvos(convos, md) {
    for(let k of Object.keys(convos)) {
        convos[k].sort((a, b) => md.findIndex(i => i.message_id === a.message_id) - md.findIndex(i => i.message_id === b.message_id)).reverse();
    }
    return convos;
}

export {getConvos, sortConvos};