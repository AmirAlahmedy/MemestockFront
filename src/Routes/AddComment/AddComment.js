import React, { Component } from 'react';
import './AddComment.css';
class AddComment extends Component {
state={
comment:''
}

 /**
     * Sets the changed text of the comment  into the state
     * @function onChange
     * @param {event} -onChange event
     */
    onChange=(e)=>this.setState({comment:e.target.value});

 /**
     * Handles the addition of a comment
     * @function onSave
     * @param {event} - submisson event
     */
    onSave=(e)=>{
    e.preventDefault();
    this.props.addComment(this.state.comment);
    this.setState({title:''});
}


render(){
return(
<form  onSubmit={this.onSave}>
    <input   className="textComment" type="text"
     name="comment" placeholder="Write your comment here..."
     value={this.state.comment} onChange={this.onChange}
    />
    <input type="submit" value="Save" className="saveComment"/>
    
</form>

);

}


}
export default AddComment;