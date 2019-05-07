import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import axios from '../../axios-orders';
import styles from './modQ.css'

class ModerationQueue extends Component {

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
    const headers = {
      auth: localStorage.getItem("token")
    }
    axios.get('Moderator/Reports/', { "headers": headers })
      .then(async (response) => {
        console.log(response);
        console.log(response.data);

        for (const rep of response.data.reports) {
          if (rep.post) continue;
          await axios.get(`/comment/${rep.reportedId}`, { headers: { auth: localStorage.getItem("token") } })
            .then(resp => {
              rep.commentContent = resp.data.content
            })
        }

        this.setState({
          Reports: response.data.reports
          ,
          isLoading: false
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
            errors: true,
            isLoading: false
          });
        if (!error.response) return;
        if (error.response.data === "You are not a moderator to any subreddit") {
          alert("you are not a moderator to any subreddit");
        }
        else if (error.response.data = "No reports") {
          return;
        }
      });
  }
    /**
     * Handles submission
     * @function checkforpostorcomment
     * @param {x} - post or a comment
     * @param {id} - the id of a post or a comment
     */
  checkforpostorcomment(x, id) {
    if (x === true) { return <button className="delBtn" id={id} type="submit" name="deletereportedpost" onClick={this.DeleteReportedPost}>Delete Reported Post</button> }
    else if (x === false) {
      return <button id={id} className="delBtn" type="submit" name="deletereportedcomment" onClick={this.DeleteReportedComment}>Delete Reported Comment</button>
    }
  }
  /**
     * Deletes a report
     * @function DeleteReport
     * @param {e} - event
     */
  DeleteReport(e) {

    const element = e.target;
    const container = element.parentElement;
    const reportId = element.getAttribute("id");
    console.log(reportId);
    axios.delete("/Moderator/Reports/" + reportId,
      {
        headers: {
          'Content-Type': 'application/json',
          auth: localStorage.getItem("token")
        },

      })
      .then(response => {
        console.log(response);
        console.log(response.data);
        if(response.data.message === "report deleted"){
          container.remove();
        }

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

        if (error.response.data = "You are not a moderator to any subreddit") {
          alert("you are not a moderator to any subreddit");
        }
        else if (error.response.data = "No reports") {
          alert("there are no reports");
          return;
        }
      });
  }
  /**
     * Deletes a reported comment
     * @function DeleteReportedComment
     * @param {e} - event
     */
  DeleteReportedComment(e) {
    const element = e.target;
    const reportId = element.getAttribute("id");
    axios.delete('Moderator/Comment/' + reportId, {
      headers: {
        'Content-Type': 'application/json',
        auth: localStorage.getItem("token")
      },

    })
      .then(response => {
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

        if (!error.response) return;
        if (error.response.data = "You are not a moderator to any subreddit") {
          alert("you are not a moderator to any subreddit");
        }
        else if (error.response.data = "report doesnt exist") {
          alert("report doesn't exist");
          return;
        }
        else if (error.response.data = "ReportId not valid") {
          alert("report id not valid");
        }
        else if (error.response.data = "This isnt a Comment report") {
          alert("this isn't a comment report");
        }
      });
  }
  /**
     * Deletes a reported post
     * @function DeleteReportedPost
     * @param {e} - event
     */
  DeleteReportedPost(e) {

    const element = e.target;
    const reportId = element.getAttribute("id");
    axios.delete('Moderator/Post/' + reportId, {
      headers: {
        'Content-Type': 'application/json',
        auth: localStorage.getItem("token")
      },

    })
      .then(response => {
        console.log(response);
        console.log(response.data);
        window.location.reload();
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

        if (error.response.data === "You are not a moderator to any subreddit") {
          alert("you are not a moderator to any subreddit");

        }
        else if (error.response.data === "report doesnt exist") {
          alert("report doesn't exist");
          return;
        }
        else if (error.response.data === "ReportId not valid") {
          alert("report not valid");
        }
        else if (error.response.data === "This isnt a post report") {
          alert("this is not a post report");
        }
      });
  }
  /**
     * Handles leaving a moderation
     * @function leavemoderation
     * @param {e} - event
     */
  leavemoderation(e) {
    const element = e.target;
    const SubredditName = element.getAttribute("id");

    axios.delete('/Moderator/leave', {
      SubredditName: SubredditName
    }, {
        headers: {
          'Content-Type': 'application/json',
          auth: localStorage.getItem("token")
        },

      })
      .then(response => {
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

        if (error.response.data = "user or subreddit not found") {
          alert("user or subreddit not found");
        }

      });
  }




  /**
     * Handles reports
     * @function getReports
     */
  getReports() {
    if (!this.state.Reports.length) { return <p>No Reports found</p> }
    return this.state.Reports.map((rep) => (

      <div className="repContainer">
        <span className="ReportName">ReportedSubr : {rep.srName}</span>
        <br />
        <button id={rep.srName} className="leaveMod" type="submit" name="leavemoderation" onClick={this.leavemoderation}>Leave Moderation</button>
        <p className="ReportDesc">Report Description : {rep.description}</p>
        <p className="ReportDesc">Report Type : {rep.post ? "Post" : "Comment"}</p>
        {rep.post ?
          <a href={`/thread/${rep.reportedId}?srName=${rep.srName}`} className="visitPostLink">Visit Post</a>
          :
          <p>Content: {rep.commentContent}</p>
        }
        {/*  */}
        <button id={rep._id} className="delBtn" type="submit" name="deleteReport" onClick={this.DeleteReport}>Delete Report</button>
        {this.checkforpostorcomment(rep.post, rep._id)}
        <hr />



      </div>

    ));
  }


  render() {

    return (
      <div>

        {this.getReports()}
      </div>
    );
  }
}

export default ModerationQueue;

