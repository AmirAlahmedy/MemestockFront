import React, {Component} from 'react';

export class UserInput extends Component{
    constructor(){
       super();
       this.state = {
           uid: 1,
           uuname: "",
           uemail: "",
           uphone: ""
       }
       this._handleInputChange = this._handleInputChange.bind(this);
       this._handleOnSubmit = this._handleOnSubmit.bind(this);
    }
     /**
     * Sets the state with new user input
     * @function _handleInputChange
     * @param {event} - onCahnge event
     */
    _handleInputChange(event){
          const target = event.target;
          const value = target.value;
          const id = target.id;
          this.setState({
              [id]: value
          });
    }

     /**
     * Handles submission
     * @function _handleOnSubmit
     */
    _handleOnSubmit(){
    this.props.newUser(this.state);
    var userId = this.state.uid + 1;
    this.setState({
        uid: userId,
        uuname: "",
        uemail: "",
        uphone: ""
    })
}

    render(){
        return(
            <div className="userinputstyle col-sm-2 sidenav">
                <h3>--- Enter Details ---</h3>

                <label className="label label-info">User Name: </label><input type="text" className="form-control" id="uuname" value={this.state.uuname} onChange={this._handleInputChange}/><br/>
                <label className="label label-info">Email: </label><input type="text" className="form-control" id="uemail" value={this.state.uemail} onChange={this._handleInputChange}/><br/>
                <label className="label label-info">Phone #: </label><input type="text" className="form-control" id="uphone" value={this.state.uphone} onChange={this._handleInputChange}/><br/>
                <button className="btn btn-primary" onClick={this._handleOnSubmit}>Create User</button>
            </div>
        );
    }
}