import { useState, useEffect, useRef } from "react"

import ArrayInput from "../components/inputc2";

import TransFlag from "../assets/images/new-ribbon.svg";
import SputhP from "../assets/images/Sputh-p.svg";

import { connection } from "../globalstate/ws";

export default function Composer({className, style, onClose, show = false, mailSend, ...props}) {

    let subjectInput = useRef();
    let bodyInput = useRef();

    let [subject, setSubject] = useState('');
    let [body, setBody] = useState('');
    let [content, setContent] = useState('');
    let [isSubjectEnter, setISE] = useState(false);
    let [isBodyEnter, setIBE] = useState(false);

    let [toAddr, setToAddr] = useState([]);
    let [rawToAddr, setRawToAddr] = useState([]);

    let [ccAddr, setCcAddr] = useState([]);
    let [rawCcAddr, setRawCcAddr] = useState([]);

    let [bccAddr, setBccAddr] = useState([]);
    let [rawBccAddr, setRawBccAddr] = useState([]);

    let [showConfirm, setShowConfirm] = useState(false);
    let [showSendingAnim, setSA] = useState(false);
    let [showSent, setS] = useState(false);

    let [showCompose, setSC] = useState(show);

    useEffect(() => {
        setSC(show)
    }, [show]);

    useEffect(() => {
        if(isSubjectEnter) {
            subjectInput.current.focus();
        }
    }, [isSubjectEnter])

    let sendMail = () => {
        // mailSend(toAddr[0], ccAddr, bccAddr, subject, content, body, sendResult);

        setSA(true);

        connection.server.sendMail({
            toAddr: toAddr[0],
            ccAddr: ccAddr,
            bccAddr: bccAddr,
            subject: subject,
            content: content,
            html: body,
            id: Math.random().toString(),
        }).then(({error}) => {
            console.log(error);
            setSA(false);
            if(!error) {
                setS(true);
                setTimeout(() => {
                    resetCompose();
                    setS(false);
                    setShowConfirm(false);
                    setSC(false);
                    onClose?.();
                }, 3000);
            } else {
                setShowConfirm(false);                
            }
        });
    }

    let resetCompose = () => {
        // setToAddr([]);
        setRawToAddr([]);
        // setBccAddr([]);
        setRawBccAddr([]);
        // setCcAddr([]);
        setRawCcAddr([]);
        subjectInput.current.innerHTML = '';
        bodyInput.current.innerHTML = '';
        setIBE(false);
        setISE(false);
    }

    let sendResult = (err) => {

    }

    return (
        <div className={"compose-con column " + (className ?? '')} style={{display: showCompose? "flex" : "none"}}>
            <div style={{display: showConfirm? "flex" : "none"}} className="compose-focus-overlay column-center">
                <div className="column confirm-box-compose" style={{display: showSendingAnim || showSent? "none" : "flex"}}>
                    <p style={{color: "black", fontWeight: "600", fontSize: "14px", padding: "2px 0px 0px 2px"}}>Are you sure you want to send the mail ?</p>
                    <div className="row-center" style={{width: "100%", gap: "6px"}}>
                        <div style={{}} className="confirm-box-button row-center" onClick={sendMail}>
                            <span className="material-symbols-outlined" style={{fontSize: "15px"}}>send</span>
                            Send
                        </div>
                        <div style={{}} className="confirm-box-button row-center recheck-button" onClick={() => setShowConfirm(false)}>
                            <span className="material-symbols-outlined" style={{fontSize: "15px"}}>close</span>
                            Recheck
                        </div>
                    </div>
                </div>
                <span className="material-symbols-outlined anim-send-con" style={{display: showSendingAnim? "flex" : "none"}}>send</span>
                <div className="column-center" style={{gap: "20px", display: showSent? "flex" : "none"}}>
                    <img src={SputhP} style={{height: "150px"}}/>
                    <p className="no-select" style={{fontWeight: "600", color: "rebeccapurple", fontSize: "20px"}}>Sputh delivered your mail</p>
                </div>
            </div>
                   
            <div className="row-center compose-window-controls">
                <div className="row-center" style={{position: "absolute", width: "100%", height: "100%", top: "0px", left: "0px", background: "rgba(49, 0, 71, 0.151)", borderRadius: "8px 8px 0px 0px", display: showConfirm? "flex" : "none"}}>

                </div>
                <div className="row-center" style={{flexDirection: "row-reverse", gap: "9px"}}>
                    <span className="material-symbols-outlined compose-window-control-icon" onClick={() => {
                        setSC(false);
                        onClose?.();
                    }}>close</span>
                    <span className="material-symbols-outlined compose-window-control-icon compose-window-fullscreen">check_box_outline_blank</span>
                    <span className="material-symbols-outlined compose-window-control-icon compose-window-newscreen">open_in_new</span>
                </div>
                <div style={{fontSize: "13px", color: "#66339942", fontWeight: "600", userSelect: "none"}}>
                    Composer
                </div>
            </div>

            <div className="composer column">
            
            <img src={TransFlag} style={{position: "absolute", left: "-100px", bottom: "-100px", height: "300px", zIndex: -1, transform: "rotate(-180deg)", opacity: .1}}/>

            <div className="compose-subject row-center" onClick={() => {
                setISE(true);
            }}>
                <div className="row-center" style={{display: isSubjectEnter? "none" : "flex", userSelect: "none"}}>
                    <span className="material-symbols-outlined compose-subj-add row-center">add</span>
                    Subject
                </div>
                <div contentEditable={true} spellCheck={false} style={{width: "100%", display: isSubjectEnter? "flex" : "none", outline: "none"}} tabIndex={1} ref={subjectInput}
                    onInput={v => {                        
                        setSubject(v.target.innerText.trim());
                    }}
                    onBlur={v => {
                        if(!v.target.innerText.trim()) {
                            setISE(false);
                        }
                    }}
                ></div>
            </div>
            <div className="compose-envelope column">
                <div className="row compose-to">
                    <p style={{width: "32px", userSelect: "none"}} className="clickable">To</p>
                    <ArrayInput onInput={(addrs, rawAddrs) => {
                        setToAddr(addrs);
                        //setRawToAddr(rawAddrs);
                    }} value={rawToAddr}/>
                </div>
                {/* <div style={{width: "100%", background: "white", height: "2px", margin: "0px 0px"}}></div> */}
                <div className="row compose-to compose-to-opt">
                    {/* <span className="material-symbols-outlined compose-subj-add row-center" style={{fontSize: "16px"}}>add</span> */}
                    <p style={{width: "32px", userSelect: "none"}}>Cc</p>
                    <ArrayInput onInput={(addrs, rawAddrs) => {
                        setCcAddr(addrs);
                        //setRawCcAddr(rawAddrs);
                    }} showAdd={true} value={rawCcAddr}/>
                    
                </div>
                {/* <div style={{width: "100%", background: "white", height: "2px", margin: "0px 0px"}}></div> */}
                <div className="row compose-to compose-to-opt">
                    {/* <span className="material-symbols-outlined compose-subj-add row-center" style={{fontSize: "16px"}}>add</span> */}
                    <p style={{width: "32px", userSelect: "none"}}>Bcc</p>                    
                    <ArrayInput onInput={(addrs, rawAddrs) => {
                        setBccAddr(addrs);
                        //setRawBccAddr(rawAddrs);
                    }} showAdd={true} value={rawBccAddr}/>

                </div>
            </div>
            <div className="main-content-compose column" onClick={() => {
                setIBE(true)
            }}
                
            >
                <p style={{opacity: .3, display: isBodyEnter? "none" : "flex", position: "absolute"}}>Enter your message</p>
                <div contentEditable={true} style={{width: "100%", height: "100%", outline: "none"}} ref={bodyInput}
                    onInput={({target}) => {
                        setBody(target.innerHTML.trim());
                        setContent(target.innerText.trim());
                    }}
                    onBlur={({target}) => {
                        if(!target.innerText.trim()) {
                            setIBE(false);
                        }
                    }}>
                </div>
            </div>
            <div className="special-controls-compose column">
                <div className="row-center" style={{justifyContent: "space-between"}}>
                    <div className="row-center" style={{paddingLeft: "7px"}}>
                        <span className="material-symbols-outlined compose-ico" style={{borderRadius: "5px 5px 5px 7px"}}>attach_file</span>
                    </div>
                    <div className="send-con row-center" style={{gap: "2px"}}>
                        <div className="compose-ico row-center send-schedule-button">
                            <span className="material-symbols-outlined compose-ico-button send-schedule-button-icon">schedule_send</span>
                        </div>
                        <span className="material-symbols-outlined compose-ico compose-send" onClick={() => setShowConfirm(true)}>send</span>
                    </div>
                </div>
            </div>

            </div>

        </div>

    )
}