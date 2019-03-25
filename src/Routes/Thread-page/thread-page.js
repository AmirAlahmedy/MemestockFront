import React, { Component } from 'react';
import Thread from '../Thread/Thread';
import './thread-page.css';
import { Link, Route, Switch } from 'react-router-dom';


class ThreadPage extends Component {
   state = {

      comments: [
         {
            username: 'WreakingHavoc',
            comment: 'I rememeber when I had something to say!'
         },
         {
            username: 'CluelessBastard',
            comment: 'Oh this is so relatable'
         }
      ]
   }
   render() {

      return (
         /* <div class="threadPageContainer">
 
            /* <div className="PageThread">
                <Thread />
             </div>
          </div>*/
         <div>
            <div className="PageThread">
               <Thread />
            </div>
            <div className="threadComment">
               <div className="commentUser">u/{this.state.comments[0].username} </div>
               <div className="comment">{this.state.comments[0].comment}</div>

            </div>
            <div className="threadComment">
               <div className="commentUser">u/{this.state.comments[1].username} </div>
               <div className="comment">{this.state.comments[1].comment}</div>

            </div>

         </div>
      );

   }


}

export default ThreadPage;