import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
   return  (
    <div className='navWrapper'>

    <nav className='memeNav'> 
        <div  className="memeLogo">
        <NavLink to='/Home/'>Memestock</NavLink>
        </div>
        <div className="dropdownMenu">
            <button className='dropButton'>
                Dropdown
            </button>
            <div role='menu' className='dropList'>
            <input placeholder='Filter'></input>
                <ul className='dropUl'>
                    <li className='dropdownItem'><NavLink to='/Home/' className='sort toHome'>Home</NavLink></li>
                    <li className='dropdownItem'><NavLink to='/popular/' className='sort srt1'>Popular</NavLink></li>
                    <li className='dropdownItem'><NavLink to='/All/' className='sort srt2'>All</NavLink></li>
                    <li className='dropdownItem'><NavLink  to='/Hot/'className='sort srt3'>Hot</NavLink></li>

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
              <div className='yourStuffDrop'>
              <button className='dropButton'>
                YOUR STUFF
              </button>
                <div role='menu' className='yourStuffDropList'>
                    <ul className='dropUl'>
                        <li className='yourStuffItem'><NavLink to='/My profile/' className='stfitm'>My Profile</NavLink></li>
                        <li className='yourStuffItem'><NavLink to='/Settings/' className='stfitm'>User Settings</NavLink></li>
                    </ul>
                </div>
              </div>
        </div>
    </nav>
    </div>     

    );
}

export default NavBar;