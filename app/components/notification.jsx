import "./styles/notif.css";

export default function NotificationClass1({
    title,
    description,
    avatar,
    icon,
    importance = 1,
    className = '',
    style = {},
    mainStyle = {},
    ...props
}) {

    return (
        <div className="notification-class-1-con column" style={{...(mainStyle ?? {})}}>
            <div className={"notification-class-1 column " + (className ?? '')} style={{...(style ?? {})}}>
                <div className="column" style={{gap: "5px"}}>
                    <p className="notif-class-1-title">{title}</p>
                    <p className="notif-class-1-content">{description}</p>
                </div>
            </div>
            <div className="notification-action-grid-class-1">
                <div className="notification-action row-center">
                    <div className="row-center">
                        <span className={"material-symbols-outlined notification-action-text"} style={{}}>{"check"}</span>
                    </div>
                </div>
                <div className="notification-action row-center">
                    <p className="notification-action-text">UNDO</p>
                </div>
            </div>
        </div>
    )
}