import { useEffect, useRef, useState } from "react";

import { emailPat } from "../constants";

import "./styles/inputs.css";

export default function InputClass1({
    placeholder,
    icon,
    style,
    onInput,
    onKeyDown,
    onKeyUp,
    onClick,
    placeholderStyle,
    className,
    inputClassName,
    placeholderClassName,
    textArea = false,
    enabled = true,
    ...props
}) {

    let [pVisible, setVisible] = useState(true);
    let [text, setText] = useState("");
    
    let inputCon = useRef(null);
    let mainParent = useRef(null);

    useEffect(() => {
        if(inputCon.current && mainParent.current) {
            inputCon.current.style.minHeight = mainParent.current.clientHeight + 'px';
        }
    }, [])

    return (
        <div className={`input-class-1 row-center ${textArea? 'input-class-1-textarea-parent ': ''}`+(className ?? "")} style={{...(style ?? {})}} 
        onClick={() => {
            if(!enabled) {
                let val = onClick?.();
                setTimeout(() => {
                    if(textArea) {
                        inputCon.current.style.minHeight = mainParent.current.clientHeight + 'px';
                    }
                }, typeof val === 'number'? val : 0)
            }
        }}
        onResize={() => {
            if(textArea) {
                inputCon.current.style.minHeight = mainParent.current.clientHeight + 'px';
            }
        }} ref={mainParent}>
            {icon && !textArea?
            <div className="row-center">
                <span className="material-symbols-outlined" style={{fontSize: "22px", color: "rgba(77, 17, 105, 0.8)"}}>{icon}</span>
            </div>
            : null}
            <div style={{position: "relative", width: "100%"}} className="row-center">
                <div className={`row-center input-class-1-placeholder ${textArea? 'input-class-1-placeholder-textarea ': ''}${!enabled? 'input-class-1-placeholder-disabled ': ''}` + (placeholderClassName ?? '')} style={{display: pVisible? "flex" : "none", gap: "7px", width: textArea && icon? "100%" : undefined}}>
                    {icon && textArea?
                    <div className="row-center">
                        <span className="material-symbols-outlined" style={{fontSize: "19px", color: "rgba(77, 17, 105, 0.8)"}}>{icon}</span>
                    </div>
                    : null}
                    {placeholder}
                </div>
                <div ref={inputCon} className={`input-class-1-main ${textArea? 'input-class-1-textarea ': ''}`+(inputClassName ?? "")} contentEditable={enabled} style={{display: enabled? "flex" : "none"}} tabIndex={1} onFocus={() => { 
                    if(enabled) {
                        setVisible(false);
                    };
                }}
                onInput={evt => {        
                    onInput?.(evt, evt.target.innerText.trim());
                    setText(evt.target.innerText.trim());
                }} onBlur={() => {
                    if(typeof text === 'string' && !text.length) {
                        setVisible(true);
                        setText("");
                    } else {
                        setVisible(false);
                    }
                }}>
                    
                </div>
            </div>
        </div>
    )
}

export function SelectInputClass1({
    style = {},
    defaults = [],
    className = '',
    check = null,
    ...props
}) {
    
    let [chips, setChip] = useState(defaults);
    let [data, setData] = useState([...defaults]);
    let [editing, setEdit] = useState(false);
    let [arrowChange, setArrow] = useState(false);
    let selectInput = useRef(null);
    let selectChips = useRef(null);

    let saveData = (addNew = false) => {
        let fdata = data.map(v => v.trim()).filter(v => v.length);
        if(addNew) {
            fdata.push("");
        }
        setData(fdata);
        setChip(fdata);
    }

    useEffect(() => {
        if(editing) {
            setData([...data, ""]);
            setChip([...data, ""]);
        } else {
            saveData()
        }
    }, [editing])

    let getSelectChips = () => {
        if(!selectChips.current) {
            selectChips.current = {};
        };
        return selectChips.current;
    }

    useEffect(() => {
        if(selectInput.current && editing) {
            //getSelection().selectAllChildren([...selectInput.current.children].slice(-1)[0]?.children?.[0])
            //getSelection().collapseToEnd();
            let last = Math.max(...Object.keys(getSelectChips()).map(Number));
            if (last !== -Infinity) {
                let chip = getSelectChips()[last].childNodes?.[0];
                if(chip) {
                    getSelection().collapse(chip, chip.length);
                } else {
                    getSelection().collapse(getSelectChips()[last], getSelectChips()[last].innerText.length)
                };
            }
        }
    }, [chips])

    let checkEmail = check || ((target, text) => {
        if(!emailPat.test(text)) {
            target.style.borderBottom = "2px dashed red";
        } else {
            target.style.borderBottom = "0px dashed black";
        }
    })

    return (
        <div className={"row-center float-con select-input-class-1 " + (className ?? '')} style={{fontWeight: "500", gap: "5px", outline: "none", ...(style ?? {})}} contentEditable={false} onClick={
            () => {}
        } 
            onKeyDown={evt => {
                if(evt.keyCode === 13) {
                    evt.preventDefault();
                    if(!editing) {
                        saveData();
                        setEdit(true)
                    } else {
                        saveData(true);
                    }
                } else if (evt.keyCode === 8) {
                    let selec = getSelection();
                    if(selec.anchorOffset === 0 && (selec.anchorNode?.innerText?.trim()?.length === 0) || (selec.anchorNode?.length === 0)) {
                        evt.preventDefault();
                        saveData();
                    } 
                } else if (evt.code === 'ArrowLeft' || evt.code === 'ArrowRight') {
                    let selec = getSelection();
                    arrowChange = true;
                    console.log(selec.anchorOffset, selec.anchorNode?.length)
                    if((selec.anchorOffset === 0 && evt.code === 'ArrowLeft') || (selec.anchorOffset === selec.anchorNode?.length && evt.code === 'ArrowRight')) {
                        evt.preventDefault();
                        for(let ind of Object.keys(getSelectChips())) {
                            ind = Number(ind);
                            if(selec.anchorNode === getSelectChips()[ind].childNodes?.[0] || selec.anchorNode === getSelectChips()[ind]) {
                                if(ind - 1 >= 0 && evt.code === 'ArrowLeft') {
                                    let node = getSelectChips()[ind - 1].childNodes?.[0];
                                    getSelection().collapse(node, node.length);
                                } else if (Math.max(...Object.keys(getSelectChips()).map(Number)) >= ind + 1 && evt.code === 'ArrowRight') {
                                    console.log('ok')
                                    console.log(getSelectChips(), ind)
                                    let node = getSelectChips()[ind + 1].childNodes?.[0] ?? getSelectChips()[ind + 1];
                                    getSelection().collapse(node, 0)
                                }
                                break
                            }
                        }
                    }
                }
            }}
            onKeyUp = {
                evt => {
                    if(['ArrowLeft', 'ArrowRight'].includes(evt.code)) {
                        arrowChange = false;
                    }
                }
            }
        ref={selectInput}>
            {chips.map((v, i, a) => 
            
            <div className="row-center" style={{gap: "5px"}} key={Math.random()}>
                <div style={{outline: "none", borderBottom: emailPat.test(v)? "0px solid black" : "2px dashed red"}} className="chip-class-1" contentEditable={true} spellCheck={false} tabIndex={1} onInput={({target}) => {data[i] = target.innerText.trim(); checkEmail(target, target.innerText.trim());}} onBlur={({target}) => {
                    if(!arrowChange) {
                        if(editing) {
                            setEdit(false);
                        } else {
                            saveData();
                        }
                    };
                }} ref={(chip) => {
                    getSelectChips()[i] = chip;

                    return () => {
                        delete getSelectChips()[i]
                    }
                }}>{v}</div>
                {editing && i === a.length - 1? null : <div style={{color: "rgba(0, 0, 0, 0.4)"}}>|</div>}
            </div>
            )}
            {!editing?
            <div className="row-center" style={{gap: "5px", height: "100%"}} onClick={() => setEdit(true)}>
                <div className="row-center">
                    <span className="material-symbols-outlined" style={{fontSize: "18px", color: "rgba(77, 17, 105, 0.8)"}}>add</span>
                </div>
                Add
            </div>
            : null}
        </div>
    )
}