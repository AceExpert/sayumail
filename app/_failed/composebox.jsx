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