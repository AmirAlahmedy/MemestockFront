import React from 'react';
import { NavLink, Route} from 'react-router-dom';
import Button from '../UI/Button/Button';
// import CreatePost from ''
const SideBar = props => {

    return(

        <sidebar className='sidebar'>
    {/* <p className='sideParagraph'>Your personal Reddit frontpage. 
    Come here to check in with your favorite communities.</p> */}
   <NavLink to='/CreatePost/'><Button>Create Post</Button></NavLink>
   <NavLink to='/create-subreddit/'> <Button  clicked={props.clicked}> Create Community</Button></NavLink>
 {/* <Route path='/CreatePost/' component={CreatePost} /> */}
  </sidebar>
    );
}

export default SideBar;
   
            