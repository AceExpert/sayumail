import { useState, useEffect, useRef } from "react"

import ArrayInput from "../components/inputc2";

import TransFlag from "../assets/images/new-ribbon.svg";

export default function Composer({className, style, onClose, show = false, ...props}) {

    let subjectInput = useRef();

    let [subject, setSubject] = useState('');
    let [body, setBody] = useState('');
    let [isSubjectEnter, setISE] = useState(false);
    let [isBodyEnter, setIBE] = useState(false);

    let [toAddr, setToAddr] = useState([]);
    let [ccAddr, setCcAddr] = useState([]);
    let [bccAddr, setBccAddr] = useState([]);

    let [showCompose, setSC] = useState(show);

    useEffect(() => {
        setSC(show)
    }, [show]);

    useEffect(() => {
        if(isSubjectEnter) {
            subjectInput.current.focus();
        }
    }, [isSubjectEnter])

    return (
        <div className={"compose-con column " + (className ?? '')} style={{display: showCompose? "flex" : "none"}}>
                   
            <div className="row-center compose-window-controls">
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
                    <ArrayInput onInput={addrs => {
                        setToAddr(addrs);
                    }}/>
                </div>
                {/* <div style={{width: "100%", background: "white", height: "2px", margin: "-3px 0px"}}></div> */}
                <div className="row compose-to compose-to-opt">
                    {/* <span className="material-symbols-outlined compose-subj-add row-center" style={{fontSize: "16px"}}>add</span> */}
                    <p style={{width: "32px", userSelect: "none"}}>Cc</p>
                    <ArrayInput onInput={addrs => {
                        setCcAddr(addrs);
                    }} showAdd={true}/>
                    
                </div>
                {/* <div style={{width: "100%", background: "white", height: "2px", margin: "-3px 0px"}}></div> */}
                <div className="row compose-to compose-to-opt">
                    {/* <span className="material-symbols-outlined compose-subj-add row-center" style={{fontSize: "16px"}}>add</span> */}
                    <p style={{width: "32px", userSelect: "none"}}>Bcc</p>                    
                    <ArrayInput onInput={addrs => {
                        setBccAddr(addrs);
                    }} showAdd={true}/>

                </div>
            </div>
            <div className="main-content-compose column" onClick={() => {
                setIBE(true)
            }}
                
            >
                <p style={{opacity: .3, display: isBodyEnter? "none" : "flex", position: "absolute"}}>Enter your message</p>
                <div contentEditable={true} style={{width: "100%", height: "100%", outline: "none"}}
                    onInput={({target}) => {
                        setBody(target.innerHTML.trim());
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
                        <span className="material-symbols-outlined compose-ico compose-send">send</span>
                    </div>
                </div>
            </div>

            </div>

        </div>

    )
}