import React from 'react';
import { changePasswordApiCall } from '../../actions/Profile'
import axios from "../../axios-orders";
class ChangePass extends React.Component {
    constructor(props) {
        super(props);
        this.state = { user: null, oldPassword: '', newPassword: '' };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    }
    /**
    * Gets the current  user name from the local storage
    * @function getCurrentUser
    */
    getCurrentUser() {
        return localStorage.getItem("Username");
    }
      /**
    * Adds the old password to the state
    * @function getCurrentUser
    * @param {event} e - onChange event
    */
    handleOldPasswordChange(e) {
        this.setState({ oldPassword: e.target.value });
    }
      /**
    * Sets the state with the new password
    * @function handleNewPasswordChange
    * @param {event} e - onChange event
    */
    handleNewPasswordChange(e) {
        this.setState({ newPassword: e.target.value });
    }
     /**
    * Handles changing the password
    * @function handleSubmit
    * @param {event} e - submission of the form
    */
    handleSubmit(e) {
        e.preventDefault();
        let username = this.getCurrentUser();
        alert(username);
        var data = {
            OldPassword: this.state.oldPassword,
            NewPassword: this.state.newPassword
        };
        let checker = "";

        if (document.getElementById("oldPassword").value === checker) {
            alert("Please provide an old password!");
            return;
        }
        else if (data.OldPassword.length < 8) {
            alert('Old password length must be minimum 8 characters');
            return;
        }
        else if (data.NewPassword.length < 8) {
            alert('New password length must be minimum 8 characters');
            return;
        }
        else if (document.getElementById("newPassword").value === checker) {
            alert("Please provide a new password!");
            return;
        }
        var headers = {
            'auth': localStorage.getItem("token")
        }



        axios.put('me/edit/Password/' + username, data, { headers: headers }
        )

            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    alert("Password changed Successfully!");
                } else if (res.status === 401 || res.status === 404) {
                    alert("Password changes Unsuccessful");
                    return Response.json;
                }
            })
            .catch(error => {
                alert("Error Caught");
            })
    }






    componentDidMount() {
        this.getCurrentUser();
    }

    render() {


        return (
            <div>
                <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Old Password

                        <input className="form-control" type="password" id="oldPassword" autoComplete="current-password"
                                onChange={this.handleOldPasswordChange} />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>New Password
                        <input className="form-control" type="password" id="newPassword" autoComplete="new-password"
                                onChange={this.handleNewPasswordChange} />
                        </label>
                    </div>
                    <input class="btn btn-primary" type="submit" id="submit" value="Submit" />
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