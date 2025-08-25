import { redirect } from "react-router";

import InputClass1 from "../components/input";

import "../styles/login.css";

export async function clientLoader(params) {
    return redirect("https://mail.sayutel.com/u/0/inbox")
}

export default function LoginView({}) {

    /*
    return (
        <div style={{width: "100%", height: "100%", justifyContent: "center"}} className="column-center">
            <div className="column-center login-box-class-1">
                <div className="column-center" style={{gap: "2px"}}>
                    <p className="main-login-logo">Sayutel</p>
                    <p style={{fontWeight: "800", fontSize: "17px", letterSpacing: "2px", alignSelf: "flex-end"}} className="no-select">Login</p>
                </div>
                <div style={{width: "100%", gap: "20px"}} className="column">
                    <div style={{width: "100%", gap: "10px"}} className="column">
                        <p style={{fontWeight: "600"}} className="no-select login-text-i">Email</p>
                        <InputClass1 className="login-input-class-1" placeholder={"user@email.com"}/>
                    </div>
                    <div style={{width: "100%", gap: "10px"}} className="column">
                        <p style={{fontWeight: "600"}} className="no-select login-text-i">Password</p>
                        <InputClass1 className="login-input-class-1" placeholder={"Password"}/>
                    </div>
                </div>
                <div style={{width: "100%"}} className="column-center">
                    <div className="login-button-class-1 row-center">
                        <p className="login-button-text">LOGIN</p>
                    </div>
                </div>
            </div>
        </div>
    )
    */
}