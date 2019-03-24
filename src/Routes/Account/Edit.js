import React, { Component } from 'react'

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
  }

  render() {
    return (
      <div className="edit">

        <form onSubmit={this.handleSubmit}>
          <input type="email" placeholder="Update E-mail"onChange={this.handleChange} />
        <input type="submit" value="Update" />
        </form>
        {this.state.email}
        
      </div>
    )
  }
}

export default Edit
