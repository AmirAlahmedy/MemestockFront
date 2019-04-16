import React from 'react';
import {changePasswordApiCall} from '../../actions/Profile'
import axios from "axios/index";
class ChangePass extends React.Component {
    constructor(props){
        super(props);
        this.state = { user: null, oldPassword: '', newPassword: '' };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    }

    async getCurrentUser(){
        const username=localStorage.getItem("username");
    
    }

    handleOldPasswordChange(e) {
        this.setState({ oldPassword: e.target.value });
    }
    handleNewPasswordChange(e) {
        this.setState({ newPassword: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();

        var data = {
            user:this.state.user,
           oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        };
        let checker ="";
  
  if (document.getElementById("oldPassword").value===checker)
  {
    alert ("Please provide an old password!");
    return ;
  }
  else if (data.oldPassword.length < 8){
    alert('Old password length must be minimum 8 characters');
    return;
}
else if (data.newPassword.length < 8){
    alert('New password length must be minimum 8 characters');
    return;
}
  else if (document.getElementById("newPassword").value===checker)
  { alert ("Please provide a new password!");
    return ;
  }
  var headers = {
    'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJHb29kR3V5cyIsImlhdCI6MTU1NTEwMDEyOX0.Fz8Abtwx-vmoKnncKdmJr-_kYb4Zl-YPQJeO26iMaFA'
  }
  console.log(data);
let username=this.state.user;



 axios.post( 'http://localhost:4000/me/edit/password',username,{headers: headers}
        )
        
        .then(res => {
            console.log(res);
            if (res.status==200)
            { 
              alert("Password changed Successfully!");
            }else if (res.status===401 || res.status===404)
            {
              alert("Password changes Unsuccessful");
              return Response.json;
            }
           })
           .catch(error => {
             alert("Error Caught");
           })
        }

    




    componentDidMount(){
        this.getCurrentUser();
    }

    render() {


        return (
            <div>
                <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                <h3>Change Password</h3>
                    <div className="form-group">
                        <label>Old Password:</label>
                        <input className="form-control" type="password" id="oldPassword" autoComplete="current-password"
                               onChange={this.handleOldPasswordChange} />
                    </div>
                    <div className="form-group">
                        <label>New Password:</label>
                        <input className="form-control" type="password" id="newPassword"  autoComplete="new-password"
                               onChange={this.handleNewPasswordChange} />
                    </div>
                    <input class="btn btn-primary" type="submit" id="submit" value="Submit"/>
                </form>
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        error: state.profile.error,
        success: state.profile.success
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePasswordApiCall: (data) => dispatch(changePasswordApiCall(data))
    }
};

export default ChangePass;