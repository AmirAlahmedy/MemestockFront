import React, { Component } from 'react';
import './AddComment.css';
class AddComment extends Component {
state={
comment:''
}


onChange=(e)=>this.setState({comment:e.target.value});


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