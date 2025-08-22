import { useNavigate } from "react-router";

import CheckBox from "./checkbox";

import "./styles/tab.css";

export default function Tab({name, icon, style, selected, onClick, link, ...props}) {

    let navigate = useNavigate();

    return (
        <div className={"tab-class-1 row-center "+(selected ? 'tab-class-1-selected' : '')} onClick={() => {
            navigate(link ?? '/'+name.toLowerCase())
        }}>
            <div className="row-center tab-icon-class-1-con">
                <span className={"material-symbols-outlined tab-icon-class-1 " + (selected ? 'tab-icon-class-1-selected' : '')} style={{fontSize: "16px", color: selected ? 'wheat' : ("rebeccapurple" || "rgba(77, 17, 105, 0.8)")}}>{icon}</span>
            </div>
            <div className="tab-class-1-title">
                <p style={{color: selected? 'black' : 'black'}}>{name}</p>
            </div>
        </div>
    )
}

export function Divider({width, color, style = {}, className, ...props}) {
    return (
        <div className={"divider-class-1 row" + (className ?? '')} style={{height: width, color, ...(style ?? {})}}></div>
    )
}

export function MailTab({from, avatar, subject, selected, style, content, date = '2:11 PM', className, dateClassName, onClick, link, ...props}) {

    return (
        <div className={"mail-tab-class-1 row-center "+(selected ? 'mail-tab-class-1-selected ' : '') + (className ?? '')} style={{...(style ?? {})}} 
             onClick={evt => {
                onClick?.(evt);
             }}>
            <div className="row-center" style={{gap: "30px"}}>
                <div className="row-center mail-tab-controls-class-1">
                    <CheckBox />
                </div>
                <div className="row-center mail-from-class-1">
                    <p style={{fontWeight: "600"}}>{from}</p>
                </div>
            </div>
            <div className="mail-content-class-1 row-center">
                <p style={{fontWeight: "700"}}>{subject}</p>
                <p style={{}} className="main-body-class-1">{content}</p>
            </div>
            <div className={"row-center mail-date-class-1 "+(dateClassName ?? '')} style={{}}>
                <p>{date}</p>
            </div>
        </div>
    )
}

export function Tab2({name, icon, style, selected, onClick, link, className, ...props}) {
    
    let navigate = useNavigate();

    return (
        <div className={"tab-class-2 row-center "+(selected ? 'tab-class-2-selected ' : '') + (className ?? '')} onClick={() => {
            navigate(link ?? '/'+name.toLowerCase())
        }}>
            <div className="row-center">
                <span className={"material-symbols-outlined tab-icon-class-2 " + (selected ? 'tab-icon-class-2-selected' : '')} style={{fontSize: "20px", color: selected ? 'transparent' : "rgba(77, 17, 105, 0.8)"}}>{icon}</span>
            </div>
            <div className={"tab-class-2-title "+(selected ? 'tab-class-2-title-selected ' : '')}>
                <p style={{color: selected? 'white' : 'black'}}>{name}</p>
            </div>
        </div>
    )
}