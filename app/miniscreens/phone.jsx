import AppCon from "../components/appcon";

import "../styles/miniscreens.css";

export default function Phone({...props}) {

    return (
    <div className="mini-phone column-center">
        <div className="mini-phone-con column-center">
          
            <div className="phone-camera-island row-center">
                <div className="phone-camera-holder row-center">
                    <div className="phone-camera">

                    </div>
                </div>
            </div>

            <div className="mini-phone-main-frame column-center">
                <div className="top-content">
                    <div className="phone-status-bar row-center">
                        <div className="row-center">
                            <span className="material-symbols-outlined status-icon" style={{fontSize: "17px"}}>notifications</span>
                        </div>
                        <div className="row-center">
                            <span className="material-symbols-outlined status-icon" style={{}}>battery_full_alt</span>
                        </div>
                    </div>
                    
                    <div className="column-center mini-main-content">
                        <div className="main-widget column-center">
                            <div className="row" style={{position: "relative"}}>
                                <p className="phone-time">12:07</p>
                                <p className="phone-time-meridian">AM</p>
                            </div>
                            <div className="row" style={{position: "relative"}}>
                                <p className="phone-date">Thu, Apr 17</p>
                            </div>
                        </div>
                    </div>

                    <div className="phone-quick-notifs column-center">
                        <div className="column-center" style={{padding: "0px 10px", width: "100%", gap: "5px"}}>

                            <div className="mini-notification column">
                                <div className="mini-notif-status row-center">
                                    <span className="material-symbols-outlined row-center" style={{justifyContent: "center", fontSize: "13px"}}>chat</span>
                                    <p style={{fontSize: "14px", fontWeight: "500", paddingLeft: "8px"}}>New Message</p>
                                </div>
                                <div className="mini-notif-main-content row-center">
                                    <p style={{fontSize: "12.5px", fontWeight: "100"}}>You have a new message from <b>Sayu</b></p>
                                </div>
                            </div>

                            <div className="mini-notification column">
                                <div className="mini-notif-status row-center">
                                    <span className="material-symbols-outlined row-center" style={{justifyContent: "center", fontSize: "13px"}}>notifications</span>
                                    <p style={{fontSize: "14px", fontWeight: "500", paddingLeft: "8px"}}>Notification</p>
                                </div>
                                <div className="mini-notif-main-content row-center">
                                    <p style={{fontSize: "12.5px", fontWeight: "100"}}>This is a notification</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                <div className="bottom-content column-center">
                    <div className="bottom-grids-con column">

                        <div className="row-center main-apps-con">
                            <div className="phone-main-apps row">
                                <AppCon icon={'chat'} iconSize={25} iconClassName={'main-app-icon-1'}/>
                                <AppCon icon={'notifications'} iconSize={25} iconClassName={'main-app-icon-2'}/>
                                <AppCon icon={'event'} iconSize={25} iconClassName={'main-app-icon-3'}/>
                                <AppCon icon={'lightbulb'} iconSize={25} iconClassName={'main-app-icon-4'}/>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}