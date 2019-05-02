import React, { Component } from 'react'
import axios from 'axios';
class Edit extends Component {

  state={
    email:''
  }

  getCurrentUser() {
    return localStorage.getItem("Username");
}

  /**
 * Handles Email change.
 * @function handleChange
 * @param {event} e - The change of the Email.
 */
  handleChange =(e) =>{
    this.setState({
      email:e.target.value
    })
  }
  /**
 * Handles edit-Email form submission.
 * @function handleSubmit
 * @param {event} e - The submission of the edit-Email form.
 */
  handleSubmit =(e) =>{
    e.preventDefault();
    let username = this.getCurrentUser();
    alert(username);


    let checker ="";
    
    let Emailcontent = document.getElementById("userEmail").value;
  
  if (Emailcontent===checker)
  {
    alert ("Please provide an Email !");
    return ;
  }
  var headers = {
    'auth': localStorage.getItem("token")
  }
  var data = {Email:this.state.email}

    console.log(data);
  axios.put('me/edit/email/' + username, data, { headers: headers })
.then(res => {
  console.log(res);
  if (res.status==200)
  { 
    alert("Email changed Successfully!");
  }else if (res.status===401 || res.status===404)
  {
    alert("Email  Unsuccessful");
    return Response.json;
  }
 })
 .catch(error => {
   alert("Error Caught");
 })
  }


  render() {
    return (
      <div className="edit">

        <form onSubmit={this.handleSubmit}>
          <input type="Email" placeholder="Update E-mail" id="userEmail"onChange={this.handleChange} />
        <input type="submit" value="Update" />
        </form>
       <h6>Your new mail : {this.state.email} </h6>
        
      </div>
    )
  }
}

export default Edit
