import React, { Component } from 'react'

class Edit extends Component {

  state={
    email:''
  }

  handleChange =(e) =>{
    this.setState({
      email:e.target.value
    })
  }

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
