import React from 'react';
import './Navbar.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import CreatePost from '../Routes/CreatePost';
const NavBar = props => {
   return  (
    <div>

    <nav className='memeNav'> 
    {/* <div className='navContainer'> */}
        <div  className="memeLogo">
        <NavLink to='/Home/'>Memestock</NavLink>
        </div>
        <div className="dropdownMenu">
            <button>
                Dropdown
            </button>
            <div role='menu' className='dropList'>
            <input placeholder='Filter'></input>
                <ul>
                    <li><NavLink to='/Home/' className='toHome dropdownItem'>Home</NavLink></li>
                    <li><NavLink to='/popular/' className='sort-1 dropdownItem'>Popular</NavLink></li>
                    <li><NavLink to='/All/' className='sort-2 dropdownItem'>All</NavLink></li>
                    <li><NavLink  to='/Hot/'className='sort-3 dropdownItem'>Hot</NavLink></li>

                </ul>
            </div>
        </div>
        <div>
              <form action='/search' autoComplete='off'>
                  <input type='search' className='memeSearch' placeholder='Search Memestock' method='get'>
                  </input>
              </form>
        </div>
        <div className='rightLinksWrapper'>
              <span className='rightLinks'>
                <NavLink to='/PM/'>
                    PM
                </NavLink>
              </span>
              <span className='rightLinks'>
                <NavLink to='/CreatePost/'>
                    Create Post
                </NavLink>
              </span>
              <span className='rightLinks'>
                <a>
                    Notifications
                </a>
              </span>
        </div>
    {/* </div>    */}
    </nav>
    </div>     

    );
}

export default NavBar;