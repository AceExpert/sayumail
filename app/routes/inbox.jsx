import { Component, createRef } from "react";

import InputClass1, { SelectInputClass1 } from "../components/input";
import SelectClass1 from "../components/select";
import Tab, { MailTab, Tab2 } from "../components/tab";

import { emailPat } from "../constants";

import "../styles/mainframe.css";
import "../styles/inbox.css";

export function meta({}) {
  return [
    { title: "SayuMail" },
    { name: "Sayutel Mail", content: "Send and Receive emails" },
  ];
}

let EmailSender;

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      composing: true,
      toAddr: null,
    };
    this.toInputCon = createRef();
  }

  componentDidMount() {
    import("../sender/index").then(em => {
      EmailSender = em.EmailSender;
      this.connect()
    })
  }

  connect() {
    this.sender = EmailSender.start('ws://cybertron:3008/mail', this.connect.bind(this), () => {
      this.sender.openChannel().then(() => {
        console.log("opened");
        this.sender.authorize("anshul", "Anshul@7329").then(() => {
          console.log("Authorized");
        });
      })
    });
  }

  saveDraft() {
    this.setState({composing: false});
  }

  sendMail() {

  }

  render = () =>
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
      <div className="compose-box column">
        <div className="column" style={{gap: "5px", display: this.state.composing? "flex" : "none"}}>
          <div className="row-center" style={{height: "35px", gap: "5px"}}>
            <div className="row-center float-con">To</div>
            <div className="row-center float-con" style={{fontWeight: "500", gap: "5px"}} contentEditable={false} ref={this.toInputCon}>
              <div style={{outline: "none"}} className="chip-class-1" contentEditable="true" spellCheck={false} onInput={({target}) => {
                this.state.toAddr = target.innerText.trim();
                if(!emailPat.test(this.state.toAddr)) {
                  this.toInputCon.target.style.borderColor = 'red';
                } else {
                  this.toInputCon.target.style.borderColor = 'rgba(0, 0, 0, 0.438)'
                }
              }}>very.anshul@gmail.com</div>
            </div>
          </div>
          <div className="row-center" style={{minHeight: "35px", gap: "5px"}}>
            <div className="row-center float-con" style={{height: "35px"}}>CC</div>
            <SelectInputClass1 className="cc-bcc-input"/>
          </div>
          <div className="row-center" style={{gap: "5px", justifyContent: "space-between"}}>
            <div className="row-center" style={{gap: "5px"}}>
              <div className="row-center float-con" style={{height: "35px"}}>BCC</div>
              <SelectInputClass1 className="cc-bcc-input"/>
            </div>
            <div className="row-center" style={{gap: "5px", paddingRight: "5px"}}>
              <span className="material-symbols-outlined close-button" style={{}} onClick={this.saveDraft.bind(this)}>close</span>
            </div>
          </div>
        </div>
        <div style={{gap: "5px", marginTop: "-7px"}} className="column">
          <div className="row-center" style={{minHeight: "45px", gap: "5px", display: this.state.composing? "flex" : "none", justifyContent: "space-between"}}>
            <InputClass1 placeholder={"Subject"} className={"float-con subject-con"} placeholderClassName={"subject-input-placeholder"} inputClassName={"subject-input-placeholder"}/>
            <div className="row-center" style={{gap: "5px"}}>
                <span className="material-symbols-outlined send-button hover-ptr" style={{}} onClick={this.sendMail.bind(this)}>send</span>
            </div>
          </div>
          <InputClass1 
            icon={this.state.composing? undefined : "edit"} placeholder={"Compose"} 
            className={"compose-input"} textArea={true} 
            style={{minHeight: this.state.composing? "200px" : "50px", minWidth: this.state.composing? "600px" : "140px"}} 
            enabled={this.state.composing} 
            onClick={() => {
              this.setState({composing: true}); 
              return 600;
            }}
          />
          <div className="row-center" style={{minHeight: "45px", gap: "5px", display: this.state.composing? "flex" : "none", justifyContent: "space-between", position: "relative", top: "-7px", zIndex: "-1", alignItems: "flex-start"}}>
            <div>

            </div>
            <div className="row-center float-con float-con-2">
              <div className="row-center">
                  <span className="material-symbols-outlined " style={{fontSize: "25px", color: "rgba(77, 17, 105, 0.8)"}}>attach_file_add</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row-center" style={{height: "35px", gap: "10px", justifyContent: "space-between", display: this.state.composing? "flex" : "none"}}>
          <div className="row-center" style={{height: "100%", gap: "5px"}}>
            <div className="row-center float-con">From</div>
            <SelectClass1 label={"cytroid.in"} defaultValue={"cytroid.in"} values={{'cytroid.in': 'cytroid.in', 'sayutel.com': 'sayutel.com'}} required={true}/>
          </div>
          <div className="row-center" style={{height: "100%", gap: "5px"}}>
            <div className="row-center float-con">Sign</div>
            <SelectClass1 label={"cytroid.in"} defaultValue={"sayutel.com"} values={{'cytroid.in': 'cytroid.in', 'sayutel.com': 'sayutel.com'}} required={true} multi={true}/>
          </div>
        </div>
      </div>
      <div className="mainhead">
        <div className="c0-holder"></div>
        <p style={{letterSpacing: "2px", fontWeight: "600", fontSize: '23px'}}>Sputh Mail</p>
        <div className="row-center control-holder">
          <InputClass1 icon={"search"} placeholder={"Search"}/>
          <div style={{height: "100%"}}>
            <img src="https://cdn-icons-png.freepik.com/512/168/168720.png" style={{height: "100%", borderRadius: "50%", border: "0px solid black", boxShadow: "0px 0px 30px 0px rgba(116, 9, 158, 0.32)"}}/>
          </div>
        </div>
      </div>
      <div style={{width: "100%", height: "100%"}} className="row">
        <div style={{}} className="column navil-con">
          <div className="column navil" >
            <Tab name={"Inbox"} icon={"inbox"} selected={true}/>
            <Tab name={"Sent"} icon={"send"}/>
            <Tab name={"Chat"} icon={"chat"}/>
            <Tab name={"Draft"} icon={"draft"}/>
            <Tab name={"Spam"} icon={"report"}/>
            <Tab name={"Recycle bin"} icon={"delete"}/>
          </div>
        </div>
        <div style={{width: "100%"}} className="row">
          <div style={{width: "100%", gap: "0px", boxShadow: '10px 20px 20px 0px rgba(0, 0, 0, 0.05)'}} className="column">
            <div className="row-center mail-type-con">
              <Tab2 name={"Primary"} icon={"inbox"} selected={true}/>
              <Tab2 name={"Social"} icon={"groups"}/>
              <Tab2 name={"Updates"} icon={"update"}/>
            </div>
            <div style={{width: "100%", overflowY: "auto", overflowX: "visible", height: "calc(100% - 65px - 65px)"}}>
              <div style={{}} className="mails-con column">
                <MailTab from={"Anshul Singh"} subject={"Fraudsters"} content={"Hello when will my cycle arrive? I know its not going to arrive your fraudsters"}/>
                <MailTab from={"Anshul Singh"} subject={"Regarding my shipment"} content={"Hello when will my cycle arrive?"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"IIT Kharagpur"} subject={"Stop your frauds"} content={"Stop scamming people for money or we will rip you apart"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"Anshul Singh"} subject={"Fraudsters"} content={"Hello when will my cycle arrive? I know its not going to arrive your fraudsters"}/>
                <MailTab from={"Anshul Singh"} subject={"Regarding my shipment"} content={"Hello when will my cycle arrive?"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"IIT Kharagpur"} subject={"Stop your frauds"} content={"Stop scamming people for money or we will rip you apart"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"Anshul Singh"} subject={"Fraudsters"} content={"Hello when will my cycle arrive? I know its not going to arrive your fraudsters"}/>
                <MailTab from={"Anshul Singh"} subject={"Regarding my shipment"} content={"Hello when will my cycle arrive?"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"IIT Kharagpur"} subject={"Stop your frauds"} content={"Stop scamming people for money or we will rip you apart"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"Anshul Singh"} subject={"Fraudsters"} content={"Hello when will my cycle arrive? I know its not going to arrive your fraudsters"}/>
                <MailTab from={"Anshul Singh"} subject={"Regarding my shipment"} content={"Hello when will my cycle arrive?"}/>
                <MailTab from={"Joe Daniel"} subject={"Return my money"} content={"Return my money I don't want your fraud cycle"}/>
                <MailTab from={"IIT Kharagpur"} subject={"Stop your frauds"} content={"Stop scamming people for money or we will rip you apart"}/>
              </div>
            </div>
          </div>

          <div className="column-center" style={{width: "100%", height: "100%", borderLeft: "2px solid rgba(0, 0, 0, 0.5)", padding: "20px 30px", display: "none"}}>
            <div className="letter-paper-class-1">
              <p className="letter-subject">Leave Application due to release of Cytroid [24IM10016]</p>
              <div className="row-center" style={{alignSelf: "center", gap: "5px"}}>
                <span className="material-symbols-outlined" style={{fontSize: "20px", color: "rgba(77, 17, 105, 0.8)", textShadow: "0px 0px 0px rgba(199, 0, 199, 0.36)", userSelect: "none"}}>lock</span>
                <p style={{fontWeight: "600", color: "purple"}}>Standard TLS Encryption</p>
              </div>
              <div className="row-center" style={{width: "100%", marginTop: "10px"}}>
                <div className="row-center" style={{gap: "10px"}}>
                  <p style={{fontWeight: "700"}}>From</p>
                  <div className="row-center" style={{gap: "5px"}}>
                    <p style={{fontWeight: "500"}}>Anshul Singh</p>
                    <p>•</p>
                    <p style={{color: "purple"}}>anshul@sayutel.com</p>
                  </div>
                </div>
              </div>
              <div className="row-center" style={{width: "100%"}}>
                <div className="row-center" style={{gap: "10px"}}>
                  <p style={{fontWeight: "700"}}>To</p>
                  <div className="row-center" style={{gap: "5px"}}>
                    <p style={{fontWeight: "500"}}>Subhajit Sidhanta</p>
                    <p>•</p>
                    <p style={{color: "purple"}}>subhajit@iem.iitkgp.ac.in</p>
                  </div>
                </div>
              </div>
              <div className="row-center" style={{width: "100%"}}>
                <div className="row-center" style={{gap: "10px"}}>
                  <p style={{fontWeight: "700"}}>Mailed by</p>
                  <div className="row-center" style={{gap: "5px"}}>
                    <p style={{color: "purple", fontWeight: "700"}}>sayutel.com</p>
                  </div>
                </div>
              </div>
              <div className="row-center" style={{width: "100%"}}>
                <div className="row-center" style={{gap: "10px"}}>
                  <p style={{fontWeight: "700"}}>Signed by</p>
                  <div className="row-center" style={{gap: "5px"}}>
                    <p style={{color: "purple", fontWeight: "700"}}>sayutel.com</p>
                  </div>
                </div>
              </div>
              <div className="letter-content">
                Dear sir<br></br><br></br>I am Anshul Singh, roll number 24IM10016 from the Department of Industrial and Systems Engineering. I request you to grant me leave for 12th, 13th, 14th and 15th of July as I was unable to attend classes that day due to the opening ceremony of Cytroid.<br></br><br></br>I hope that you will grant me leave for the same as well give blessings for my company.<br></br><br></br>Thank you<br></br><br></br>Yours Sincerely<br></br>Anshul Singh<br></br><br></br><p style={{color: "gray"}}>Sent using SayuMail by Sayutel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

}
