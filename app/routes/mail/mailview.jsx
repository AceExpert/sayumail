import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router";

import { MailTab, Tab2 } from "../../components/tab";

import "../../styles/mailview.css";

export default function MailView({ params }) {

    let location = useLocation();

    let {loader} = useOutletContext();

    let [mails, setMail] = useState(null);
    let [loaded, setLoaded] = useState({});
    let [connection, setConnection] = useState({});

    let loadMails = () => {
        if(connection.server) {
            connection.server.fetchMails(params.folder, 'all').then(newMails => {
                setMail(newMails);
            })
        }
    }

    useEffect(() => {
        import("../../sender/index").then(({connection: conn}) => {
            setConnection(conn)
            loader.then(data => {
                setLoaded(data)
            })
        })
    }, [])

    useEffect(() => {
        loadMails()
    }, [loaded])

    useEffect(() => {
        loadMails()
    }, [location])

    return (
    <div style={{width: "100%", height: "100%"}} className="column">
        <div className="row-center mail-type-con">
            <Tab2 name={"Primary"} icon={"inbox"} selected={!params.type || params.type === 'primary'} link={`/${params.folder}/primary`}/>
            <Tab2 name={"Social"} icon={"groups"} selected={params.type === 'social'} link={`/${params.folder}/social`}/>
            <Tab2 name={"Updates"} icon={"update"} selected={params.type === 'updates'} link={`/${params.folder}/updates`}/>
        </div>
        <div style={{width: "100%", overflowY: "auto", overflowX: "visible", height: "calc(100% - 65px - 65px)"}}>
            <div style={{...(mails?.length? {} : {height: "100%", boxShadow: "none"})}} className="mails-con column">
                <div className="column" style={{width: "100%", height: mails?.length? undefined : "100%"}}>
                    {mails?.length? 
                    mails.map(mail => {
                        return (
                            <MailTab from={mail.from_name || mail.from_addr.split("@")[0]} subject={mail.subject} key={mail.index} content={mail.body} onClick={() => {
                                if(loaded.showMail) {
                                    loaded.showMail(mail);
                                }
                            }}/>
                        )
                    }) :
                    mails?.length === 0?
                    <div className="no-mails-class-1 column-center">
                        <p style={{fontSize: "50px", letterSpacing: "5px", fontWeight: "700"}}>Your mailbox is empty</p>
                        <p style={{}} className="emptybox-tagline">Don't like the emptiness? Invite your <span style={{color: "purple"}}>friends</span> and enjoy an end to end encrypted chatting and mailing experience without the worry of strangers trying to break into your chats!</p>
                    </div> : 
                    <div className="no-mails-class-1 column-center">
                        <p style={{fontSize: "50px", letterSpacing: "5px", fontWeight: "700", color: "gray"}}>Loading...</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>

    )
}