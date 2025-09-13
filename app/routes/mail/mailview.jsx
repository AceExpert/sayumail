import { useEffect, useState } from "react";
import { useLocation, useOutletContext, useNavigate } from "react-router";

import { MailTab, Tab2 } from "../../components/tab";
import CheckBox from "../../components/checkbox";

import { getConvos, sortConvos } from "../../utils/convos";

import { connection } from "../../globalstate/ws";

import "../../styles/mailview.css";

import SputhP from "../../assets/images/Sputh-p.svg"

export function clientLoader({ params }) {
    
}

export default function MailView({ params }) {

    let location = useLocation();
    let navigate = useNavigate();

    let {loader} = useOutletContext();

    let [mails, setMail] = useState(null);
    let [convos, setConvos] = useState([]);

    let [loaded, setLoaded] = useState({});
    let [callbackIds, setCBIds] = useState({});

    let loadMails = () => {
        if(connection.server) {
            if(callbackIds.newMail) {
                connection.server.removeNewMail(callbackIds.newMail);
            }
            setCBIds({newMail: connection.server.onNewMail({ folder: params.folder, category: 'all'}, mail => {
                setMail(oldMails => {
                    let latest_mails = [mail, ...oldMails];
                    return latest_mails
                })
            })});
            connection.server.fetchMails(params.folder, 'all').then(newMails => {
                setMail(newMails);
            })
            if(params.folder !== 'sent') {
                connection.server.fetchMails('sent', 'all').then(newMails => {
                    console.log([...newMails]);
                    console.log([...mails, ...newMails]);
                    loadConvos([...mails, ...newMails]);
                })
            }
        }
    }

    useEffect(() => {
        loader.then(data => {
            setLoaded(data)
        })

        //setMail([{from_name: "anshul", from_addr: "anshul@sayutel.com", subject: "Regarding your order", body: "sent it", message_id: 932, extras: {in_reply_to: 930}}, {from_name: "anshul", from_addr: "anshul@sayutel.com", subject: "Regarding your order", body: "Your order is here", message_id: 932, extras: {in_reply_to: 930}}, {from_name: "IIT Kharagpur", from_addr: "kgp@iitkgp.ac.in", subject: "Regarding your marks", body: "Your CGPA is posted in the erp 2", message_id: 930, extras: {in_reply_to: 935}}, {from_name: "joe", from_addr: "joe@sayutel.com", subject: "Regarding your photos", body: "yes sending", message_id: 939, extras: {in_reply_to: 935}}, {from_name: "joe", from_addr: "joe@sayutel.com", subject: "Regarding your photos", body: "check out the attachments", message_id: 935}, {from_name: "anshul", subject: "Regarding your order", body: "Your order is here", message_id: 830}, {from_name: "IIT Kharagpur", subject: "Regarding your marks", body: "Your CGPA is posted in the erp", message_id: 430}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments", message_id: 230}, {from_name: "anshul", subject: "Regarding your order", body: "Your order is here", message_id: 130}, {from_name: "IIT Kharagpur", subject: "Regarding your marks", body: "Your CGPA is posted in the erp", message_id: 30}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments", message_id: 400}]);
        // setMail([{from_name: "anshul", subject: "Regarding your order", body: "Your order is here"}, {from_name: "IIT Kharagpur", subject: "Regarding your marks", body: "Your CGPA is posted in the erp"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "anshul", subject: "Regarding your order", body: "Your order is here"}, {from_name: "IIT Kharagpur", subject: "Regarding your marks", body: "Your CGPA is posted in the erp"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "anshul", subject: "Regarding your order", body: "Your order is here"}, {from_name: "IIT Kharagpur", subject: "Regarding your marks", body: "Your CGPA is posted in the erp"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}, {from_name: "joe", subject: "Regarding your photos", body: "check out the attachments"}]);
        // setMail([]);
    }, []);

    useEffect(() => {
        loadMails()
    }, [loaded])

    useEffect(() => {
        loadMails()
    }, [location])

    useEffect(() => {
        //loadConvos(mails)
    }, [mails]);

    let loadConvos = (mls) => {
        if(Array.isArray(mls)) {
            let cvs = sortConvos(getConvos(mls), mls);
            let new_convos = [];
            for(let conv of Object.values(cvs)) {
                if(conv.length > 1) {
                    new_convos.push(conv);
                }
            }
            console.log(new_convos);
            setConvos(new_convos);
        };
    }

    let getBodyContent = element => {
        if(element.nodeName !== 'BODY') {
            for(let child of element.children) {
                let content = getBodyContent(child);
                if (content) return content;
            }
        } else {
            return element.innerText;
        }
    }

    let changeCateg = categ => {
        navigate(`/u/${params.uindex}/${params.folder}/${categ}`)
    }

    return (
    <div style={{width: "100%", height: "100%", padding: "20px 0px 0px 0px", position: "relative"}} className="column">

        <div className="mail-type-float-con row-center" style={{}}>
            <div className={"mail-type-tab row-center " + ((!params.type || params.type === 'primary') ? "mail-tab-selected" : "")} onClick={() => changeCateg("primary")}>
                <span className={"material-symbols-outlined " + ((!params.type || params.type === 'primary') ? "mail-tab-selected-icon" : "")} style={{fontSize: "18px", color: "rebeccapurple"}}>inbox</span>
                Primary
            </div>
            <div className={"mail-type-tab row-center " + ((params.type === 'social') ? "mail-tab-selected" : "")} onClick={() => changeCateg("social")}>
                <span className={"material-symbols-outlined " + ((params.type === 'social') ? "mail-tab-selected-icon" : "")} style={{fontSize: "18px", color: "rebeccapurple"}}>groups</span>
                Social
            </div>
            <div className={"mail-type-tab row-center " + ((params.type === 'updates') ? "mail-tab-selected" : "")} onClick={() => changeCateg("updates")}>
                <span className={"material-symbols-outlined " + ((params.type === 'updates') ? "mail-tab-selected-icon" : "")} style={{fontSize: "18px", color: "rebeccapurple"}}>update</span>
                Updates
            </div>
        </div>

        <div className="row-center mail-type-con" style={{display: "none"}}>
            <Tab2 name={"Primary"} icon={"inbox"} selected={!params.type || params.type === 'primary'} link={`/${params.folder}/primary`} className="mail-categ-button"/>
            <Tab2 name={"Social"} icon={"groups"} selected={params.type === 'social'} link={`/${params.folder}/social`} className="mail-categ-button"/>
            <Tab2 name={"Updates"} icon={"update"} selected={params.type === 'updates'} link={`/${params.folder}/updates`} className="mail-categ-button"/>
        </div>
        <div className="column" style={{width: "100%", height: "100%"}}>
            <div className="row-center mail-view-control" style={{justifyContent: "space-between"}}>
                <div className="row-center">
                    <CheckBox />
                    <p style={{paddingLeft: "30px", color: "rgba(101, 23, 138, 0.53)", fontSize: "14px", letterSpacing: ".5px", fontWeight: "600"}}>Mailbox</p>
                </div>
                <div className="row-center" style={{gap: "20px", paddingRight: "20px"}}>
                    <div className="row-center" style={{gap: "15px"}}>
                        <span className="material-symbols-outlined mail-view-arrow">arrow_back_ios_new</span>
                        <span className="material-symbols-outlined mail-view-arrow">arrow_forward_ios</span>
                    </div>
                    <div className="row-center" style={{gap: "7px"}}>
                        <p style={{fontSize: "13px", color: "gray", fontWeight: "500"}}>1 - {mails?.length}</p>
                        <p>•</p>
                        <p style={{fontSize: "13px", color: "rebeccapurple", fontWeight: "600"}}>{mails?.length}</p>
                    </div>
                </div>
            </div>
            <div style={{width: "100%", overflowY: "auto", height: "calc(100% - 64px)", marginTop: "0px"}} className="mails-con-scroller">
                <div style={{...(mails?.length? {} : {height: "100%", boxShadow: "none"})}} className="mails-con column">
                    <div className="column" style={{width: "100%", height: mails?.length? undefined : "100%"}}>
                        {mails?.length? 
                        (() => {
                            let mail_comps = [];
                            let set_message_ids = [];
                            let index = 0;

                            for(let mail of mails) {
                                let parser = new DOMParser();
                                let parsed = parser.parseFromString(mail.body, 'text/html');
                                let content = parsed.querySelector("body")

                                if (set_message_ids.includes(mail.message_id)) {
                                    index++;
                                    continue;
                                }

                                let i = 0;
                                for(let conv of convos) {
                                    if(conv.length > 1) {
                                        if (conv.some(v => v.message_id === mail.message_id)) {
                                            set_message_ids.push(...conv.map(m => m.message_id));
                                            mail_comps.push((
                                                <MailTab from={[...(new Set(conv.map(c => c.from_name || c.from_addr.split('@')[0])))].join(", ")} subject={mail.subject} key={Math.random()} content={null} className={"mail-select-tab"} dateClassName={"mail-date-select"} onClick={() => {
                                                    if(loaded.showMail) {
                                                        loaded.showMail({is_convo: true, convos: conv});
                                                    }
                                                }}/>
                                            ))
                                        }
                                    }
                                    i++;
                                }
                                set_message_ids.push(mail.message_id);
                            
                                mail_comps.push((
                                    <MailTab from={mail.from_name || mail.from_addr.split("@")[0]} subject={mail.subject} key={Math.random()} content={content.innerText} className={"mail-select-tab"} dateClassName={"mail-date-select"} onClick={() => {
                                        if(loaded.showMail) {
                                            loaded.showMail({...mail, body: content.innerHTML});
                                        }
                                    }}/>
                                ))
                                index++;
                            }

                            return mail_comps;
                        })() :
                        mails?.length === 0?
                        <div className="no-mails-class-1 column-center">
                            <img src={SputhP} style={{height: "200px", marginTop: "-150px"}}/>
                            <p style={{fontSize: "25px", letterSpacing: "0px", fontWeight: "700", marginTop: "15px"}}>Mailbox empty</p>
                            <p style={{width: "calc(100% - 30px)"}} className="emptybox-tagline">Sputh got no mails from your friends. Invite your <span style={{color: "rebeccapurple"}}>friends</span> and enjoy an end to end encrypted, real-time chatting and mailing experience with them.<br></br>Without having to worry about spoofed or fake emails.</p>
                        </div> : 
                        <div className="no-mails-class-1 column-center" style={{gap: "80px"}}>
                            <img src={SputhP} style={{}} className="sputh-loader"/>
                            <p style={{fontSize: "20px", letterSpacing: "0px", fontWeight: "700", color: "rgba(114, 64, 160, 0.44)", userSelect: "none"}}>Sputh is bringing your mails</p>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>

    )
}