import React from 'react';
import { NavLink} from 'react-router-dom';
import Button from '../UI/Button/Button';

const SideBar = props => {

    return(

        <sidebar className='sidebar'>
    {/* <p className='sideParagraph'>Your personal Reddit frontpage. 
    Come here to check in with your favorite communities.</p> */}
   <Button>Create Post</Button>
   <NavLink to='/create-subreddit/'> <Button  clicked={props.clicked}> Create Community</Button></NavLink>
   
  </sidebar>
    );
}

export default SideBar;
   
            