import React from 'react';
import './Registration.css';




const Registration = props => {

    
        return(
           
        <div>

            <form className='regForm' onSubmit={ props.regHand }>
                <h1 className='logo'>Memestock</h1>
                <div className='inputs'>

                <input type='text' 
                placeholder='E-mail'/>

                <input type='text' 
                placeholder='User name'/>

                <input type="password" 
                placeholder="Password" 
                value={ props.password } 
                onChange={ props.svPswrd }/>

                </div>
                <button type="submit" className='registerButton'> Register </button>
            </form>
               
        </div>
               );

    
}

export default Registration;