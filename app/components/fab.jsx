import "./styles/fab.css"

export default function Fab({style, className, icon = 'phone_android', onClick, ...props}) {
    return (
        <div className={"sayutel-fab row-center " + (className ?? "")} style={{...(style ?? {})}} onClick={evt => {
            console.log(evt)
            onClick?.(evt);
        }}>
            <span className="material-symbols-outlined sayutel-fab-icon">{icon}</span>
        </div>
    )
}