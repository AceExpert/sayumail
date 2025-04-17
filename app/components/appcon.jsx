import "./styles/appcon.css";

export default function AppCon({title, icon, style, onClick, iconSize = 20, linkTo, className, iconClassName, ...props}) {

    return (
        <div className={"appcon column-center " + (className ?? "")} style={{...(style ?? {})}}>
            <div className="column-center">
                <div className="appcon-icon-main column-center">
                  <span className={"material-symbols-outlined appcon-icon " + (iconClassName ?? "")} style={{fontSize: iconSize + 'px'}}>{icon}</span>
                </div>
            </div>
            {title?
            <div className="row-center">
                <p className="appcon-title">{title}</p>
            </div>
            :
            null    
            }
        </div>
    )
}