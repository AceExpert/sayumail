import { useState, useEffect, useRef } from "react";

export default function ArrayInput({className, style, onInput, showAdd = false, ...props}) {

    let toAddrInput = useRef();

    let [toAddr, setToAddr] = useState([]);
    let [isEditing, setIE] = useState(false);

    useEffect(() => {
        if(toAddr.slice(-1)[0]?.[0] === '') {
            getToRef().slice(-1)[0]?.[0]?.focus();
        }
        onInput?.(toAddr.map(v => v[0]));
    }, [toAddr])

    let getToRef = () => {
        if(!toAddrInput.current) {
            toAddrInput.current = []
        }

        return toAddrInput.current
    }


    return (
        <div className="compose-input-small row-center" style={{gap: "7px", flexWrap: "wrap"}}>
            <p className="no-select clickable" style={{opacity: 0.3, display: (showAdd? true : toAddr.length)? 'none' : 'flex'}} onClick={() => {
                setIE(true);
                setToAddr(addr => {
                    let newAddr = [...addr, ['', Math.random()]];
                    return newAddr;
                })
            }}>someone@sputh.me</p>
            {toAddr.map(([v, key], ind, arr) => {
                return (
                    <div key={key} className="row-center" style={{gap: "7px"}}>
                        <div className="compose-input-mini" style={{outline: "none"}}
                            ref={r => {
                                getToRef().push([r, key]);
                            }}
                            contentEditable={true}
                            spellCheck={false}
                            onInput={({target}) => {
                                setToAddr(addr => {
                                    let newAddr = [];
                                    for(let i = 0; i < addr.length; i++) {
                                        if(i === ind) {
                                            newAddr.push([target.innerText.trim(), addr[i][1]])
                                        } else {
                                            newAddr.push(addr[i])
                                        }
                                    }
                                    return newAddr;
                                })
                            }}
                            onBlur={() => {
                                setIE(false);
                                setToAddr(addr => {
                                    let newAddr = addr.filter(ad => ad[0].trim().length);
                                    return newAddr;
                                })
                            }}
                        ></div>
                        <div style={{padding: "1.5px", borderRadius: "50%", background: "rgba(168, 93, 255, 0.66)", display: "flex"}}></div>
                    </div>
                )
            })}
            <div className="row-center add-button" style={{gap: "2px", display: (showAdd? true : toAddr.length) && !isEditing? "flex" : "none"}} onClick={() => {
                setIE(true);
                setToAddr(addr => {
                    let newAddr = [...addr, ['', Math.random()]];
                    return newAddr;
                })
            }}>
                <span className="material-symbols-outlined compose-subj-add add-but-icon row-center" style={{fontSize: "15px", marginRight: "3px", padding: "1px"}}>add</span>
                add
            </div>  
        </div>
    )
}