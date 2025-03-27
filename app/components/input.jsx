import { useEffect, useRef, useState } from "react";

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
    defaults = [],
    ...props
}) {
    
    let [chips, setChip] = useState(defaults);
    let [editing, setEdit] = useState(false);
    let selectInput = useRef(null);

    useEffect(() => {
        if(editing) {
            setChip([...chips, ""]);
        }
    }, [editing])

    useEffect(() => {
        if(selectInput.current && editing) {
            window.getSelection().selectAllChildren([...selectInput.current.children].slice(-1)[0]?.children?.[0])
            window.getSelection().collapseToEnd();
        }
    }, [chips])

    return (
        <div className="row-center float-con select-input-class-1" style={{fontWeight: "500", gap: "5px", outline: "none"}} contentEditable={false} tabIndex={1} onClick={
            () => {}
        } ref={selectInput}>
            {chips.map((v, i, a) => 
            <div className="row-center" style={{gap: "5px"}} key={Math.random()}>
                <div style={{outline: "none"}} className="chip-class-1" contentEditable={true} tabIndex={1} onInput={({target}) => setChip(chips.map((val, ind) => i === ind? target.innerText : val))} onBlur={({target}) => {
                    setEdit(false)
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