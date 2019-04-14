import React from 'react';
import {changePasswordApiCall} from '../../actions/Profile'

class ChangePass extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = { user: null, oldPassword: '', newPassword: '' };
    //     this.getCurrentUser = this.getCurrentUser.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //     this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    //     this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    // }

    // async getCurrentUser(){
    //     // this.props.auth.getUser()
    //     //     .then(user => this.setState({user}));
    // }

    // handleOldPasswordChange(e) {
    //     this.setState({ oldPassword: e.target.value });
    // }
    // handleNewPasswordChange(e) {
    //     this.setState({ newPassword: e.target.value });
    // }

    // handleSubmit(e){
    //     e.preventDefault();

    //     var data = {
    //         userId: this.state.user.sub, oldPassword: this.state.oldPassword, newPassword: this.state.newPassword
    //     };
    //     this.props.changePasswordApiCall(data);
    // }

    // componentDidMount(){
    //     this.getCurrentUser();
    // }

    render() {
        // if(!this.state.user) return null;
        // const errorMessage = this.props.error ?
        //     (<div className="alert alert-danger"><strong>Error! </strong>{this.props.error}</div>):
        //     null;
        // const successMessage = this.props.success ?
        //     (<div className="alert alert-success"><strong>Success! </strong>{this.props.success}</div>):
        //     null;


        return (
            <div>
                <section className="user-profile">
                    <div>
                        {/* <label>Name:</label>
                        <span>{this.state.user.name}</span> */}
                    </div>
                </section>
                <br />
                <br />
                <form className="form-horizontal col-sm-6" onSubmit={this.handleSubmit}>
                <h3>Change Password</h3>
                    <br />
                    {/* {errorMessage}
                    {successMessage} */}
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
                    <input className="btn btn-outline-success col-2" type="submit" id="submit" value="Submit"/>
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