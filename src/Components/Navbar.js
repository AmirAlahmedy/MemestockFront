import React from 'react';
import './Navbar.css';

const NavBar = props => {
    return  (

    <nav className='memeNav'> 
    {/* <div className='navContainer'> */}
        <div  className="memeLogo">
             <a href="#!">Memestock</a>
        </div>
        <div className="dropdownMenu">
            <button>
                Dropdown
            </button>
            <div role='menu'>

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
                <a>
                    PM
                </a>
              </span>
              <span className='rightLinks'>
                <a>
                    Create Post
                </a>
              </span>
              <span className='rightLinks'>
                <a>
                    Notifications
                </a>
              </span>
        </div>
    {/* </div>    */}
    </nav>

    );
}

export default NavBar;