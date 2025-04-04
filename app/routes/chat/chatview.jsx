import { Outlet } from "react-router";

export default function ChatView() {
    return (
        <div style={{width: "100%", height: "100%"}} className="row">
            <Outlet />
        </div>
    )   
}