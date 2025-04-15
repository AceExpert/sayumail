import { useState } from "react";

import "./styles/check.css";

export default function CheckBox({defaultValue = false, onInput, style, className, ...props}) {

    let [value, setValue] = useState(defaultValue);

    return (
        <div className={`checkbox-class-1 ${value? 'checkbox-class-1-selected' : ''} ` + (className ?? "")} style={{...(style ?? {})}}
            onClick={evt => {
                onInput?.(!value);
                setValue(!value);
            }}
        >
            <span className={`material-symbols-outlined checkbox-check row-center ${value? 'checkbox-check-selected' : ''} `}>check</span>
        </div>
    )
}