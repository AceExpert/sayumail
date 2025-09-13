import { useEffect, useState, useRef } from "react";

import Avatar from "../components/avatar";

import { testMsgs } from "../constants";

import { connection } from "../globalstate/ws";

import "./styles/convo.css";

export default function Conversation({className, messages, show, style, ref, ...props}) {

    let [msgs, setMsgs] = useState(messages ?? testMsgs);
    let [toShow, setToShow] = useState(show);

    useEffect(() => {
        if(messages) {
            setMsgs(messages);
        };
    }, [messages]);

    useEffect(() => {
        setToShow(show);
    }, [show]);

    return (
        <div className="column conversation-screen" style={{display: toShow? "flex" : "none"}}>

            <div className="convo-card column">
                <p className="convo-subject">{msgs[0].subject}</p>
                <div className="convo-padded column">
                    <div className="convo-info-card column" style={{gap: "9px"}}>
                        <div className="row" style={{gap: "15px", width: "100%"}}>
                            <p className="convo-info-field-name">Members</p>
                            <p style={{fontSize: "14px", color: "rebeccapurple", fontWeight: "500"}}>
                                {[...new Set(msgs.map(v => v.from_name).filter(v => v))].join(", ")}
                            </p>
                        </div>
                        <div className="row" style={{gap: "15px", width: "100%"}}>
                            <p className="convo-info-field-name">Started by</p>
                            <p style={{fontSize: "14px", gap: "5px", fontWeight: "500"}} className="row-center">{msgs[0]?.from_name}
                                <p>•</p>
                                <span style={{color: "rebeccapurple"}}>{msgs[0]?.from_addr}</span>
                            </p>
                        </div>
                        <div className="row" style={{gap: "15px", width: "100%"}}>
                            <p className="convo-info-field-name">Messages</p>
                            <p style={{fontSize: "14px", gap: "5px", fontWeight: "500", color: "rebeccapurple"}} className="row-center">{msgs.length}</p>
                        </div>
                        <div className="row" style={{gap: "15px", width: "100%", display: "none"}}>
                            <p className="convo-info-field-name">Domains</p>
                            <p style={{fontSize: "14px", color: "black", fontWeight: "500", gap: "8px"}} className="row-center">
                                <span style={{color: "rebeccapurple", fontWeight: "600"}}>gmail.com</span>
                                <p>•</p>
                                <span style={{color: "rebeccapurple", fontWeight: "600"}}>sayutel.com</span>
                                <p>•</p>
                                <span style={{color: "rebeccapurple", fontWeight: "600"}}>sst.scaler.com</span>
                                <p>•</p>
                                <span style={{color: "rebeccapurple", fontWeight: "600"}}>kgpian.iitkgp.ac.in</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="convo-chat column">
                {(() => {
                    let chatowner_comps = [];
                    
                    for(let i = 0; i < msgs.length; i++) {
                        let current_owner = msgs[i].from_addr;
                        let current_i = i;
                        let is_me = msgs[i].return_path === connection.current_user;

                        chatowner_comps.push(
                            <div className="convo-owner row" style={{flexDirection: is_me ? "row-reverse" : "row"}} key={`${msgs[i].return_path}-${msgs[i].mail_id || msgs[i].message_id}`}>
                                <div className="convo-avatar-con">
                                    <Avatar letter={msgs[i].from_name[0].toUpperCase()}/>
                                </div>
                                <div className="convo-chat-message-con column" style={{gap: "4px"}}>
                                    {(() => {
                                        let chatmsg_comps = [];

                                        while(i < msgs.length && msgs[i].from_addr === current_owner) {
                                            let parser = new DOMParser();
                                            let parsed = parser.parseFromString(msgs[i].body, 'text/html');
                                            let content = parsed.querySelector("body")

                                            chatmsg_comps.push(
                                                <div className="convo-chat-message" key={`${msgs[i].mail_id || msgs[i].message_id}-content`} style={{background: is_me? "rgba(110, 67, 131, 0.18)" : ""}}>
                                                    {current_i === i? 
                                                        <p style={{fontSize: "13px", color: "rgba(104, 41, 141, 0.7)", fontWeight: "700", padding: "7px 10px 0px 10px", textAlign: is_me? "end" : "start"}}>{msgs[i].from_name}</p> :
                                                        null
                                                    }
                                                    <p style={{fontSize: "14px", padding: "10px 10px 4px 10px"}} ref={elem => {
                                                        if(elem) {
                                                            elem.innerHTML = content.innerHTML;
                                                        };
                                                    }}></p>
                                                    <div className="row-center" style={{width: "100%", justifyContent: "flex-end", padding: "0px 8px 5px 5px", display: "flex"}}>
                                                        <p style={{fontSize: "11px", color: "mediumpurple", fontWeight: "600"}}>14:11</p>
                                                    </div>
                                                </div>
                                            )
                                            i++;
                                        }
                                        i--

                                        return chatmsg_comps;
                                    })()}
                                </div>
                            </div>
                        )
                    }

                    return chatowner_comps;
                })()}
                
                
                {/* <div className="convo-owner row">
                    <div className="convo-avatar-con">
                        <Avatar />
                    </div>
                    <div className="convo-chat-message-con column" style={{gap: "4px"}}>
                        <div className="convo-chat-message">
                            <p style={{fontSize: "13px", color: "rgba(104, 41, 141, 0.7)", fontWeight: "700", padding: "7px 10px 0px 10px"}}>Anshul Singh</p>
                            <p style={{fontSize: "14px", padding: "10px 10px 10px 10px"}}>Dear sir,<br></br><br></br>This is regarding the return of my product. Please return it. I am awaiting it from a long time.<br></br><br></br>Thank you</p>
                            <div className="row-center" style={{width: "100%", justifyContent: "flex-end", padding: "0px 8px 5px 5px", display: "none"}}>
                                <p style={{fontSize: "11px", color: "mediumpurple", fontWeight: "600"}}>14:11</p>
                            </div>
                        </div>
                        <div className="convo-chat-message">
                            <p style={{fontSize: "14px", padding: "10px 10px 4px 10px"}}>Please reply sir.</p>
                            <div className="row-center" style={{width: "100%", justifyContent: "flex-end", padding: "0px 8px 5px 5px"}}>
                                <p style={{fontSize: "11px", color: "mediumpurple", fontWeight: "600"}}>14:11</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="convo-owner row" style={{flexDirection: "row-reverse"}}>
                    <div className="convo-avatar-con">
                        <Avatar letter="J"/>
                    </div>
                    <div className="convo-chat-message-con column" style={{gap: "4px"}}>
                        <div className="convo-chat-message" style={{background: "rgba(223, 188, 255, 0.27)"}}>
                            <p style={{fontSize: "13px", color: "rgba(141, 41, 88, 0.9)", fontWeight: "700", padding: "7px 10px 0px 10px", textAlign: "end"}}>Joe Daniel</p>
                            <p style={{fontSize: "14px", padding: "10px 10px 4px 10px"}}>Ok sir, Replying</p>
                            <div className="row-center" style={{width: "100%", justifyContent: "flex-end", padding: "0px 8px 5px 5px"}}>
                                <p style={{fontSize: "11px", color: "mediumpurple", fontWeight: "600"}}>15:11</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="convo-chatcon column">
                <div className="convo-chatbox row-center">
                    <div contentEditable={true} className="convo-chatbox-input">Enter your message</div>
                    <div className="column-center convo-sendcon">
                        <span className="material-symbols-outlined convo-send-icon">send</span>
                    </div>
                </div>
            </div>
        </div>
    )

}