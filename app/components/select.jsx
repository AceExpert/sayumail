import { useState, useEffect, useRef } from "react";

import "./styles/selects.css";

class SelectValue {
    name;
    value;
    selected;
    
    constructor({name, value, selected}) {
        this.name = name;
        this.value = value;
        this.selected = selected;
    }
}

export default function SelectClass1({label, values = {}, icon = 'keyboard_arrow_down', defaultValue, multi = false, required = false, selectIcon = 'check', className, onSelect = () => {}, style, ...props}) {

    if(defaultValue.constructor !== Array) {
        defaultValue = [defaultValue];
    }
    let [selected, selectNow] = useState(Object.keys(values).map(name => new SelectValue({name, value: values[name], selected: defaultValue.includes(values[name]) ? true : false})))
    let [opened, setOpen] = useState(false);
    let selMenu = useRef(null);
   
    useEffect(() => {
        if(opened) {
            selMenu.current?.focus();
        } else {

        }
    }, [opened])

    return (
        <div className={"float-con row-center select-class-1 slc" + (className ?? '')} style={{...(style ?? {})}} onClick={() => setOpen(true)} onBlur={() => setOpen(false)}>
            <div className={"select-menu-class-1 column "} style={{display: opened ? 'flex' : 'none'}} tabIndex={1} ref={selMenu}>
                {selected.map(selectValue => (
                <div className="select-option-class-1 " onClick={() => {
                    selMenu.current?.focus();
                    let newSelected = selected.map(v => { v.selected = multi ? (selectValue.value !== v.value? v.selected : required? (selected.filter(sel => sel.selected).length === 1 ? true : !v.selected) : !v.selected) : (selectValue.value !== v.value? false : required ? true : !v.selected); return v });
                    selectNow(newSelected);
                    onSelect?.(newSelected.filter(v => v.selected).map(v => v.value));
                }} key={Math.random()}>
                    <div className="row-center" style={{gap: "8px"}}>
                        <span className="material-symbols-outlined" style={{fontSize: "22px", color: selectValue.selected? "rgba(77, 17, 105, 0.8)" : "transparent", userSelect: "none"}}>{selectIcon}</span>
                        <div className={"select-class-1-sel"} style={{userSelect: "none"}}>
                            {selectValue.name}
                        </div>
                    </div>
                </div>)
                )}
                
            </div>
            <div style={{width: "100%", gap: "5px"}} className="row-center">
                <div className="row-center">
                    <span className="material-symbols-outlined" style={{fontSize: "22px", color: "rgba(77, 17, 105, 0.8)", userSelect: "none"}}>{icon}</span>
                </div>
                <div className={"select-class-1-sel row-center"} contentEditable={false}>
                    {selected.filter(s => s.selected).map(s => s.name).join(", ")}
                </div>
            </div>
        </div>
    )

}