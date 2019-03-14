import React from 'react';
import './Navbar.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import CreatePost from '../Routes/CreatePost';
const NavBar = props => {
   // return  (
    // <div>

    // <nav className='memeNav'> 
    // {/* <div className='navContainer'> */}
    //     <div  className="memeLogo">
    //          <a href="#!">Memestock</a>
    //     </div>
    //     <div className="dropdownMenu">
    //         <button>
    //             Dropdown
    //         </button>
    //         <div role='menu' className='dropList'>
    //         <input placeholder='Filter'></input>
    //             <ul>
    //                 <li><NavLink to='/Home/' className='toHome dropdownItem'>Home</NavLink></li>
    //                 <li><NavLink to='/popular/' className='sort dropdownItem'>Popular</NavLink></li>
    //                 <li><NavLink to='/All/' className='sort dropdownItem'>All</NavLink></li>
    //                 <li><NavLink  to='/Hot/'className='sort dropdownItem'>Hot</NavLink></li>

    //             </ul>
    //         </div>
    //     </div>
    //     <div>
    //           <form action='/search' autoComplete='off'>
    //               <input type='search' className='memeSearch' placeholder='Search Memestock' method='get'>
    //               </input>
    //           </form>
    //     </div>
    //     <div className='rightLinksWrapper'>
    //           <span className='rightLinks'>
    //             <NavLink to='/PM/'>
    //                 PM
    //             </NavLink>
    //           </span>
    //           <span className='rightLinks'>
    //             <NavLink to='/CreatePost/'>
    //                 Create Post
    //             </NavLink>
    //           </span>
    //           <span className='rightLinks'>
    //             <a>
    //                 Notifications
    //             </a>
    //           </span>
    //     </div>
    // {/* </div>    */}
    // </nav>
//      <Switch>
//     <Route path='/PM/' Component={CreatePost}/>
//     <Route path='/Create Post/'/>
//   </Switch>
//     </div>     

    //);
}

export default NavBar;