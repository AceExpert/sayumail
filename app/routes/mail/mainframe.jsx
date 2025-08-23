import { Component, createRef } from "react";
import { Outlet, useNavigate } from "react-router";

import InputClass1, { SelectInputClass1 } from "../../components/input";
import SelectClass1 from "../../components/select";
import Tab, { Divider, Tab2 } from "../../components/tab";
import NotificationClass1 from "../../components/notification";
import Attachment from "../../components/attachment";
import Fab from "../../components/fab";

import Phone from "../../miniscreens/phone";

import { emailPat, testHTML } from "../../constants";

import "../../styles/mainframe.css";
import "../../styles/inbox.css";
import "../../styles/lightminiscreen.css"

import SputhMail from "../../assets/images/sputh-mail-butter.svg";
import SputhMailLotus from "../../assets/images/sputh-mail-lotus.svg";
import SputhMailSnake from "../../assets/images/sputh-mail-snake.svg";
import Ribbons from "../../assets/images/pride-flag-2.svg";
import MiniRibbons from "../../assets/images/ribbon-3-full.svg";
import Sputh from "../../assets/images/sputh-couple-red.svg";
import Branch from "../../assets/images/only-flowers.svg";
import TransFlag from "../../assets/images/trans-flag.svg";

export function meta({}) {
  return [
    { title: "SayuMail" },
    { name: "Sayutel Mail", content: "Send and Receive emails" },
  ];
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    let _loaderres;
    this.state = {
      composing: false,
      toAddr: 'very.anshul@gmail.com',
      ccAddr: [],
      bccAddr: [],
      subject: '',
      content: '',
      html: '',
      fromDomain: ['sayutel.com'],
      sign: ['cytroid.in'],
      notifications: [],
      viewMail: {
        from_name: "Anshul Singh",
        from_addr: "anshul@sayutel.com",
        to_name: "Subhajit Sidhanta",
        to_addr: 'subhajit@iem.iitkgp.ac.in',
        domain: 'sayutel.com',
        sign: 'sayutel.com',
        subject: 'Leave Application due to release of Cytroid [24IM10016]',
        tls: true,
        body: '<div style="padding: 10px 20px;"><div>Dear sir</br></br>I am Anshul Singh, roll number 24IM10016 from the Department of Industrial and Systems Engineering. I request you to grant me leave for 12th, 13th, 14th and 15th of July as I was unable to attend classes that day due to the opening ceremony of Cytroid.</br></br>I hope that you will grant me leave for the same as well give blessings for my company.</br></br>Thank you</br></br>Yours Sincerely</br>Anshul Singh</br></br><p style="color: mediumpurple; margin:5px 0px;">Sent using SayuMail by Sayutel</p></div></div>'
      },
      showingMail: true,
      _loaderprom: new Promise(res => _loaderres = res),
      attachmentShowing: false,
      phoneShowing: false,
    };
    this.phone = createRef();
    this.attachmentView = createRef();

    this.letterContent = createRef();
    this.toInputCon = createRef();

    this.toInput = createRef()
    this.ccInput = createRef();
    this.bccInput = createRef();
    this.subjectInput = createRef();
    this.composeInput = createRef();
    this.state._loaderres = _loaderres;
  }

  componentDidMount() {
    //let [_, folder, type] = /\/([^\/]+)(?:\/([^\/]+))?\/*/i.exec(window.location.pathname);
    import("../../sender/index").then(({ EmailSender, connection }) => {
      this.connect(EmailSender, connection)
    })
    
    let parser = new DOMParser();
    let html = parser.parseFromString(testHTML && this.state.viewMail.body, "text/html");
    let body = html.querySelector("body");

    this.letterContent.current.innerHTML = body.innerHTML;
    this.letterContent.current.style.cssText = body.style.cssText;
  }

  connect(EmailSender, connection) {
    if(!connection.server || connection.server.readyState !== WebSocket.OPEN) {
      this.sender = EmailSender.start('ws://cybertron:3008/mail', () => this.connect(EmailSender, connection), () => {
        this.sender.openChannel().then(() => {
          console.log("opened");
          this.sender.authorize("anshul", "Anshul@7329").then(() => {
            console.log("Authorized");
            this.state._loaderres({
              showMail: this.showMail.bind(this)
            })
          });
        })
      })
      connection.server = this.sender;
    } else {
      this.sender = connection.server
      this.state._loaderres({
        showMail: this.showMail.bind(this)
      })
    }
  }

  saveDraft() {
    this.setState({composing: false});
  }

  sendMail() {
    this.resetCompose()
    this.setState({composing: false})
    this.fireNotification({title: "Email sent", description: <p>Email to <b style={{color: "purple"}}>very.anshul@gmail.com</b> sent</p>})
    /*
    this.sender.sendMail({
      toAddr: this.state.toAddr,
      ccAddr: this.state.ccAddr,
      bccAddr: this.state.bccAddr,
      subject: this.state.subject,
      content: this.state.content,
      html: this.state.html,
      fromDomain: this.state.fromDomain,
      sign: this.state.sign,
      id: Math.random().toString(),
    }).then(({error}) => {
      if(!error) {
        this.resetCompose()
        this.setState({composing: false})
      }
    })*/
  }

  showMail(mail) {
    this.letterContent.current.innerHTML = mail.body;
    if(['gmail.com', 'sayutel.com', 'outlook.com', 'live.com', 'sst.scaler.com', 'iitkgp.ac.in'].some(v => mail.domain.includes(v))) {
      this.letterContent.current.style.padding = "10px 20px";
    } else {
      this.letterContent.current.style.padding = "0px";
    }
    this.setState({viewMail: mail, showingMail: true})
  }

  openAttachments() {
    this.setState({attachmentShowing: true}, () => {
      this.attachmentView.current.focus();
    })
  }

  fireNotification({title, description}) {
    let id = Date.now()
    this.setState({
      notifications: [...this.state.notifications, {id, title, description, fired: false, display: true}]
    }, () => {
      this.setState({
        notifications: this.state.notifications.map((notif) => {
          if(notif.id === id) {
            notif.fired = true
          }
          return notif
        })
      }, () => {
        setTimeout(() => {
          this.setState({
            notifications: this.state.notifications.map((notif) => {
              if(notif.id === id) {
                notif.fired = false
              }
              return notif
            })
          }, () => {
            setTimeout(() => this.setState({
              notifications: this.state.notifications.map((notif) => {
                if(notif.id === id) {
                  notif.display = false
                }
                return notif
              })
            }), 500)
          })
        }, 10000)
      })
    })
  }

  resetCompose() {
    this.toInput.current.innerHTML = 'user@email.com';
    this.subjectInput.current[1]('');
    this.composeInput.current[1]('');
    this.ccInput.current[1]([])
    this.bccInput.current[1]([])
    this.setState({
      toAddr: '  ',
      ccAddr: [],
      bccAddr: [],
      subject: '',
      content: '',
      html: '',
    });
  }

  render = () =>
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column"}}>
      <div className="column" style={{position: "absolute", bottom: "-180px", left: "-100px"}}>
        <img src={Ribbons} style={{opacity: .25, transform: "rotate(90deg)", height: "700px"}}/>
      </div>
      <div className="notification-panel column">
        {this.state.notifications.map(
          ({id, title, description, fired, display}) => {
            return <NotificationClass1 title={title} description={description} key={id} className="ntf-1" mainStyle={{position: "relative", right: fired? "0px" : '-400px', display: display? 'flex' : 'none'}}/>
          }
        )}
      </div>
      
      <Phone style={{left: this.state.phoneShowing? "0px" : "-500px"}} ref={this.phone} onBlur={() => this.setState({phoneShowing: false})}/>

      {/* <Fab onClick={() => this.setState({phoneShowing: true}, () => this.phone.current.focus())}/> */}

      <div className="compose-box column">
        <div className="column" style={{gap: "5px", display: this.state.composing? "flex" : "none"}}>
          <div className="row-center" style={{height: "35px", gap: "5px"}}>
            <div className="row-center float-con">To</div>
            <div className="row-center float-con" style={{fontWeight: "500", gap: "5px"}} contentEditable={false} ref={this.toInputCon}>
              <div style={{outline: "none"}} className="chip-class-1" contentEditable="true" spellCheck={false} ref={this.toInput}
                onInput={({target}) => {
                  this.state.toAddr = target.innerText.trim();
                  if(!emailPat.test(this.state.toAddr)) {
                    this.toInputCon.current.style.borderColor = 'red';
                    this.toInputCon.current.style.borderWidth = '2px';
                  } else {
                    this.toInputCon.current.style.borderColor = 'rgb(83, 0, 161)'
                    this.toInputCon.current.style.borderWidth = '1px';
                  }
                }}
              >{'very.anshul@gmail.com'}</div>
            </div>
          </div>
          <div className="row-center" style={{minHeight: "35px", gap: "5px"}}>
            <div className="row-center float-con" style={{height: "35px"}}>CC</div>
            <SelectInputClass1 className="cc-bcc-input" defaults={this.state.ccAddr} ref={this.ccInput}
              onInput={(data) => {
                this.state.ccAddr = data;
            }}/>
          </div>
          <div className="row-center" style={{gap: "5px", justifyContent: "space-between"}}>
            <div className="row-center" style={{gap: "5px"}}>
              <div className="row-center float-con" style={{height: "35px"}}>BCC</div>
              <SelectInputClass1 className="cc-bcc-input" defaults={this.state.bccAddr} ref={this.bccInput}
                onInput={(data) => {
                  this.state.bccAddr = data;
              }}/>
            </div>
            <div className="row-center" style={{gap: "5px", paddingRight: "5px"}}>
              <span className="material-symbols-outlined close-button" style={{}} onClick={this.saveDraft.bind(this)}>close</span>
            </div>
          </div>
        </div>
        <div style={{gap: "5px", marginTop: "-7px"}} className="column">
          <div className="row-center" style={{minHeight: "45px", gap: "5px", display: this.state.composing? "flex" : "none", justifyContent: "space-between"}}>
            <InputClass1 placeholder={"Subject"} className={"float-con subject-con"} placeholderClassName={"subject-input-placeholder"} inputClassName={"subject-input-placeholder"} 
                         onInput={(target, text) => {
                          this.setState({subject: text});
                         }}
                         ref={this.subjectInput}
                         />
            <div className="row-center" style={{gap: "5px"}}>
                <span className="material-symbols-outlined send-button hover-ptr" style={{}} onClick={this.sendMail.bind(this)}>send</span>
            </div>
          </div>
          <InputClass1 
            icon={this.state.composing? undefined : "edit"} placeholder={"Compose"} 
            className={"compose-input " + (this.state.composing? " compose-input-on": "")} textArea={true} 
            style={{minHeight: this.state.composing? "200px" : "50px", minWidth: this.state.composing? "600px" : "140px", display: "none"}} 
            enabled={this.state.composing}
            ref={this.composeInput}
            onClick={() => {
              this.setState({composing: true}); 
              return 600;
            }}
            onInput={({target}, text) => {
              this.setState({
                content: text, html: target.innerHTML.trim()
              })
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
            <SelectClass1 label={"cytroid.in"} defaultValue={this.state.fromDomain} values={{'cytroid.in': 'cytroid.in', 'sayutel.com': 'sayutel.com'}} required={true}
              onSelect = {(values) => {
                this.state.fromDomain = values;
              }}
            />
          </div>
          <div className="row-center" style={{height: "100%", gap: "5px"}}>
            <div className="row-center float-con">Sign</div>
            <SelectClass1 label={"cytroid.in"} defaultValue={this.state.sign} values={{'cytroid.in': 'cytroid.in', 'sayutel.com': 'sayutel.com'}} required={true} multi={true}
              onSelect={(values) => {
                this.state.sign = values;
              }}
            />
          </div>
        </div>
      </div>
      <div className="mainhead">
        {/* <div className="c0-holder"></div> */}
        <div className="row-center" style={{gap: "70px", height: "100%", padding: "0px 0px 0px 0px"}}>
          <div className="row-center" style={{gap: "0px", height: "100%"}}>
            <img src={SputhMail} className="header-logo-icon clickable"/>
            <p style={{}} className="app-name">sputh</p>
          </div>
          <div className="row-center" style={{height: "100%", padding: "7px 0px"}}>
            <InputClass1 icon={"search"} placeholder={"Search"} className={"search-input"} placeholderClassName={"search-input-placeholder"}/>
          </div>
        </div>
        <div className="row-center control-holder">
          <div className="row-center">
              <span className="material-symbols-outlined settings-icon" style={{}}>settings</span>
          </div>
          <div style={{height: "100%"}}>
            <img src="https://cdn-icons-png.freepik.com/512/168/168720.png" className="header-avatar"/>
          </div>
        </div>
      </div>
      <div style={{width: "100%", height: "100%"}} className="row">
        <div style={{}} className="column navil-con">
          <div className="column navil" >
            <Tab name={"Inbox"} icon={"inbox"} selected={this.props.params.folder === 'inbox'}/>
            <Tab name={"Sent"} icon={"send"} selected={this.props.params.folder === 'sent'}/>
            <Tab name={"Chat"} icon={"chat"} selected={this.props.params.folder === 'chat'}/>
            <Tab name={"Draft"} icon={"draft"} selected={this.props.params.folder === 'draft'}/>
            <Tab name={"Spam"} icon={"report"} selected={this.props.params.folder === 'spam'}/>
            <Tab name={"Recycle bin"} icon={"delete"} selected={this.props.params.folder === 'bin'} link={"/bin"}/>
          </div>
          <div className="column light-screen">

            <div className="column" style={{width: "100%", position: "relative"}}>
              
              <div className="column-center" style={{padding: "12px 5px", width: "fit-content", gap: "0px", width: "100%", zIndex: 1}}>
                <p className="light-time-scr">12:06</p>
                <p className="light-date-scr">Thu, Apr 7</p>
              </div>
              <div className="column-center notif-center-mini-light">
                <div className="mini-light-notif column">
                  <div className="row-center" style={{gap: "4px"}}>
                    <span className="material-symbols-outlined notif-mini-light-icon">inbox</span>
                    <p className="notif-mini-app-title">New mail from <b>Sayu</b></p>
                  </div>
                  <div className="column" style={{gap: "3px"}}>
                    <div className="row-center" style={{padding: ""}}>
                      <p style={{fontWeight: "700", fontSize: "14px", color: "rebeccapurple"}}>Regarding our meet</p>
                    </div>
                    <div className="row-center" style={{padding: "0px 0px"}}>
                      <p style={{fontWeight: "400", fontSize: "11px", color: "rebeccapurple"}}>Hi I think we should meet soon...</p>
                    </div>
                  </div>
                </div>

                <div className="mini-light-notif column">
                  <div className="row-center" style={{gap: "4px"}}>
                    <span className="material-symbols-outlined notif-mini-light-icon">chat</span>
                    <p className="notif-mini-app-title">New message from <b>Sputh</b></p>
                  </div>
                  <div className="column" style={{gap: "3px"}}>
                    <div className="row-center" style={{padding: "0px 0px"}}>
                      <p style={{fontWeight: "500", fontSize: "11px", color: "rebeccapurple"}}>Hi im coming to u by flying</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column" style={{position: "absolute", top: "-50px", left: "-140px"}}>
                <img src={TransFlag} style={{opacity: .4, height: "300px", transform: "rotate(170deg)"}}/>
              </div>

              <div className="column" style={{position: "absolute", top: "-30px", left: "-50px", display: "none"}}>
                <img src={Branch} style={{opacity: .4, height: "200px", transform: "rotate(0deg)"}}/>
              </div>

            </div>

          </div>
        </div>
        <div style={{width: "100%"}} className="row">
          <div style={{width: "calc(100% - 20px)", gap: "0px", boxShadow: '10px 20px 20px 0px rgba(0, 0, 0, 0.05)' && 'none', display: !this.state.showingMail? "flex" : this.state.mailFullScreen === true? "none" : undefined}} className={"column mailview-main-no-show " + this.state.showingMail?  'mailview-main-no-show' : ''}>
            <Outlet context={{loader: this.state._loaderprom}}/>
          </div>
          <div className="column-center" style={{width: "100%", height: "100%", borderLeft: "0px solid rgba(0, 0, 0, 0.5)", padding: "20px 30px", display: this.state.showingMail? "flex" : "none", gap: "0px"}}>
            <div className="letter-action-bar column-center" style={{display: "none", margin: "0px 0px 0px 15px", borderRadius: "7px 7px 0px 0px"}}>
              <div className="row-center letter-actions" style={{gap: "10px"}}>
                <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "22px", color: "black"}}>star</span>
                <div style={{}} className="divider-class-2 display-none"></div>
                <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>save</span>
                <div style={{}} className="divider-class-2 display-none"></div>
                <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>download</span>
                <div style={{}} className="divider-class-2 display-none"></div>
                <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>reply</span>
                <div style={{}} className="divider-class-2 display-none"></div>
                <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>forward</span>
                <div style={{}} className="divider-class-2 display-none"></div>
                <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>label_important</span>
              </div>
            </div>
            <div className="letter-paper-class-1-con">
              <div className={"letter-paper-class-1 column-center " + (this.state.mailFullScreen? "letter-paper-fullscreen" : "")}>
                <div className="letter-camera row-center">
                  <div className="letter-camera-eyes column-center">
                    <div className="letter-camera-eye eye-1"></div>
                    <div className="letter-camera-eye eye-2"></div>
                    <div className="letter-camera-eye eye-3"></div>
                  </div>
                </div>
                <div className="row-center letter-window-controls">
                  <div className="column-center" style={{gap: "10px"}}>
                    <span className="material-symbols-outlined window-ctrl-icon" style={{fontSize: "20px", color: "rgba(138, 0, 172, 0.84)"}} onClick={() => this.setState({showingMail: false})}>close</span>
                    <span className="material-symbols-outlined window-ctrl-icon" style={{fontSize: "16px", marginTop: "-4px", color: "rgba(80, 0, 172, 0.84)"}} onClick={() => this.setState({mailFullScreen: !this.state.mailFullScreen})}>{this.state.mailFullScreen? 'close_fullscreen' : 'check_box_outline_blank'}</span>
                    <span className="material-symbols-outlined window-ctrl-icon" style={{fontSize: "16px", color: "rgba(172, 0, 120, 0.9)"}}>open_in_new</span>
                  </div>
                </div>
                <div className="letter-action-bar column-center">
                  <div className="row-center letter-actions" style={{gap: "10px", display: "flex"}}>
                    <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "22px", color: "black"}}>star</span>
                    <div style={{}} className="divider-class-2 display-none"></div>
                    <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>save</span>
                    <div style={{}} className="divider-class-2 display-none"></div>
                    <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>download</span>
                    <div style={{}} className="divider-class-2 display-none"></div>
                    <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>reply</span>
                    <div style={{}} className="divider-class-2 display-none"></div>
                    <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>forward</span>
                    <div style={{}} className="divider-class-2 display-none"></div>
                    <span className="material-symbols-outlined letter-action-icon" style={{fontSize: "20px", color: "black"}}>label_important</span>
                  </div>
                </div>
                <div className="letter-padded-block column" style={{marginTop: "7px"}}>
                  <p className="letter-subject">{this.state.viewMail?.subject}</p>
                  <div className="row-center" style={{alignSelf: "center", gap: "5px"}}>
                    <span className="material-symbols-outlined" style={{fontSize: "15px", color: "rebeccapurple", textShadow: "0px 0px 0px rgba(199, 0, 199, 0.36)", userSelect: "none"}}>lock</span>
                    <p style={{fontWeight: "600", color: "rebeccapurple", fontSize: "15px"}}>Standard TLS Encryption</p>
                  </div>
                </div>
                <Divider style={{marginTop: "10px", backgroundColor: "transparent"}}/>
                <div className="letter-padded-block column letter-block-one">
                  <div className="row-center" style={{width: "100%", marginTop: "0px"}}>
                    <div className="row-center" style={{gap: "10px"}}>
                      <p style={{fontWeight: "700", fontSize: "14px"}}>From</p>
                      <div className="row-center" style={{gap: "5px"}}>
                        <p style={{fontWeight: "500", fontSize: "14px"}}>{this.state.viewMail?.from_name}</p>
                        <p>•</p>
                        <p style={{color: "rebeccapurple", fontSize: "14px"}}>{this.state.viewMail?.from_addr}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row-center" style={{width: "100%"}}>
                    <div className="row-center" style={{gap: "10px"}}>
                      <p style={{fontWeight: "700", fontSize: "14px"}}>To</p>
                      <div className="row-center" style={{gap: "5px"}}>
                        <p style={{fontWeight: "500", fontSize: "14px"}}>{this.state.viewMail?.to_name}</p>
                        <p>•</p>
                        <p style={{color: "rebeccapurple", fontSize: "14px"}}>{this.state.viewMail?.to_addr}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row-center" style={{width: "100%"}}>
                    <div className="row-center" style={{gap: "10px"}}>
                      <p style={{fontWeight: "700", fontSize: "15px"}}>Mailed by</p>
                      <div className="row-center" style={{gap: "5px"}}>
                        <p style={{color: "rebeccapurple", fontWeight: "700", fontSize: "15px"}}>{this.state.viewMail?.domain}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row-center" style={{width: "100%"}}>
                    <div className="row-center" style={{gap: "10px"}}>
                      <p style={{fontWeight: "700", fontSize: "15px"}}>Signed by</p>
                      <div className="row-center" style={{gap: "5px"}}>
                        <p style={{color: "rebeccapurple", fontWeight: "700", fontSize: "15px"}}>{this.state.viewMail?.sign}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Divider style={{marginTop: "0px", backgroundColor: "transparent"}}/>
                <div className="letter-padded-block-2 column" style={{height: "100%"}}>
                  <div className="letter-content" style={{}}>
                    <div ref={this.letterContent} className="letter-content-main">

                    </div>
                    <div className={"letter-content-backdrop "+(this.state.attachmentShowing? "letter-content-backdrop-active" : "")}>

                    </div>
                  </div>
                </div>
                <div className="column" style={{position: "absolute", bottom: "-150px", right: "-0px"}}>
                  <img src={MiniRibbons} style={{opacity: .3, transform: "rotate(10deg)", height: "400px"}}/>
                </div>
                <div className="column" style={{position: "absolute", right: "-0px", top: "-20px", zIndex: -1}}>
                  <img src={Branch} style={{opacity: .4, height: "200px", transform: "rotate(270deg)"}}/>
                </div>
                <div className="column" style={{position: "absolute", left: "10px", bottom: "0px", zIndex: -1}}>
                  <img src={Sputh} style={{opacity: .5, height: "100px", transform: "rotate(-10deg)"}}/>
                </div>
                <div className="column letter-attachment-view" ref={this.attachmentView} tabIndex={1} onBlur={() => this.setState({attachmentShowing: false})}  style={{bottom: this.state.attachmentShowing? "0px" : "-150px"}}>
                  <div className="row-center">
                    <p style={{color: "rgba(0, 0, 0, 0.79)", fontWeight: "600", fontSize: "23px", paddingLeft: "10px", textShadow: "0px 0px 5px rgba(0, 0, 0, 0.08)"}}>Attachments</p>
                  </div>
                  <div className="column-center letter-attachments">
                    <div className="attachment-con row-center">
                      <Attachment />
                      <Attachment />
                      <Attachment />
                    </div>
                  </div>
                </div>
                <div className="letter-bottom-bar-con row-center" style={{display: this.state.attachmentShowing? "none" : "flex"}}>
                  <div className="row-center letter-bottom-bar">
                    <span className="material-symbols-outlined row-center attach-open" style={{}} onClick={this.openAttachments.bind(this)}>attach_file</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="letter-paper-class-1-con attachment-screen-frame column-center">
              <div className="letter-paper-class-1 column-center attachment-screen">
                <div className="attachment-con row-center">

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
}

export default function HomeView(props) {
  let navigate = useNavigate();

  return <Home {...props} navigate={navigate}/>
}
