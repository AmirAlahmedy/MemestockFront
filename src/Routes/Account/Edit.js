import React, { Component } from 'react'
import axios from 'axios';
class Edit extends Component {

  state={
    email:''
  }

  /**
 * Handles email change.
 * @function handleChange
 * @param {event} e - The change of the email.
 */
  handleChange =(e) =>{
    this.setState({
      email:e.target.value
    })
  }
  /**
 * Handles edit-email form submission.
 * @function handleSubmit
 * @param {event} e - The submission of the edit-email form.
 */
  handleSubmit =(e) =>{
    e.preventDefault();
    let checker ="";
    let emailcontent = document.getElementById("useremail").value;
  
  if (emailcontent===checker)
  {
    alert ("Please provide an email password!");
    return ;
  }
  var headers = {
    'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJtZW1lc3RvY2siLCJzdWIiOiJHb29kR3V5cyIsImlhdCI6MTU1NTEwMDEyOX0.Fz8Abtwx-vmoKnncKdmJr-_kYb4Zl-YPQJeO26iMaFA'
  }
  var data = {
    email:this.state.email
};
  console.log(data);
let username=this.state.email;
axios.post('http://localhost:4000/me/edit/email',username,emailcontent,{headers: headers})
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
          <input type="email" placeholder="Update E-mail" id="useremail"onChange={this.handleChange} />
        <input type="submit" value="Update" />
        </form>
       <h6>Your new mail : {this.state.email} </h6>
        
      </div>
    )
  }
}

export default Edit
