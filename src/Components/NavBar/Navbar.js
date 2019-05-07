import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import Aux from '../HOC/Auxiliary';
import '../../Sass/styles.scss';
import Login from '../../Routes/Login/Login';
import Registration from '../../Routes/Registration/Registration';


/**
   * filters elements of an unordered list
   * @function filterList
   */
const filterList = () => {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('filter');
    filter = input.value.toUpperCase();
    ul = document.getElementById("my-ul");
    li = ul.getElementsByClassName('dropdownItem');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

/**
   * Shows the login form
   * @function openLogInDialogue
   */
function openLogInDialogue() {
    document.querySelector(".loginContainer").style.display = "initial";
}
/**
   * Handles login
   * @function handleLoginContainerClick
   * @param  {event} - click event
   */
function handleLoginContainerClick(e) {
    if (e && e.target && e.target.className === "loginContainer") {
        e.target.style.display = "none";
    }
}
/**
   * Shows the registration form
   * @function openRegDialogue
   */
function openRegDialogue() {
    document.querySelector(".regContainer").style.display = "initial";
}
/**
   * Handles registration
   * @function handleRegContainerClick
   * @param  {event} - click event
   */
function handleRegContainerClick(e) {
    if (e && e.target && e.target.className === "regContainer") {
        e.target.style.display = "none";
    }
}
/**
   * Hides the registration form
   * @function closeRegistration
   */
function closeRegistration(){
    document.querySelector(".regContainer").style.display = "none";
}
/**
   * Hides the login form
   * @function closeLogin
   */
function closeLogin(){
    document.querySelector(".loginContainer").style.display = "none";
}
/**
   * Insures that the window is redirected to the desired route
   * @function closeLogin
   * @param {link} - link of the desired route.
   */
function goTo(link){
    return function(){
        window.location.href = link;
    } 
}

const NavBar = props => {
    console.log("navBar props: ", props)

    return (


        <div className='navWrapper'>

            <nav className='memeNav'>
                <div className="memeLogo">
                    <NavLink to='/GoHome/'>Memestock</NavLink>
                </div>
                <div className="dropdownMenu">
                    <button className='dropButton'>

                        <i class="fas fa-sort-down"></i>

                    </button>
                    <div role='menu' className='dropList'>
                        <input id='filter' className="filter-input" placeholder='Filter' onChange={filterList}></input>
                        <ul id='my-ul' className='dropUl'>
                            <li className='dropdownItem'><span onClick={goTo("/Home/")} className='sort toHome'>Home</span></li>
                            <li className='dropdownItem'><span onClick={props.sortHandNew} className='sort srt1'>New</span></li>
                            <li className='dropdownItem'><span onClick={props.sortHandTop} className='sort srt2'>Top</span></li>
                            <li className='dropdownItem'><span onClick={props.sortHandHot}  className='sort srt3'>Hot</span></li>

                        </ul>

                    </div>
                </div>

                <div className="search-wrapper">


                    <div className="search-form memeSearch" action='/search' autoComplete='off'>
                        <label className="search-label" for="header-search-bar">
                            <i class="fas fa-search search-icon"></i>
                        </label>
                        <input type='search' className='me-me' id="header-search-bar" placeholder='Search' role="search" name="q" method='get'>
                        </input>
                    </div>
                </div>
                <div className='rightLinksWrapper'>
                    <span className='rightLinks'>
                        <NavLink to='/PM/'>
                            <i class="far fa-envelope"></i>
                        </NavLink>
                    </span>
                    <span className='rightLinks'>
                        <NavLink to='/CreatePost/'>
                            <i className="far fa-edit post"></i>
                        </NavLink>
                    </span>
                    <span className='rightLinks'>
                        <NavLink to='/notifications/'>
                        <i class="fas fa-bell"></i>
                        </NavLink>
                    </span>
                    {props.isAuth ?
                        <div className='yourStuffDrop'>
                            <button className='dropButton'>
                                <i className="fas fa-sort-down"></i>
                                <i className="fas fa-user"></i>
                            </button>
                            <div role='menu' className='yourStuffDropList'>
                                <ul className='dropUl' onChange={props.sortChanged}>
                                    <li className='yourStuffItem'><span onClick={goTo("/user/")} to='/user/' className='stfitm'>My Profile</span></li>
                                    <li className='yourStuffItem'><span onClick={goTo("/settings/")} to='/settings/' className='stfitm'>User Settings</span></li>
                                    <li className='yourStuffItem'><span onClick={goTo("/moderation/")} to='/moderation/' className='stfitm'>Moderation</span></li>
                                    <li className='yourStuffItem'><a href="#logout" onClick={props.logout} className='logoutitm stfitm'>Logout</a></li>
                                </ul>
                            </div>
                        </div>
                        :
                        <div className="authBtnsContainer">

                            <button type="button" onClick={openLogInDialogue} class="authAction">
                                Log In
                            </button>
                            <button type="button" onClick={openRegDialogue} class="authAction">
                                Sign Up
                            </button>

                        </div>
                    }


                </div>
                <div style={{ display: "none" }} class="loginContainer" onClick={handleLoginContainerClick}>
                    <Login close={closeLogin} finishLogin={props.finishLogin} />
                </div>
                <div style={{ display: "none" }} class="regContainer" onClick={handleRegContainerClick}>
                    <Registration close={closeRegistration} finishReg={props.finishRegistration} />
                </div>
            </nav>
            <div className='kml'>
                <div className='view-layout'>
                    <i className='small-font'>view</i>
                    <div className='bars'>
                        <i className="fas fa-square dd"  onClick={props.cardViewHandler}></i>
                        <i className="fas fa-bars dd" onClick={props.classicViewHandler}></i>
                    </div>
                </div>
            </div>
        </div>




    );
}

export default NavBar;