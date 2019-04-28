import React from 'react'
import './SettProfile.css'

const SettProfile = () => {
  return (
  //  <div class="ayhaga-ay">
    <div class="ayhaga">
             <h2>Customize Profile</h2>
              <h3 class="profile-info">Profile Information</h3>

              <div className="display-box">
                 <h3 class="display-info">Display Information</h3>


                  <p>Set a display name. This does not change your username.</p>


                  <div className="box">
                  <input class="optional-name" placeholder="Display Name (optional)" type="text"  maxLength="15" />
                  </div>

              </div>

              <div className="about-box">

                <div className="ab1">
                  <h3>About</h3>
                  <p>A brief description of yourself shown on your profile.</p>
                </div>

                <div className="ab2">
                  <textarea placeholder="About (optional)" maxLength="200" rows="5"></textarea>
                  </div>
                  <div class="char">200 Characters</div>
          

              </div>


        </div>
  //  </div>
  )
}

export default SettProfile
