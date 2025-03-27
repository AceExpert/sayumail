import "./styles/tab.css";

export default function Tab({name, icon, style, selected, onClick, link, ...props}) {

    return (
        <div className={"tab-class-1 row-center "+(selected ? 'tab-class-1-selected' : '')}>
            <div className="row-center">
                <span className={"material-symbols-outlined " + (selected ? 'tab-icon-class-1-selected' : '')} style={{fontSize: "22px", color: selected ? 'transparent' : "rgba(77, 17, 105, 0.8)"}}>{icon}</span>
            </div>
            <div>
                <p style={{color: selected? 'white' : 'black'}}>{name}</p>
            </div>
        </div>
    )
}

export function MailTab({from, avatar, subject, selected, style, content, date = '2:11 PM', onClick, link, ...props}) {

    return (
        <div className={"mail-tab-class-1 row-center "+(selected ? 'mail-tab-class-1-selected' : '')} style={{...(style ?? {})}}>
            <div className="row-center mail-from-class-1">
                <p style={{fontWeight: "600"}}>{from}</p>
            </div>
            <div className="mail-content-class-1 row-center">
                <p style={{fontWeight: "700"}}>{subject}</p>
                <p style={{}}>{content}</p>
            </div>
            <div className="row-center mail-date-class-1" style={{padding: "10px", fontSize: "12px", width: "90px"}}>
                <p>{date}</p>
            </div>
        </div>
    )
}

export function Tab2({name, icon, style, selected, onClick, link, ...props}) {

    return (
        <div className={"tab-class-2 row-center "+(selected ? 'tab-class-2-selected' : '')}>
            <div className="row-center">
                <span className={"material-symbols-outlined " + (selected ? 'tab-icon-class-2-selected' : '')} style={{fontSize: "24px", color: selected ? 'transparent' : "rgba(77, 17, 105, 0.8)"}}>{icon}</span>
            </div>
            <div>
                <p style={{color: selected? 'white' : 'black'}}>{name}</p>
            </div>
        </div>
    )
}