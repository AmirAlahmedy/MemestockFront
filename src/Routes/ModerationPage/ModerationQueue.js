import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom'
import axios from '../../axios-orders';


class ModerationQueue extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
      
          Reports: [],
        isLoading: true,
        errors: null
        
        }
      

    };
      
  componentDidMount() {
    console.log(this.props);

    axios.get( 'Moderator/Reports/', {
          headers: {
              'Content-Type': 'application/json',
            auth: localStorage.getItem("token")
          },
          
      })
      .then(response =>{
        console.log(response);
        console.log(response.data);
        
        
        this.setState({
          Reports : response.data
          ,
          isLoading : false
        });
        console.log(this.state.Messages);
        
      })
      // Let's make sure to change the loading state to display the data
     /* .then(Messages => {
        this.setState({
          Messages,
          isLoading: false
        });
      })*/
      
      // We can still use the `.catch()` method since axios is promise-based
      .catch(error => {
        console.log(error.response)
        this.setState
        ({ 
          errors:true,
          isLoading: false 
        });
        if (error.response.data ="You are not a moderator to any subreddit")
        {
        alert ("you are not a moderator to any subreddit");
        }
        else if(error.response.data = "No reports")
        {
            alert ("there are no reports");
            return ;
        }
  });
}
checkforpostorcomment(x,id)
{
  if (x===true)
{ return <button id={id} type="submit"  name="deletereportedpost" onClick={this.DeleteReportedPost}>Delete ReportedPost</button>} 
  else if (x===false)
{
  return <button id={id} type="submit"  name="deletereportedcomment" onClick={this.DeleteReportedComment}>Delete ReportedComment</button>
}
}
DeleteReport(e)
{
  
  const element = e.target;
  const reportId=element.getAttribute("id");
  console.log(reportId);
  axios.delete( "/Moderator/Reports/"+reportId,
  {
        headers: {
            'Content-Type': 'application/json',
          auth: localStorage.getItem("token")
        },
        
    })
    .then(response =>{
      console.log(response);
      console.log(response.data);
      
      
    })
    // Let's make sure to change the loading state to display the data
   /* .then(Messages => {
      this.setState({
        Messages,
        isLoading: false
      });
    })*/
    
    // We can still use the `.catch()` method since axios is promise-based
    .catch(error => {
      console.log(error.response)
   
      if (error.response.data ="You are not a moderator to any subreddit")
      {
      alert ("you are not a moderator to any subreddit");
      }
      else if(error.response.data = "No reports")
      {
          alert ("there are no reports");
          return ;
      }
});
}
DeleteReportedComment(e)
{
  const element = e.target;
  const reportId=element.getAttribute("id");
  axios.delete( 'Moderator/Comment/',{reportId:reportId}, {
        headers: {
            'Content-Type': 'application/json',
          auth: localStorage.getItem("token")
        },
        
    })
    .then(response =>{
      console.log(response);
      console.log(response.data);
      
      
    })
    // Let's make sure to change the loading state to display the data
   /* .then(Messages => {
      this.setState({
        Messages,
        isLoading: false
      });
    })*/
    
    // We can still use the `.catch()` method since axios is promise-based
    .catch(error => {
      console.log(error.response)
    
      if (error.response.data ="You are not a moderator to any subreddit")
      {
      alert ("you are not a moderator to any subreddit");
      }
      else if(error.response.data = "report doesnt exist")
      {
          alert ("report doesn't exist");
          return ;
      }
      else if (error.response.data ="ReportId not valid")
      {
        alert ("report id not valid");
      }
      else if (error.response.data="This isnt a Comment report")
      {
        alert ("this isn't a comment report");
      }
});
}
DeleteReportedPost(e)
{

  const element = e.target;
  const reportId=element.getAttribute("id");
  axios.delete( 'Moderator/Post/',{reportId:reportId}, {
        headers: {
            'Content-Type': 'application/json',
          auth: localStorage.getItem("token")
        },
        
    })
    .then(response =>{
      console.log(response);
      console.log(response.data);
      
    })
    // Let's make sure to change the loading state to display the data
   /* .then(Messages => {
      this.setState({
        Messages,
        isLoading: false
      });
    })*/
    
    // We can still use the `.catch()` method since axios is promise-based
    .catch(error => {
      console.log(error.response)
    
      if (error.response.data === "You are not a moderator to any subreddit")
      {
      alert ("you are not a moderator to any subreddit");
      }
      else if(error.response.data === "report doesnt exist")
      {
          alert ("report doesn't exist");
          return ;
      }
      else if (error.response.data ==="ReportId not valid")
      {
        alert ("report not valid");
      }
      else if (error.response.data ==="This isnt a post report")
      {
        alert ("this is not a post report");
      }
});
}
leavemoderation(e)

{ 
  const element = e.target;
  const SubredditName=element.getAttribute("id");

  axios.delete( '/Moderator/leave',{
    SubredditName : SubredditName
  }, {
  headers: {
      'Content-Type': 'application/json',
    auth: localStorage.getItem("token")
  },
  
})
.then(response =>{
console.log(response);
console.log(response.data);


})
// Let's make sure to change the loading state to display the data
/* .then(Messages => {
this.setState({
  Messages,
  isLoading: false
});
})*/

// We can still use the `.catch()` method since axios is promise-based
.catch(error => {
console.log(error.response)

if (error.response.data ="user or subreddit not found")
{
alert ("user or subreddit not found");
}

});
}
  




getReports()
{
  if (this.state.Reports===0)
  {return ;}

  return this.state.Reports.map((rep)=>(
   
      <div className="repContainer">
        <span className="ReportName">ReportedSubr : {rep.srName}</span>
        <button id={rep.srName} type="submit"  name="leavemoderation" onClick={this.leavemoderation}>LeaveModeration  </button> 
        <h1 className="ReportDesc">Report Description : {rep.description}</h1>
        <button id={rep._id} type="submit"  name="deleteReport" onClick={this.DeleteReport}>DeleteReport  </button>   
        {this.checkforpostorcomment(rep.post,rep._id)}
        <br />
         


      </div>
 
  ));
}


    render (){
        return (
<div>

    {this.getReports()}
</div>
        );
    }
    }

    export default ModerationQueue;

