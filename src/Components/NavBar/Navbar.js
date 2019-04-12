import React from 'react';
import './Navbar.css';
import { NavLink, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Aux from '../HOC/Auxiliary';
import '../../Sass/styles.scss';


const NavBar = props => {
   return  (
      

        <Aux>

        <div className='navWrapper'>

            <nav className='memeNav'> 
                <div  className="memeLogo">
                <NavLink to='/Home/'><i className="fab fa-fort-awesome-alt"></i><sub>Memestock</sub></NavLink>
                </div>
                <div className="dropdownMenu">
                    <button className='dropButton'>
                    {/* <svg class="eZQ5o2PrhR59wkAtPbxMU" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 8c0-1.654 1.346-3 3-3s3 1.346 3 3v2.843c-.511.17-1.47.392-3 .392-1.535 0-2.495-.223-3-.391V8zm8 1.895c2.409.46 4 1.241 4 2.131 0 1.418-4.03 2.568-9 2.568s-9-1.15-9-2.568c0-.89 1.59-1.671 4-2.131V8c0-2.757 2.243-5 5-5s5 2.243 5 5v1.895zM2.74 14.599c2.152.744 5.127.995 7.26.995s5.108-.25 7.26-.995l-2.955 2.12a7.394 7.394 0 0 1-8.61 0l-2.955-2.12z" fill="inherit" fill-rule="evenodd"></path><circle cx="16" cy="4" r="4" fill="none"></circle><circle cx="16" cy="4" r="3" fill="none"></circle></svg> */}
                    <i class="fas fa-sort-down"></i>

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

                <div className="search-wrapper">
                   
                   
                    <form className="search-form" action='/search' autoComplete='off'>
                    <label className="search-label" for = "header-search-bar">
                        <i class="fas fa-search search-icon"></i>
                    </label> 
                        <input type='search' className='memeSearch' id="header-search-bar" placeholder='Search Memestock'  role="search" name="q" method='get'>
                        </input>
                    </form>
                </div>
                <div className='rightLinksWrapper'>
                    <span className='rightLinks'>
                        <NavLink to='/PM/'>
                        <i class="far fa-envelope"></i>
                        </NavLink>
                    </span>
                    <span className='rightLinks'>
                        <NavLink to='/CreatePost/'>
                        <i className="far fa-edit" style={{color: 'rgb(0, 121, 211)'}}></i>
                        </NavLink>
                    </span>
                    <span className='rightLinks'>
                        <a href='#'>
                            Notifications
                        </a>
                    </span>
                    <div className='yourStuffDrop'>
                    <button className='dropButton'>
                        <i class="fas fa-sort-down"></i>
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
            <div className="fLroyf">
                
            </div>
       
        </Aux>
       
       

    );
}

export default NavBar;