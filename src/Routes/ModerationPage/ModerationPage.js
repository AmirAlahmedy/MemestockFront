import React, { Component } from 'react';
import './ModerationPage.css';
import { NavLink } from 'react-router-dom';
import ModerationQueue from './ModerationQueue'
import Moderators from '../InviteModerators/InviteModerators';
import BanUsers from '../BanUsers/BanUsers';
import {BrowserRouter as Router, Route, withRouter} from 'react-router-dom';
import Aux from '../../Components/HOC/Auxiliary';

function ModerationPage() {
  return (

    <Router>
      <Aux>

    <div className="Container">
     <div className="App">
        
        <Route exact path="/user/moderation" render={props => (
                <React.Fragment>
                  <header className="App-header">
       Profile Moderation
        </header>
                           <div className = "Intro">
               <p className="p">Posting directly to your profile is optional. If you choose not to post to your profile, you will not have a need for moderation tools.

If you do choose to post to your profile, then it's important to get familiar with your moderation tools and the mod guidelines to ensure that personal information, spam, and other disallowed content isn't showing up and remaining in the comments of your profile. Below, you'll find a basic guide for the tools provided to you:</p>
          </div>
      
            <div className="Cont">
        <NavLink activeClassName="link" to = "/user/moderation//Traffic">Traffic</NavLink>
        <p className="par">View traffic statistics and graphs for your profile.</p>
       
      
        <NavLink activeClassName="link" to = "/user/moderation//Moderators" >Moderators</NavLink>
        <p className="par">If your profile's comments are busy and you need some help with moderation, you might want to add on some users as mods to assist you. You can do this here. Choose users that you trust to represent you via their statements and mod actions, and be mindful of what permissions your grant them.</p>

        <NavLink activeClassName="link" to = "/user/moderation//ModerationLog">ModerationLog</NavLink>
        <p className="par">The moderation log lists all mod actions taken by any mod on your profile. If you are the only moderator of your profile the only actions will be from you or Automoderator.
If you add multiple moderators, the mod log can be helpful in seeing who has taken a particular action like banning a user or removing a comment.
The moderation log will also list actions taken by Automoderator if it is set up to make actions on your profile</p>


<NavLink activeClassName="link" to = "/user/moderation/automoderator">AutoModerator</NavLink>
        <p className="par">Automoderator is our friendly robot that can be used to help you moderator your community. Automod is a versatile tool that can be set up to remove or flag content posted on your page so you can review it.
If you have questions about setting up rules, r/Automoderator is a valuable resource for help and advice.</p>

     
        <NavLink activeClassName="link" to = "/user/ModerationQueue">ModerationQueue</NavLink>
        <p className="par">Content that users report can be found here so you can approve or remove it.</p>

        
        <NavLink activeClassName="link" to = "/user/moderation//BanUsers">BanUsers</NavLink>
        <p className="par">This tool allows you to ban users from participating in your page and should be used sparingly. If users are violating site-wide rules or harassing you, please contact the admins at contact@reddit.com or r/reddit.com modmail.
Bans can be permanent or timed. For minor infractions a warning or a short ban is often enough.
It is important to use bans only in situations where it is warranted. Educating users or ignoring someone’s bad behavior can often be more effective than banning them.</p>
        
        <NavLink activeClassName="link" to = "/user/moderation//Flairs">Flairs</NavLink>
        <p className="par">Flair is text that displays next to someone’s username. Users in sports communities use flair to display their favorite team.
“Flair” is like a label you can apply to a post or a specific user. For example, you could flair someone who works with you so other users are aware of who they are.</p>
        
        <NavLink activeClassName="link" to = "/user/moderation//Spam">Spam</NavLink>
        <p className="par">All removed content can be seen here. This includes content caught by the site wide spam filter and content removed by a moderator.
You can approve content that was removed accidentally.</p>
</div>

                </React.Fragment>
              )} />

<Route path="/user/ModerationQueue" component={ModerationQueue} />
<Route path="/user/moderation//Moderators" component={Moderators} />
<Route path="/user/moderation//BanUsers" component={BanUsers} />
</div>
    </div>
    </Aux>
    </Router>
  );
}

export default ModerationPage;